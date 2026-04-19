export type UserRole = 'Admin' | 'Issuer' | 'IssuerViewer';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  role: UserRole;
  fullName: string;
}

export interface LoginCredentials {
  userName: string;
  password: string;
}