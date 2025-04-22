import {Category} from './category.model';

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  status: boolean
  code?: string;
  category: Category;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
}
