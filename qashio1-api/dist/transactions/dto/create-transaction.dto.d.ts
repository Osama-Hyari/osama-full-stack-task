import { TransactionType } from '../transaction-type.enum';
export declare class CreateTransactionDto {
    amount: number;
    categoryId: string;
    date: Date;
    type: TransactionType;
}
