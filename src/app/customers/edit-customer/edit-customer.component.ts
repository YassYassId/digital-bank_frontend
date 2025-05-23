import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../../services/customers.service';
import { CommonModule } from '@angular/common';
import { CustomerDTO } from '../../models/customer.model';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent implements OnInit {
  editForm!: FormGroup;
  customerId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private customersService: CustomersService,
    public router: Router
  ) {}

  ngOnInit(): void {
    // Get customer ID from URL
    this.route.params.subscribe((params) => {
      this.customerId = +params['id'];
      this.loadCustomer(this.customerId);
    });

    // Initialize form
    this.editForm = this.fb.group({
      name: [''],
      email: [''],
    });
  }

  loadCustomer(id: number): void {
    this.customersService.getCustomer(id).subscribe({
      next: (customer: CustomerDTO) => {
        this.editForm.patchValue(customer);
      },
      error: (err) => {
        console.error('Error fetching customer:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedCustomer = this.editForm.value;

      this.customersService.update(this.customerId, updatedCustomer).subscribe({
        next: () => {
          this.router.navigate(['/customers']);
        },
        error: (err) => {
          console.error('Error updating customer:', err);
        },
      });
    }
  }
}
