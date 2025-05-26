// src/app/models/account.model.ts
import { AccountOperationDTO } from './operation.model';

export interface BankAccountDTO {
  id: string;
  balance: number;
  createdAt: Date; // ISO date string
  type: 'SavingAccount' | 'CurrentAccount';
  status: 'CREATED' | 'ACTIVATED' | 'SUSPENDED' | null;
  customerDTO: CustomerDTO;
  interestRate?: number;
  overDraft?: number;
}

export interface CustomerDTO {
  id: number;
  name: string;
  email: string;
}

export interface CurrentBankAccountDTO extends BankAccountDTO {
  overDraft: number;
}

export interface SavingBankAccountDTO extends BankAccountDTO {
  interestRate: number;
}

export interface AccountHistoryDTO {
  accountId: string;
  balance: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  accountOperationDTOS: AccountOperationDTO[];
}
