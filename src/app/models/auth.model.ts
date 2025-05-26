export interface SignInRequest {
  email: string;
  password: string;
}

export interface JwtAuthenticationResponse {
  token: string;
  refreshToken: string;
}
