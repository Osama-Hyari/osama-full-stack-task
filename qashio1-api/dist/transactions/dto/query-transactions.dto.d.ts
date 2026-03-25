import { TransactionType } from '../transaction-type.enum';
export declare class QueryTransactionsDto {
    page: number;
    limit: number;
    sortBy: 'date' | 'amount' | 'createdAt';
    sortOrder: 'ASC' | 'DESC';
    type?: TransactionType;
    categoryId?: string;
    dateFrom?: Date;
    dateTo?: Date;
    minAmount?: number;
    maxAmount?: number;
}
