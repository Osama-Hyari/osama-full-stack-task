import { BudgetsService } from './budgets.service';
import { Transaction } from '../transactions/transaction.entity';
interface TransactionChangedEvent {
    transaction: Transaction;
}
export declare class BudgetEventsListener {
    private readonly budgetsService;
    constructor(budgetsService: BudgetsService);
    onTransactionCreated(event: TransactionChangedEvent): Promise<void>;
    onTransactionUpdated(event: TransactionChangedEvent): Promise<void>;
}
export {};
