import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { CommonModule } from '@angular/common'; // Required for *ngIf, pipes

import { OperationsService } from '../services/operations.service';
import { AccountHistoryDTO } from '../models/account.model';
import { AccountOperationDTO } from '../models/operation.model';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class OperationsComponent {
  accountId: string = '';

  // Separate variables for each form
  debitAmount: number = 0;
  debitDescription: string = '';

  creditAmount: number = 0;
  creditDescription: string = '';

  transferAmount: number = 0;
  transferDescription: string = '';
  destinationAccountId: string = '';

  operations: AccountOperationDTO[] = [];
  accountHistory!: AccountHistoryDTO;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private operationsService: OperationsService) {}

  onSubmit(): void {
    if (!this.accountId.trim()) {
      this.error = 'Please enter a valid Account ID.';
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.operationsService.getAccountHistory(this.accountId, 0, 5).subscribe({
      next: (data: AccountHistoryDTO) => {
        this.accountHistory = data;
        this.operations = data.accountOperationDTOS || [];
        this.isLoading = false;
      },
      error: () => {
        this.error =
          'Failed to load transaction history. Please verify the Account ID.';
        this.isLoading = false;
      },
    });
  }

  onDebit(): void {
    const payload = {
      accountId: this.accountId,
      amount: this.debitAmount,
      description: this.debitDescription || 'Debit transaction',
    };
    this.operationsService.debit(payload).subscribe(() => {
      alert('Debit successful');
      this.onSubmit();
    });
  }

  onCredit(): void {
    const payload = {
      accountId: this.accountId,
      amount: this.creditAmount,
      description: this.creditDescription || 'Credit transaction',
    };
    this.operationsService.credit(payload).subscribe(() => {
      alert('Credit successful');
      this.onSubmit();
    });
  }

  onTransfer(): void {
    if (!this.destinationAccountId) {
      alert('Please enter destination account ID.');
      return;
    }
    const payload = {
      accountSource: this.accountId,
      accountDestination: this.destinationAccountId,
      amount: this.transferAmount,
      description: this.transferDescription || 'Transfer transaction',
    };
    this.operationsService.transfer(payload).subscribe(() => {
      alert('Transfer successful');
      this.onSubmit();
    });
  }
}
