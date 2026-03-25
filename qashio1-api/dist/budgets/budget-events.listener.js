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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetEventsListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const budgets_service_1 = require("./budgets.service");
const transaction_events_1 = require("../shared/events/transaction.events");
let BudgetEventsListener = class BudgetEventsListener {
    budgetsService;
    constructor(budgetsService) {
        this.budgetsService = budgetsService;
    }
    async onTransactionCreated(event) {
        await this.budgetsService.handleTransactionChanged(event.transaction);
    }
    async onTransactionUpdated(event) {
        await this.budgetsService.handleTransactionChanged(event.transaction);
    }
};
exports.BudgetEventsListener = BudgetEventsListener;
__decorate([
    (0, event_emitter_1.OnEvent)(transaction_events_1.TransactionEvents.CREATED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BudgetEventsListener.prototype, "onTransactionCreated", null);
__decorate([
    (0, event_emitter_1.OnEvent)(transaction_events_1.TransactionEvents.UPDATED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BudgetEventsListener.prototype, "onTransactionUpdated", null);
exports.BudgetEventsListener = BudgetEventsListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [budgets_service_1.BudgetsService])
], BudgetEventsListener);
//# sourceMappingURL=budget-events.listener.js.map