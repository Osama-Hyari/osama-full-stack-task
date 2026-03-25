import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { Budget } from './budget.entity';
export declare class BudgetsController {
    private readonly budgetsService;
    constructor(budgetsService: BudgetsService);
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
    getUsage(id: string): Promise<{
        spent: number;
        total: number;
        remaining: number;
        percentageUsed: number;
        isOverBudget: boolean;
        periodStart: Date;
        periodEnd: Date;
    }>;
}
