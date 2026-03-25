import { TransactionType } from '../transaction-type.enum';
export declare class UpdateTransactionDto {
    amount?: number;
    categoryId?: string;
    date?: Date;
    type?: TransactionType;
}
