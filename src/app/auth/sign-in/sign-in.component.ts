import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Required for ngModel
import { CommonModule } from '@angular/common'; // ✅ Required for pipes and directives
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import {
  SignInRequest,
  JwtAuthenticationResponse,
} from '../../models/auth.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  standalone: true,
  imports: [
    CommonModule, // For built-in directives like *ngIf, *ngFor
    FormsModule, // For ngModel, ngForm
  ],
})
export class SignInComponent {
  signInRequest: SignInRequest = {
    email: '',
    password: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    if (!this.signInRequest.email || !this.signInRequest.password) {
      alert('Please enter both email and password');
      return;
    }

    this.userService.signIn(this.signInRequest).subscribe({
      next: (response: JwtAuthenticationResponse) => {
        console.log('Login successful', response);

        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);

        this.router.navigate(['/accounts']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Invalid credentials. Please try again.');
      },
    });
  }
}
