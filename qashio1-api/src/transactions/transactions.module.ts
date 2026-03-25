import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';
import { CategoriesModule } from '../categories/categories.module';
import { TransactionsReportController } from './transactions.report.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), CategoriesModule],
  controllers: [TransactionsController, TransactionsReportController],
  providers: [TransactionsService],
  exports: [TransactionsService, TypeOrmModule],
})
/**
 * Transaction feature module with API and repository wiring.
 */
export class TransactionsModule {}
