import { Category } from '../categories/category.entity';
import { TransactionType } from './transaction-type.enum';
export declare class Transaction {
    id: string;
    amount: number;
    date: Date;
    type: TransactionType;
    categoryId: string;
    category: Category;
    createdAt: Date;
    updatedAt: Date;
}
