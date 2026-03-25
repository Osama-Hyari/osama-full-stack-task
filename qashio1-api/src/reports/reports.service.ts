import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportJob } from './report-job.entity';
import { Transaction } from '../transactions/transaction.entity';
import { Response } from 'express';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import * as path from 'path';
import * as fs from 'fs';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class ReportsService {
  private static readonly logger = new Logger(ReportsService.name);
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    @InjectQueue('reports') private readonly reportsQueue: Queue,
    // Inject the NotificationsGateway for real-time notifications
    private readonly notificationsGateway: NotificationsGateway,
    @InjectRepository(ReportJob)
    private readonly reportJobRepository: Repository<ReportJob>,
  ) {}

  // Create a background job for report generation (idempotent by query hash)
  async createBigTransactionsReportJob(query: any) {
    ReportsService.logger.log(`Creating report job for query: ${JSON.stringify(query)}`);
    const jobId = Buffer.from(JSON.stringify(query)).toString('base64');
    let job = await this.reportsQueue.getJob(jobId);
    // Save report job metadata if not exists
    let reportJob = await this.reportJobRepository.findOne({
      where: { jobId },
    });
    if (!reportJob) {
      reportJob = this.reportJobRepository.create({
        jobId,
        dateFrom: query.dateFrom,
        dateTo: query.dateTo,
        status: 'started',
      });
      await this.reportJobRepository.save(reportJob);
      ReportsService.logger.log(`Saved new ReportJob with jobId: ${jobId}`);
    }
    if (!job) {
      job = await this.reportsQueue.add(
        'big-transactions',
        { query, jobId },
        { jobId },
      );
      ReportsService.logger.log(`Added job to queue with jobId: ${jobId}`);
    }
    // Wait for job completion, then update status and notify client
    job.finished()
      .then(async () => {
        const downloadLink = `/reports/big-transactions/download/${jobId}`;
        await this.reportJobRepository.update(jobId, { status: 'completed', downloadLink });
        this.notificationsGateway.notifyReportReady(jobId);
        ReportsService.logger.log(`Job completed. jobId: ${jobId}, downloadLink: ${downloadLink}`);
      })
      .catch(async (error) => {
        ReportsService.logger.error(`Job failed. jobId: ${jobId}, error: ${error?.message || error}`);
        await this.reportJobRepository.update(jobId, { status: 'failed' });
      });
    return { jobId };
  }
  // List all report jobs (for displaying in a table)
  async listReportJobs() {
    ReportsService.logger.log('Listing all report jobs');
    const jobs = await this.reportJobRepository.find({ order: { createdAt: 'DESC' } });
    return Array.isArray(jobs) ? jobs : [];
  }

  // Get the status of a report generation job
  async getReportStatus(jobId: string) {
    ReportsService.logger.log(`Getting status for jobId: ${jobId}`);
    const job = await this.reportsQueue.getJob(jobId);
    if (!job) return { status: 'not_found' };
    let status: string;
    if (job.finishedOn) {
      status = 'completed';
    } else if (job.failedReason) {
      status = 'failed';
    } else if (job.processedOn) {
      status = 'in_progress';
    } else {
      status = 'started';
    }
    // Add download link if completed
    const downloadLink =
      status === 'completed'
        ? `/reports/big-transactions/download/${jobId}`
        : null;
    return {
      status,
      downloadLink,
    };
  }

  // Get a job by its id (for idempotency check)
  async getJobById(jobId: string) {
    ReportsService.logger.log(`Fetching job by id: ${jobId}`);
    return this.reportsQueue.getJob(jobId);
  }

  // Download the generated report file
  async downloadReport(jobId: string, res: Response) {
    ReportsService.logger.log(`Download requested for jobId: ${jobId}`);
    const filePath = path.join(__dirname, `../../../tmp/report_${jobId}.csv`);
    if (!fs.existsSync(filePath)) {
      ReportsService.logger.warn(`File not found for jobId: ${jobId}`);
      return res.status(404).json({
        statusCode: 404,
        message: 'Report file not found. The job may not be completed or the file was deleted.',
        jobId,
      });
    }
    res.download(filePath, `transactions_report_${jobId}.csv`);
  }

  // (Legacy) Direct streaming method (not used with worker-based approach)
  async streamBigTransactionsReport(query: any, res: Response) {
    ReportsService.logger.log(`Streaming big transactions report for query: ${JSON.stringify(query)}`);
    const qb = this.transactionsRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.category', 'category');
    if (query.dateFrom) {
      qb.andWhere('transaction.date >= :dateFrom', {
        dateFrom: query.dateFrom,
      });
    }
    if (query.dateTo) {
      qb.andWhere('transaction.date <= :dateTo', { dateTo: query.dateTo });
    }
    const stream = await qb.stream();
    res.write('id,amount,date,type,category\n');
    stream.on('data', (row) => {
      if (Buffer.isBuffer(row)) {
        const transaction = JSON.parse(row.toString());
        res.write(
          `${transaction.id},${transaction.amount},${new Date(transaction.date).toISOString()},${transaction.type},${transaction.category?.name || ''}\n`,
        );
      }
    });
    stream.on('end', () => res.end());
    stream.on('error', () => res.status(500).end('Error generating report'));
  }
}
