import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/api/products');
  }

  getProductsByFilter(filter: string): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/api/products?filter=' + filter);
  }

  searchProductsByTitle(title: string): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/api/products/search?title=' + title);
  }


  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }
  
  updateProduct(productId: string, product: Product): Observable<Product> {
    const url = `${this.apiUrl}/products/${productId}`; // Ajouter l'ID du produit à l'URL
    return this.http.put<Product>(url, product);
  }



  deleteProduct(productId: string): Observable<void> {
    const url = `${this.apiUrl}/products/${productId}`;
    return this.http.delete<void>(url);
  }


  getProductById(productId: string): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<Product>(url);
  }


}
