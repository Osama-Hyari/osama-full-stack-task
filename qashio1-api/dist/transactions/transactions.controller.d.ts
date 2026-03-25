import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { QueryTransactionsDto } from './dto/query-transactions.dto';
import { Transaction } from './transaction.entity';
import { QuerySummaryDto } from './dto/query-summary.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(createTransactionDto: CreateTransactionDto): Promise<Transaction>;
    findAll(query: QueryTransactionsDto): Promise<{
        data: Transaction[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getSummary(query: QuerySummaryDto): Promise<{
        income: number;
        expense: number;
        net: number;
        dateFrom: Date | null;
        dateTo: Date | null;
    }>;
    findOne(id: string): Promise<Transaction>;
    update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<Transaction>;
    remove(id: string): Promise<void>;
}
