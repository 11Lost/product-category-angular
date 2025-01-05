import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Categories
  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  addCategory(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/categories`, data);
  }

  updateCategory(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/categories/${id}`, data);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categories/${id}`);
  }

  // Products
  getProducts(page: number, size: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products?page=${page}&size=${size}`);
  }

  addProduct(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, data);
  }

  updateProduct(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${id}`, data);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }
}
