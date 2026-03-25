import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

// Entity to store metadata about each report job
@Entity()
export class ReportJob {
  @PrimaryColumn()
  jobId: string;

  @Column({ nullable: true })
  dateFrom: string;

  @Column({ nullable: true })
  dateTo: string;

  @Column({ default: 'processing' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  downloadLink: string;
}
