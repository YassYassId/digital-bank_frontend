import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtAuthenticationResponse, SignInRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8085/api/auth';

  constructor(private http: HttpClient) {}

  // Sign In
  signIn(request: SignInRequest): Observable<JwtAuthenticationResponse> {
    console.log('SignIn request:', request);

    return this.http.post<JwtAuthenticationResponse>(
      `${this.apiUrl}/login`,
      request
    );
  }

  // Save User
  saveUser(user: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/save`, user);
  }

  // Refresh Token
  refreshToken(refreshToken: string): Observable<JwtAuthenticationResponse> {
    return this.http.post<JwtAuthenticationResponse>(
      `${this.apiUrl}/refresh-token`,
      {
        refreshToken,
      }
    );
  }
}
