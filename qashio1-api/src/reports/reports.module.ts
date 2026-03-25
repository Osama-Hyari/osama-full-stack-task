import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Transaction } from '../transactions/transaction.entity';
import { ReportJob } from './report-job.entity';
import { BullModule } from '@nestjs/bull';
import { ReportsProcessor } from './reports.processor';
import { NotificationsGateway } from '../notifications/notifications.gateway';

// import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, ReportJob]),
    BullModule.registerQueue({
      name: 'reports',
    }),
    // EmailModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService, ReportsProcessor, NotificationsGateway], // <-- add here
})
export class ReportsModule {}
