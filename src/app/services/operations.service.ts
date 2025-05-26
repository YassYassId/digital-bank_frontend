import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AccountOperationDTO } from '../models/operation.model';
import { AccountHistoryDTO } from '../models/account.model';
import { DebitDTO } from '../models/debit.model';

import { CreditDTO } from '../models/credit.model';
import { TransferRequestDTO } from '../models/transfer.model';

@Injectable({
  providedIn: 'root',
})
export class OperationsService {
  private apiUrl = 'http://localhost:8085/accounts';

  constructor(private http: HttpClient) {}

  getAccountHistory(
    accountId: string,
    page: number,
    size: number
  ): Observable<AccountHistoryDTO> {
    return this.http.get<AccountHistoryDTO>(
      `${this.apiUrl}/${accountId}/pageOperations?page=${page}&size=${size}`
    );
  }

  debit(debit: DebitDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/debit`, debit);
  }

  credit(credit: CreditDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/credit`, credit);
  }

  transfer(transfer: TransferRequestDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/transfer`, transfer);
  }
}
