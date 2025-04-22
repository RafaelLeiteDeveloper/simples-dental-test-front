import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';
import {PaginatedResponse} from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly apiUrl = '/api/categories';

  constructor(private readonly http: HttpClient) { }

  getAllCategories(): Observable<{ content: Category[] }> {
    return this.http.get<{ content: Category[] }>(this.apiUrl);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCategoriesPaginated(page: number, size: number): Observable<PaginatedResponse<Category>> {
    return this.http.get<PaginatedResponse<Category>>(`/api/categories?page=${page}&size=${size}`);
  }
}
