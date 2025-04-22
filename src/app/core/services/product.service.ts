import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {PaginatedResponse, Product} from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = '/api/v2/products';

  constructor(private readonly http: HttpClient) { }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPaginatedProducts(page: number, size: number): Observable<PaginatedResponse<Product>> {
    return this.http.get<PaginatedResponse<Product>>(this.apiUrl, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }
}
