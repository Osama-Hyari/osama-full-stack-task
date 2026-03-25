import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { QueryTransactionsDto } from './dto/query-transactions.dto';
import { CategoriesService } from '../categories/categories.service';
import { TransactionEvents } from '../shared/events/transaction.events';
import { QuerySummaryDto } from './dto/query-summary.dto';
import { TransactionType } from './transaction-type.enum';
import { Response } from 'express';

@Injectable()
/**
 * Encapsulates transaction business logic, queries, and domain events.
 */
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    private readonly categoriesService: CategoriesService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    await this.ensureCategoryExists(createTransactionDto.categoryId);
    const transaction =
      this.transactionsRepository.create(createTransactionDto);
    const saved = await this.transactionsRepository.save(transaction);

    this.eventEmitter.emit(TransactionEvents.CREATED, { transaction: saved });

    return this.findOne(saved.id);
  }

  async findAll(query: QueryTransactionsDto) {
    const qb = this.transactionsRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.category', 'category');

    if (query.type) {
      qb.andWhere('transaction.type = :type', { type: query.type });
    }
    if (query.categoryId) {
      qb.andWhere('transaction.categoryId = :categoryId', {
        categoryId: query.categoryId,
      });
    }
    if (query.dateFrom) {
      qb.andWhere('transaction.date >= :dateFrom', {
        dateFrom: query.dateFrom,
      });
    }
    if (query.dateTo) {
      qb.andWhere('transaction.date <= :dateTo', { dateTo: query.dateTo });
    }
    if (query.minAmount !== undefined) {
      qb.andWhere('transaction.amount >= :minAmount', {
        minAmount: query.minAmount,
      });
    }
    if (query.maxAmount !== undefined) {
      qb.andWhere('transaction.amount <= :maxAmount', {
        maxAmount: query.maxAmount,
      });
    }

    qb.orderBy(`transaction.${query.sortBy}`, query.sortOrder)
      .skip((query.page - 1) * query.limit)
      .take(query.limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
        hasNextPage: (query.page * query.limit) < total,
      },
    };
  }

  async getSummary(query: QuerySummaryDto) {
    const qb = this.transactionsRepository.createQueryBuilder('transaction');
    if (query.dateFrom) {
      qb.andWhere('transaction.date >= :dateFrom', {
        dateFrom: query.dateFrom,
      });
    }
    if (query.dateTo) {
      qb.andWhere('transaction.date <= :dateTo', { dateTo: query.dateTo });
    }

    // Get all transactions in range
    const transactions = await qb
      .leftJoinAndSelect('transaction.category', 'category')
      .getMany();

    const count = transactions.length;
    const totalAmount = transactions.reduce(
      (sum, t) => sum + Number(t.amount),
      0,
    );
    const average = count > 0 ? totalAmount / count : 0;
    const income = transactions
      .filter((t) => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const expense = transactions
      .filter((t) => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const net = income - expense;

    // Largest and smallest transaction
    let largest: Transaction | null = null;
    let smallest: Transaction | null = null;
    if (transactions.length > 0) {
      largest = transactions.reduce<Transaction>(
        (max, t) => (Number(t.amount) > Number(max.amount) ? t : max),
        transactions[0],
      );
      smallest = transactions.reduce<Transaction>(
        (min, t) => (Number(t.amount) < Number(min.amount) ? t : min),
        transactions[0],
      );
    }

    // Breakdown by type
    const typeBreakdown = {
      income: income,
      expense: expense,
    };

    // Breakdown by category (top 3)
    const categoryMap = new Map();
    for (const t of transactions) {
      if (!t.category) continue;
      const cat = t.category.name;
      categoryMap.set(cat, (categoryMap.get(cat) || 0) + Number(t.amount));
    }
    const categoryBreakdown = Array.from(categoryMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, total]) => ({ name, total }));

    // Most common category
    let mostCommonCategory = null;
    if (categoryBreakdown.length > 0) {
      mostCommonCategory = categoryBreakdown[0].name;
    }

    // Percentage income vs expense
    const totalInOut = income + expense;
    const incomePercent = totalInOut > 0 ? (income / totalInOut) * 100 : 0;
    const expensePercent = totalInOut > 0 ? (expense / totalInOut) * 100 : 0;

    return {
      income,
      expense,
      net,
      count,
      average,
      largest: largest
        ? {
            amount: Number(largest.amount),
            type: largest.type,
            category: largest.category?.name,
            date: largest.date,
          }
        : null,
      smallest: smallest
        ? {
            amount: Number(smallest.amount),
            type: smallest.type,
            category: smallest.category?.name,
            date: smallest.date,
          }
        : null,
      typeBreakdown,
      categoryBreakdown,
      mostCommonCategory,
      incomePercent,
      expensePercent,
      dateFrom: query.dateFrom ?? null,
      dateTo: query.dateTo ?? null,
    };
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOne({
      where: { id },
      relations: { category: true },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with id '${id}' was not found`);
    }

    return transaction;
  }

  async update(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const existing = await this.findOne(id);
    if (updateTransactionDto.categoryId) {
      await this.ensureCategoryExists(updateTransactionDto.categoryId);
    }

    const merged = this.transactionsRepository.merge(
      existing,
      updateTransactionDto,
    );
    const updated = await this.transactionsRepository.save(merged);

    this.eventEmitter.emit(TransactionEvents.UPDATED, { transaction: updated });

    return this.findOne(updated.id);
  }

  async remove(id: string): Promise<void> {
    const transaction = await this.findOne(id);
    await this.transactionsRepository.remove(transaction);
  }

  private async ensureCategoryExists(categoryId: string): Promise<void> {
    const category = await this.categoriesService.findOneById(categoryId);
    if (!category) {
      throw new NotFoundException(
        `Category with id '${categoryId}' was not found`,
      );
    }
  }

  async streamBigTransactionsReport(query: any, res: Response) {
    const qb = this.transactionsRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.category', 'category');
    // Add filters if needed from query
    if (query.dateFrom) {
      qb.andWhere('transaction.date >= :dateFrom', {
        dateFrom: query.dateFrom,
      });
    }
    if (query.dateTo) {
      qb.andWhere('transaction.date <= :dateTo', { dateTo: query.dateTo });
    }
    // Stream results in batches to avoid memory overload
    const stream = await qb.stream();
    // Write CSV header
    res.write('id,amount,date,type,category\n');
    stream.on('data', (row) => {
      if (Buffer.isBuffer(row)) {
        const transaction = JSON.parse(row.toString());
        res.write(
          `${transaction.id},${transaction.amount},${new Date(transaction.date).toISOString()},${transaction.type},${transaction.category?.name || ''}\n`,
        );
      }
    });
    stream.on('end', () => res.end());
    stream.on('error', (err) => {
      res.status(500).end('Error generating report');
    });
  }

  async generateDummyTransactions(options: {
    count: number;
    categoriesCount?: number;
    minAmount?: number;
    maxAmount?: number;
    dateFrom?: string;
    dateTo?: string;
  }) {
    const {
      count,
      categoriesCount = 5,
      minAmount = 1,
      maxAmount = 1000,
      dateFrom = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      dateTo = new Date().toISOString(),
    } = options;

    // Generate random category names
    const categoryNames = Array.from({ length: categoriesCount }, (_, i) => `Category_${Math.random().toString(36).substring(2, 8)}_${i}`);
    // Create categories and collect their IDs
    const categories = await Promise.all(
      categoryNames.map(async (name) => {
        try {
          const cat = await this.categoriesService.create({ name });
          return cat.id;
        } catch (e) {
          // If already exists, fetch it
          const found = await this.categoriesService.findAll();
          const match = found.find((c) => c.name === name);
          return match ? match.id : null;
        }
      })
    );
    const validCategoryIds = categories.filter(Boolean);
    if (validCategoryIds.length === 0) {
      throw new Error('No valid categories available for dummy data');
    }

    const types = Object.values(TransactionType);
    const transactions: CreateTransactionDto[] = [];
    for (let i = 0; i < count; i++) {
      const amount = Math.random() * (maxAmount - minAmount) + minAmount;
      const date = new Date(
        new Date(dateFrom).getTime() +
          Math.random() * (new Date(dateTo).getTime() - new Date(dateFrom).getTime())
      );
      const type = types[Math.floor(Math.random() * types.length)];
      const categoryId = validCategoryIds[Math.floor(Math.random() * validCategoryIds.length)];
      transactions.push({
        amount: Number(amount.toFixed(2)),
        categoryId,
        date,
        type,
      } as CreateTransactionDto);
    }

    // Concurrently create transactions
    const created = await Promise.all(
      transactions.map((dto) => this.create(dto))
    );
    return { created: created.length, categories: validCategoryIds.length };
  }
}
  