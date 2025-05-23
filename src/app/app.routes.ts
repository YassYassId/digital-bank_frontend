import { Routes } from '@angular/router';

// Layout Component
import { LayoutComponent } from './layout/layout/layout.component';

// Customer Feature
import { CustomersComponent } from './customers/customers.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';

// Account Feature
import { AccountsComponent } from './accounts/accounts.component';
import { AddAccountComponent } from './accounts/add-account/add-account.component';
import { EditAccountComponent } from './accounts/edit-account/edit-account.component';

// Operations Feature
import { OperationsComponent } from './operations/operations.component';

// Auth
import { SignInComponent } from './auth/sign-in/sign-in.component';

// Guards
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard], // 🔐 Protect layout and all its children
    children: [
      // Customers
      { path: 'customers', component: CustomersComponent },
      { path: 'customers/new', component: AddCustomerComponent },
      { path: 'customers/edit/:id', component: EditCustomerComponent },

      // Accounts
      { path: 'accounts', component: AccountsComponent },
      { path: 'accounts/new', component: AddAccountComponent },
      { path: 'accounts/edit/:id', component: EditAccountComponent },

      // Transactions / Operations
      { path: 'operations', component: OperationsComponent },
    ],
  },

  // Public routes
  {
    path: 'signin',
    loadComponent: () =>
      import('./auth/sign-in/sign-in.component').then((c) => c.SignInComponent),
  },

  // Redirect to default
  { path: '', redirectTo: '/accounts', pathMatch: 'full' },
];
