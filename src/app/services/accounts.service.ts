import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountOperationDTO } from '../models/operation.model'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private apiUrl = 'http://localhost:8085/accounts'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAccount(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(account: any): Observable<any> {
    return this.http.post(this.apiUrl, account);
  }

  update(id: string, account: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, account);
  }

  updateAccount(id: string, updateData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updateData);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAccountHistory(accountId: string): Observable<AccountOperationDTO[]> {
    return this.http.get<AccountOperationDTO[]>(
      `${this.apiUrl}/${accountId}/operations`
    );
  }
}
