import { Transaction } from '../transactions/transaction.entity';
import { Budget } from '../budgets/budget.entity';
export declare class Category {
    id: string;
    name: string;
    transactions: Transaction[];
    budgets: Budget[];
    createdAt: Date;
    updatedAt: Date;
}
