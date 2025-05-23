import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../../services/accounts.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css'],
})
export class EditAccountComponent implements OnInit {
  accountId!: string;
  editForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private accountsService: AccountsService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('id')!;
    this.accountsService.getAccount(this.accountId).subscribe((account) => {
      this.editForm = this.fb.group({
        id: [account.id],
        balance: [account.balance], // Still allow edit?
        type: [account.type],
        customerId: [account.customerDTO.id],
        interestRate: [account.interestRate || 5.5],
        overDraft: [account.overDraft || 0],
        status: [account.status || 'CREATED'],
      });
    });
  }

  onSubmit(): void {
    const payload = {
      status: this.editForm.get('status')?.value,
      interestRate: this.editForm.get('interestRate')?.value,
      overDraft: this.editForm.get('overDraft')?.value,
    };

    console.log('Sending:', payload);

    this.accountsService.updateAccount(this.accountId, payload).subscribe({
      next: () => {
        console.log('✅ Success');
        this.router.navigate(['/accounts']);
      },
      error: (err) => {
        console.error('❌ Error:', err);
      },
    });
  }
}
