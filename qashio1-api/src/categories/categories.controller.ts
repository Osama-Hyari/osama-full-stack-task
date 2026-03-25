import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Categories')
@UseGuards(JwtAuthGuard)
@Controller('categories')
/**
 * Handles HTTP endpoints for creating and listing categories.
 */
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiCreatedResponse({ type: Category })
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOkResponse({ type: Category, isArray: true })
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }
}
