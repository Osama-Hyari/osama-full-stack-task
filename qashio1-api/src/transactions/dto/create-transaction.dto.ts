import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
} from 'class-validator';
import { TransactionType } from '../transaction-type.enum';

/**
 * Request payload for creating a new transaction.
 */
export class CreateTransactionDto {
  @ApiProperty({ example: 250.5 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount!: number;

  @ApiProperty({ example: '8f6f5ab6-ef6e-4f3f-a3f3-61b0a8ddf4ef' })
  @IsUUID()
  categoryId!: string;

  @ApiProperty({ example: '2026-03-19T08:30:00.000Z' })
  @Type(() => Date)
  @IsDate()
  date!: Date;

  @ApiProperty({ enum: TransactionType, example: TransactionType.EXPENSE })
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type!: TransactionType;
}
