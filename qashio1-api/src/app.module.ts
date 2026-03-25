import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsGateway } from './notifications/notifications.gateway';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { BudgetsModule } from './budgets/budgets.module';
import { AuthModule } from './auth/auth.module';
import { ReportsModule } from './reports/reports.module';
import { Category } from './categories/category.entity';
import { Transaction } from './transactions/transaction.entity';
import { Budget } from './budgets/budget.entity';
import { ReportJob } from './reports/report-job.entity';

const isTestEnv = process.env.NODE_ENV === 'test';
const useSqlite = isTestEnv || process.env.DB_TYPE === 'sqlite';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: 6379,
      },
    }),
    TypeOrmModule.forRoot(
      useSqlite
        ? {
            type: 'sqlite',
            database: process.env.DB_NAME ?? ':memory:',
            entities: [Category, Transaction, Budget, ReportJob],
            synchronize: true,
          }
        : {
            type: 'postgres',
            host: process.env.DB_HOST ?? 'localhost',
            port: Number(process.env.DB_PORT ?? 5432),
            username: process.env.DB_USER ?? 'postgres',
            password: process.env.DB_PASSWORD ?? 'postgres',
            database: process.env.DB_NAME ?? 'expense_tracker',
            entities: [Category, Transaction, Budget, ReportJob],
            synchronize: process.env.DB_SYNC === 'false' ? false : true,
          },
    ),
    CategoriesModule,
    TransactionsModule,
    BudgetsModule,
    AuthModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService, NotificationsGateway],
})
/**
 * Root module that wires infrastructure and feature modules.
 */
export class AppModule {}
