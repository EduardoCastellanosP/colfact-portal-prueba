import type { UserRole } from './auth';

export interface User {
  id: number;
  fullName: string;
  userName: string;
  identification: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export interface UserListResponse {
  data: User[];
  total: number;
  page: number;
}