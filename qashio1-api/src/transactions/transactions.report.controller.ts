import {
  Controller,
  Post,
  Body,
  Res,
  Query,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsReportController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('big-report')
  async createBigReport(@Query() query: any, @Res() res: Response) {
    // Stream large data as CSV (or JSONL) to avoid memory overload
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="transactions_report.csv"');
    await this.transactionsService.streamBigTransactionsReport(query, res);
  }
}
