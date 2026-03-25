import { Repository } from 'typeorm';
import { Budget } from './budget.entity';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { CategoriesService } from '../categories/categories.service';
import { Transaction } from '../transactions/transaction.entity';
export declare class BudgetsService {
    private readonly budgetsRepository;
    private readonly transactionsRepository;
    private readonly categoriesService;
    private readonly logger;
    constructor(budgetsRepository: Repository<Budget>, transactionsRepository: Repository<Transaction>, categoriesService: CategoriesService);
    create(createBudgetDto: CreateBudgetDto): Promise<Budget>;
    findAll(): Promise<{
        data: {
            usage: {
                spent: number;
                total: number;
                remaining: number;
                percentageUsed: number;
                isOverBudget: boolean;
                periodStart: Date;
                periodEnd: Date;
            };
            id: string;
            amount: number;
            periodStart: Date;
            periodEnd: Date;
            categoryId: string;
            category: import("../categories/category.entity").Category;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOne(id: string): Promise<Budget>;
    getBudgetUsage(id: string): Promise<{
        spent: number;
        total: number;
        remaining: number;
        percentageUsed: number;
        isOverBudget: boolean;
        periodStart: Date;
        periodEnd: Date;
    }>;
    handleTransactionChanged(transaction: Transaction): Promise<void>;
    private ensureCategoryExists;
    private ensureValidRange;
}
