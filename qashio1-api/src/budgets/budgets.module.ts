import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetsController } from './budgets.controller';
import { BudgetsService } from './budgets.service';
import { Budget } from './budget.entity';
import { CategoriesModule } from '../categories/categories.module';
import { Transaction } from '../transactions/transaction.entity';
import { BudgetEventsListener } from './budget-events.listener';

@Module({
  imports: [TypeOrmModule.forFeature([Budget, Transaction]), CategoriesModule],
  controllers: [BudgetsController],
  providers: [BudgetsService, BudgetEventsListener],
  exports: [BudgetsService],
})
/**
 * Budget feature module including event listeners and data access.
 */
export class BudgetsModule {}
