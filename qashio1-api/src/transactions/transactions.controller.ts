import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { QueryTransactionsDto } from './dto/query-transactions.dto';
import { Transaction } from './transaction.entity';
import { QuerySummaryDto } from './dto/query-summary.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Transactions')
@UseGuards(JwtAuthGuard)
@Controller('transactions')
/**
 * Handles transaction CRUD, listing filters, and summary reporting endpoints.
 */
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiCreatedResponse({ type: Transaction })
  create(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  @ApiOkResponse({
    schema: {
      example: {
        data: [],
        meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
      },
    },
  })
  findAll(@Query() query: QueryTransactionsDto) {
    return this.transactionsService.findAll(query);
  }

  @Get('summary/report')
  @ApiOkResponse({
    schema: {
      example: {
        income: 2500,
        expense: 900,
        net: 1600,
        count: 12,
        average: 283.33,
        largest: {
          amount: 1000,
          type: 'INCOME',
          category: 'Salary',
          date: '2026-03-10T12:00:00.000Z',
        },
        smallest: {
          amount: 50,
          type: 'EXPENSE',
          category: 'Snacks',
          date: '2026-03-15T15:00:00.000Z',
        },
        typeBreakdown: {
          income: 2500,
          expense: 900,
        },
        categoryBreakdown: [
          { name: 'Salary', total: 2000 },
          { name: 'Groceries', total: 500 },
          { name: 'Snacks', total: 400 },
        ],
        mostCommonCategory: 'Salary',
        incomePercent: 73.5,
        expensePercent: 26.5,
        dateFrom: '2026-03-01T00:00:00.000Z',
        dateTo: '2026-03-31T23:59:59.999Z',
      },
    },
  })
  getSummary(@Query() query: QuerySummaryDto) {
    return this.transactionsService.getSummary(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: Transaction })
  findOne(@Param('id') id: string): Promise<Transaction> {
    return this.transactionsService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: Transaction })
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.transactionsService.remove(id);
  }
}
