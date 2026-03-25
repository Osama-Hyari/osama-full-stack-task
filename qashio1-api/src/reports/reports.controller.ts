import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ReportsService } from './reports.service';

// Controller for report-related endpoints
import {
  Controller,
  Post,
  Query,
  Res,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { Response as ExResponse } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

// Middleware to check for existing job and range overlap
@Injectable()
export class ReportJobIdempotencyMiddleware implements NestMiddleware {
  constructor(private readonly reportsService: ReportsService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { dateFrom, dateTo } = req.query;
    // Check for existing job with same range
    const jobId = Buffer.from(JSON.stringify({ dateFrom, dateTo })).toString(
      'base64',
    );
    const job = await this.reportsService.getJobById(jobId);
    if (job) {
      throw new BadRequestException(
        'A report job for this date range already exists.',
      );
    }
    // Optionally, check for overlapping jobs (pseudo-code)
    // const overlapping = await this.reportsService.findOverlappingJobs(dateFrom, dateTo);
    // if (overlapping) throw new BadRequestException('A report job for an overlapping range exists.');
    next();
  }
}

@Controller('reports')
@ApiTags('Reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // Start a background job to generate a big transactions report
  @Post('big-transactions/job')
  @ApiOperation({
    summary:
      'Start background job for big transactions report (idempotent by date range)',
  })
  @ApiQuery({
    name: 'dateFrom',
    required: false,
    description: 'Start date for report range',
  })
  @ApiQuery({
    name: 'dateTo',
    required: false,
    description: 'End date for report range',
  })
  @ApiResponse({
    status: 201,
    description: 'Job created',
    schema: { example: { jobId: '...' } },
  })
  @ApiResponse({
    status: 400,
    description: 'A report job for this date range already exists.',
  })
  async createBigTransactionsJob(@Query() query: any) {
    // Start the background job for report generation
    return await this.reportsService.createBigTransactionsReportJob(query);
  }

  // Check the status of a report generation job
  @Get('big-transactions/status/:jobId')
  @ApiOperation({ summary: 'Check status of report job' })
  @ApiParam({ name: 'jobId', required: true })
  @ApiResponse({
    status: 200,
    description: 'Job status',
    schema: { example: { status: 'completed' } },
  })
  async getBigTransactionsJobStatus(@Param('jobId') jobId: string) {
    return this.reportsService.getReportStatus(jobId);
  }

  // Download the generated report file when the job is complete (public endpoint)
  @Get('big-transactions/download/:jobId')
  @ApiOperation({ summary: 'Download generated report file (public)' })
  @ApiParam({ name: 'jobId', required: true })
  @ApiResponse({ status: 200, description: 'CSV file will be downloaded' })
  async downloadBigTransactionsReport(
    @Param('jobId') jobId: string,
    @Res() res: ExResponse,
  ) {
    return this.reportsService.downloadReport(jobId, res);
  }

  // List all report jobs (for displaying in a table)
  @Get('big-transactions/list')
  @ApiOperation({ summary: 'List all report jobs' })
  @ApiResponse({ status: 200, description: 'List of report jobs' })
  async listReportJobs() {
    return this.reportsService.listReportJobs();
  }
}
