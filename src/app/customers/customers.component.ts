// customers.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersService } from '../services/customers.service';
import { CustomerDTO } from '../models/customer.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent {
  customers: CustomerDTO[] = [];
  searchKeyword: string = '';
  loading: boolean = false;

  constructor(
    private customersService: CustomersService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    this.loading = true;
    this.customersService.getAll().subscribe(
      (data) => {
        this.customers = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching customers:', error);
        this.loading = false;
      }
    );
  }

  searchCustomers(): void {
    if (!this.searchKeyword.trim()) {
      this.fetchCustomers();
      return;
    }
    this.loading = true;
    this.customersService.searchCustomers(this.searchKeyword).subscribe(
      (data) => {
        this.customers = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error searching customers:', error);
        this.loading = false;
      }
    );
  }

  addCustomer(): void {
    const newCustomer: CustomerDTO = {
      id: NaN,
      name: 'New Customer',
      email: 'new@example.com',
    };
    this.customersService.create(newCustomer).subscribe(
      (createdCustomer) => {
        this.customers.push(createdCustomer);
      },
      (error) => {
        console.error('Error creating customer:', error);
      }
    );
  }

  editCustomer(customer: CustomerDTO): void {
    console.log('Editing customer:', customer);
  }

  deleteCustomer(id: number): void {
    this.customersService.delete(id).subscribe(
      () => {
        this.customers = this.customers.filter((c) => c.id !== id);
      },
      (error) => {
        console.error('Error deleting customer:', error);
      }
    );
  }
}
