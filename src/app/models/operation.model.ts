// src/app/models/operation.model.ts
export interface AccountOperationDTO {
  id: number;
  operationDate: Date;
  amount: number;
  type: string;
  description: string;
  balance: number;
}

export interface AccountOperationDTO {
  id: number;
  operationDate: Date;
  amount: number;
  type: string; // e.g., "DEBIT", "CREDIT"
  description: string;
  balance: number;
}
