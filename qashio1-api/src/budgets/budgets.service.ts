import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget } from './budget.entity';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { CategoriesService } from '../categories/categories.service';
import { Transaction } from '../transactions/transaction.entity';
import { TransactionType } from '../transactions/transaction-type.enum';

@Injectable()
/**
 * Implements budget lifecycle, validation, and usage calculations.
 */
export class BudgetsService {
  private readonly logger = new Logger(BudgetsService.name);

  constructor(
    @InjectRepository(Budget)
    private readonly budgetsRepository: Repository<Budget>,
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createBudgetDto: CreateBudgetDto): Promise<Budget> {
    await this.ensureCategoryExists(createBudgetDto.categoryId);
    this.ensureValidRange(createBudgetDto.periodStart, createBudgetDto.periodEnd);

    const budget = this.budgetsRepository.create(createBudgetDto);
    const saved = await this.budgetsRepository.save(budget);
    return this.findOne(saved.id);
  }

  async findAll() {
    const budgets = await this.budgetsRepository.find({
      relations: { category: true },
      order: { periodStart: 'DESC' },
    });

    const data = await Promise.all(
      budgets.map(async (budget) => {
        const usage = await this.getBudgetUsage(budget.id);
        return {
          ...budget,
          usage,
        };
      }),
    );

    return { data };
  }

  async findOne(id: string): Promise<Budget> {
    const budget = await this.budgetsRepository.findOne({
      where: { id },
      relations: { category: true },
    });
    if (!budget) {
      throw new NotFoundException(`Budget with id '${id}' was not found`);
    }
    return budget;
  }

  async getBudgetUsage(id: string) {
    const budget = await this.findOne(id);

    const result = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .select('COALESCE(SUM(transaction.amount), 0)', 'spent')
      .where('transaction.categoryId = :categoryId', { categoryId: budget.categoryId })
      .andWhere('transaction.type = :type', { type: TransactionType.EXPENSE })
      .andWhere('transaction.date >= :periodStart', { periodStart: budget.periodStart })
      .andWhere('transaction.date <= :periodEnd', { periodEnd: budget.periodEnd })
      .getRawOne<{ spent: string }>();

    const spent = Number(result?.spent ?? 0);
    const total = Number(budget.amount);

    return {
      spent,
      total,
      remaining: total - spent,
      percentageUsed: total > 0 ? Number(((spent / total) * 100).toFixed(2)) : 0,
      isOverBudget: spent > total,
      periodStart: budget.periodStart,
      periodEnd: budget.periodEnd,
    };
  }

  async handleTransactionChanged(transaction: Transaction): Promise<void> {
    if (transaction.type !== TransactionType.EXPENSE) {
      return;
    }

    const relatedBudgets = await this.budgetsRepository
      .createQueryBuilder('budget')
      .where('budget.categoryId = :categoryId', {
        categoryId: transaction.categoryId,
      })
      .andWhere('budget.periodStart <= :transactionDate', {
        transactionDate: transaction.date,
      })
      .andWhere('budget.periodEnd >= :transactionDate', {
        transactionDate: transaction.date,
      })
      .getMany();

    for (const budget of relatedBudgets) {
      const usage = await this.getBudgetUsage(budget.id);
      if (usage.isOverBudget) {
        this.logger.warn(
          `Budget exceeded for category ${budget.categoryId}. Spent ${usage.spent} of ${usage.total}`,
        );
      } else {
        this.logger.log(
          `Budget check passed for category ${budget.categoryId}. Spent ${usage.spent} of ${usage.total}`,
        );
      }
    }
  }

  private async ensureCategoryExists(categoryId: string): Promise<void> {
    const category = await this.categoriesService.findOneById(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with id '${categoryId}' was not found`);
    }
  }

  private ensureValidRange(periodStart: Date, periodEnd: Date): void {
    if (periodStart > periodEnd) {
      throw new BadRequestException('periodStart must be before or equal to periodEnd');
    }
  }
}
