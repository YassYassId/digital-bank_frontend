import { Component } from '@angular/core';
import { AccountsService } from '../services/accounts.service';
import { BankAccountDTO } from '../models/account.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class AccountsComponent {
  accounts: BankAccountDTO[] = [];

  constructor(
    private accountsService: AccountsService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts(): void {
    this.accountsService.getAll().subscribe(
      (data: BankAccountDTO[]) => {
        this.accounts = data;
      },
      (error) => {
        console.error('Error fetching accounts:', error);
      }
    );
  }

  addAccount(): void {
    const newAccount: BankAccountDTO = {
      id: '',
      balance: 0,
      createdAt: new Date(),
      type: 'SavingAccount',
      customerDTO: {
        id: 0,
        name: '',
        email: '',
      },
      status: null,
    };

    this.accountsService.create(newAccount).subscribe((createdAccount) => {
      this.accounts.push(createdAccount);
    });
  }

  editAccount(account: BankAccountDTO): void {
    // Navigate to edit page with account ID
    this.router.navigate(['/accounts/edit', account.id]);
  }

  deleteAccount(id: string): void {
    if (confirm('Are you sure you want to delete this account?')) {
      this.accountsService.delete(id).subscribe({
        next: () => {
          console.log('✅ Account deleted successfully');
          this.accounts = this.accounts.filter((a) => a.id !== id);
        },
        error: (err) => {
          console.error('❌ Error deleting account:', err);
          alert('Failed to delete account. Check console.');
        },
      });
    }
  }

  // ✅ New Method: Get Tailwind class based on status
  getStatusClass(status: string | null): string {
    switch (status) {
      case 'ACTIVATED':
        return 'px-2 py-1 rounded bg-green-100 text-green-800 text-sm font-medium';
      case 'SUSPENDED':
        return 'px-2 py-1 rounded bg-red-100 text-red-800 text-sm font-medium';
      case 'CREATED':
        return 'px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-sm font-medium';
      default:
        return 'text-gray-400 italic';
    }
  }
}
