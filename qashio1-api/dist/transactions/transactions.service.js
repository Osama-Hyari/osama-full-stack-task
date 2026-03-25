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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("./transaction.entity");
const categories_service_1 = require("../categories/categories.service");
const transaction_events_1 = require("../shared/events/transaction.events");
const transaction_type_enum_1 = require("./transaction-type.enum");
let TransactionsService = class TransactionsService {
    transactionsRepository;
    categoriesService;
    eventEmitter;
    constructor(transactionsRepository, categoriesService, eventEmitter) {
        this.transactionsRepository = transactionsRepository;
        this.categoriesService = categoriesService;
        this.eventEmitter = eventEmitter;
    }
    async create(createTransactionDto) {
        await this.ensureCategoryExists(createTransactionDto.categoryId);
        const transaction = this.transactionsRepository.create(createTransactionDto);
        const saved = await this.transactionsRepository.save(transaction);
        this.eventEmitter.emit(transaction_events_1.TransactionEvents.CREATED, { transaction: saved });
        return this.findOne(saved.id);
    }
    async findAll(query) {
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
            qb.andWhere('transaction.date >= :dateFrom', { dateFrom: query.dateFrom });
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
            },
        };
    }
    async getSummary(query) {
        const qb = this.transactionsRepository.createQueryBuilder('transaction');
        if (query.dateFrom) {
            qb.andWhere('transaction.date >= :dateFrom', { dateFrom: query.dateFrom });
        }
        if (query.dateTo) {
            qb.andWhere('transaction.date <= :dateTo', { dateTo: query.dateTo });
        }
        const rows = await qb
            .select('transaction.type', 'type')
            .addSelect('COALESCE(SUM(transaction.amount), 0)', 'total')
            .groupBy('transaction.type')
            .getRawMany();
        const income = Number(rows.find((row) => row.type === transaction_type_enum_1.TransactionType.INCOME)?.total ?? 0);
        const expense = Number(rows.find((row) => row.type === transaction_type_enum_1.TransactionType.EXPENSE)?.total ?? 0);
        return {
            income,
            expense,
            net: income - expense,
            dateFrom: query.dateFrom ?? null,
            dateTo: query.dateTo ?? null,
        };
    }
    async findOne(id) {
        const transaction = await this.transactionsRepository.findOne({
            where: { id },
            relations: { category: true },
        });
        if (!transaction) {
            throw new common_1.NotFoundException(`Transaction with id '${id}' was not found`);
        }
        return transaction;
    }
    async update(id, updateTransactionDto) {
        const existing = await this.findOne(id);
        if (updateTransactionDto.categoryId) {
            await this.ensureCategoryExists(updateTransactionDto.categoryId);
        }
        const merged = this.transactionsRepository.merge(existing, updateTransactionDto);
        const updated = await this.transactionsRepository.save(merged);
        this.eventEmitter.emit(transaction_events_1.TransactionEvents.UPDATED, { transaction: updated });
        return this.findOne(updated.id);
    }
    async remove(id) {
        const transaction = await this.findOne(id);
        await this.transactionsRepository.remove(transaction);
    }
    async ensureCategoryExists(categoryId) {
        const category = await this.categoriesService.findOneById(categoryId);
        if (!category) {
            throw new common_1.NotFoundException(`Category with id '${categoryId}' was not found`);
        }
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        categories_service_1.CategoriesService,
        event_emitter_1.EventEmitter2])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map