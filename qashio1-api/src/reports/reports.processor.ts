import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../transactions/transaction.entity';
import * as fs from 'fs';
import * as path from 'path';

// Bull processor for handling background report jobs
@Processor('reports')
@Injectable()
export class ReportsProcessor {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  // Process the big-transactions job: generate CSV file in background
  @Process('big-transactions')
  async handleBigTransactionsReport(job: Job) {
    const { query, jobId } = job.data;
    const filePath = path.join(__dirname, `../../../tmp/report_${jobId}.csv`);
    const writeStream = fs.createWriteStream(filePath);
    writeStream.write('id,amount,date,type,category\n');
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
    return new Promise((resolve, reject) => {
      stream.on('data', (row) => {
        // Handle Buffer, string, or object
        if (Buffer.isBuffer(row)) {
          row = JSON.parse(row.toString());
        } else if (typeof row === 'string') {
          row = JSON.parse(row);
        }
        const obj = row as any;
        writeStream.write(
          `${obj.id},${obj.amount},${obj.date ? new Date(obj.date).toISOString() : ''},${obj.type},${obj.category?.name || ''}\n`,
        );
      });
      stream.on('end', () => {
        writeStream.end();
        resolve({ filePath });
      });
      stream.on('error', (err) => {
        writeStream.end();
        reject(err);
      });
    });
  }
}
