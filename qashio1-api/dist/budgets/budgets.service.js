"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var BudgetsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const budget_entity_1 = require("./budget.entity");
const categories_service_1 = require("../categories/categories.service");
const transaction_entity_1 = require("../transactions/transaction.entity");
const transaction_type_enum_1 = require("../transactions/transaction-type.enum");
let BudgetsService = BudgetsService_1 = class BudgetsService {
    budgetsRepository;
    transactionsRepository;
    categoriesService;
    logger = new common_1.Logger(BudgetsService_1.name);
    constructor(budgetsRepository, transactionsRepository, categoriesService) {
        this.budgetsRepository = budgetsRepository;
        this.transactionsRepository = transactionsRepository;
        this.categoriesService = categoriesService;
    }
    async create(createBudgetDto) {
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
        const data = await Promise.all(budgets.map(async (budget) => {
            const usage = await this.getBudgetUsage(budget.id);
            return {
                ...budget,
                usage,
            };
        }));
        return { data };
    }
    async findOne(id) {
        const budget = await this.budgetsRepository.findOne({
            where: { id },
            relations: { category: true },
        });
        if (!budget) {
            throw new common_1.NotFoundException(`Budget with id '${id}' was not found`);
        }
        return budget;
    }
    async getBudgetUsage(id) {
        const budget = await this.findOne(id);
        const result = await this.transactionsRepository
            .createQueryBuilder('transaction')
            .select('COALESCE(SUM(transaction.amount), 0)', 'spent')
            .where('transaction.categoryId = :categoryId', { categoryId: budget.categoryId })
            .andWhere('transaction.type = :type', { type: transaction_type_enum_1.TransactionType.EXPENSE })
            .andWhere('transaction.date >= :periodStart', { periodStart: budget.periodStart })
            .andWhere('transaction.date <= :periodEnd', { periodEnd: budget.periodEnd })
            .getRawOne();
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
    async handleTransactionChanged(transaction) {
        if (transaction.type !== transaction_type_enum_1.TransactionType.EXPENSE) {
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
                this.logger.warn(`Budget exceeded for category ${budget.categoryId}. Spent ${usage.spent} of ${usage.total}`);
            }
            else {
                this.logger.log(`Budget check passed for category ${budget.categoryId}. Spent ${usage.spent} of ${usage.total}`);
            }
        }
    }
    async ensureCategoryExists(categoryId) {
        const category = await this.categoriesService.findOneById(categoryId);
        if (!category) {
            throw new common_1.NotFoundException(`Category with id '${categoryId}' was not found`);
        }
    }
    ensureValidRange(periodStart, periodEnd) {
        if (periodStart > periodEnd) {
            throw new common_1.BadRequestException('periodStart must be before or equal to periodEnd');
        }
    }
};
exports.BudgetsService = BudgetsService;
exports.BudgetsService = BudgetsService = BudgetsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(budget_entity_1.Budget)),
    __param(1, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        categories_service_1.CategoriesService])
], BudgetsService);
//# sourceMappingURL=budgets.service.js.map