import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { Budget } from './budget.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Budgets')
@UseGuards(JwtAuthGuard)
@Controller('budgets')
/**
 * Exposes budget endpoints for creation, listing, and usage insights.
 */
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  @ApiCreatedResponse({ type: Budget })
  create(@Body() createBudgetDto: CreateBudgetDto): Promise<Budget> {
    return this.budgetsService.create(createBudgetDto);
  }

  @Get()
  @ApiOkResponse({
    schema: {
      example: {
        data: [],
      },
    },
  })
  findAll() {
    return this.budgetsService.findAll();
  }

  @Get(':id/usage')
  @ApiOkResponse({
    schema: {
      example: {
        spent: 120,
        total: 500,
        remaining: 380,
        percentageUsed: 24,
        isOverBudget: false,
      },
    },
  })
  getUsage(@Param('id') id: string) {
    return this.budgetsService.getBudgetUsage(id);
  }
}
