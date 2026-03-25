import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { BudgetsService } from './budgets.service';
import { Transaction } from '../transactions/transaction.entity';
import { TransactionEvents } from '../shared/events/transaction.events';

interface TransactionChangedEvent {
  transaction: Transaction;
}

@Injectable()
/**
 * Reacts to transaction events and triggers budget usage checks.
 */
export class BudgetEventsListener {
  constructor(private readonly budgetsService: BudgetsService) {}

  @OnEvent(TransactionEvents.CREATED)
  async onTransactionCreated(event: TransactionChangedEvent): Promise<void> {
    await this.budgetsService.handleTransactionChanged(event.transaction);
  }

  @OnEvent(TransactionEvents.UPDATED)
  async onTransactionUpdated(event: TransactionChangedEvent): Promise<void> {
    await this.budgetsService.handleTransactionChanged(event.transaction);
  }
}
