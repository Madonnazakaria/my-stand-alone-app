import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './api-constants';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private http: HttpClient) {}

  // All products (fakestore)
  getAll(): Observable<any> {
    return this.http.get(`${API.FAKESTORE}/products`);
  }

  // Product by id
  getById(id: number): Observable<any> {
    return this.http.get(`${API.FAKESTORE}/products/${id}`);
  }

  // Products by fakestore category
  getByCategory(category: string): Observable<any> {
    return this.http.get(`${API.FAKESTORE}/products/category/${encodeURIComponent(category)}`);
  }

  // Search via dummyjson (for the search page)
  search(query: string): Observable<any> {
    return this.http.get(`${API.DUMMYJSON}/products/search?q=${encodeURIComponent(query)}`);
  }
}

