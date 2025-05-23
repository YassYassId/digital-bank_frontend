import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
})
export class HeaderComponent {
  constructor(private authService: AuthService, public router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  signOut(): void {
    this.authService.signOut();
  }
}
