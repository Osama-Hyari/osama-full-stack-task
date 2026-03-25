import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsPositive, IsUUID } from 'class-validator';

/**
 * Request payload for creating a budget in a date range.
 */
export class CreateBudgetDto {
  @ApiProperty({ example: 500 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount!: number;

  @ApiProperty({ example: '8f6f5ab6-ef6e-4f3f-a3f3-61b0a8ddf4ef' })
  @IsUUID()
  categoryId!: string;

  @ApiProperty({ example: '2026-03-01T00:00:00.000Z' })
  @Type(() => Date)
  @IsDate()
  periodStart!: Date;

  @ApiProperty({ example: '2026-03-31T23:59:59.999Z' })
  @Type(() => Date)
  @IsDate()
  periodEnd!: Date;
}
