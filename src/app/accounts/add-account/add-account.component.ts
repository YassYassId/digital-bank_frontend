import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from '../../services/accounts.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css'],
})
export class AddAccountComponent {
  accountForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountsService: AccountsService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      type: ['SavingAccount', Validators.required],
      initialBalance: [0, [Validators.required, Validators.min(0)]],
      customerId: ['', [Validators.required]],
      interestRate: [5.5],
      overDraft: [0],
      status: ['CREATED'],
    });
  }

  onSubmit(): void {
    if (this.accountForm.invalid) return;

    const formValue = this.accountForm.value;

    // Ensure initialBalance has a default value even if not set
    const payload: any = {
      type: formValue.type,
      customerId: formValue.customerId,
      initialBalance: formValue.initialBalance || 0, // Prevent null
      status: formValue.status,
    };

    if (formValue.type === 'SavingAccount') {
      payload.interestRate = formValue.interestRate || 5.5;
    } else if (formValue.type === 'CurrentAccount') {
      payload.overDraft = formValue.overDraft || 0;
    }

    this.accountsService.create(payload).subscribe({
      next: () => {
        this.router.navigate(['/accounts']);
      },
      error: (err) => {
        console.error('Error creating account:', err);
        alert('Failed to create account. Make sure all fields are filled.');
      },
    });
  }
}
