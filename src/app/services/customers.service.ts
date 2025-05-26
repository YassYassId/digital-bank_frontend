import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private apiUrl = 'http://localhost:8085/customers'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCustomer(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(customer: any): Observable<any> {
    return this.http.post(this.apiUrl, customer);
  }

  update(id: number, customer: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, customer);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchCustomers(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/search?keyword=${encodeURIComponent(keyword)}`
    );
  }
}
