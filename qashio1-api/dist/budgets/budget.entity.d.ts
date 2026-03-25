import { Category } from '../categories/category.entity';
export declare class Budget {
    id: string;
    amount: number;
    periodStart: Date;
    periodEnd: Date;
    categoryId: string;
    category: Category;
    createdAt: Date;
    updatedAt: Date;
}
