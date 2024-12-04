export type Permission = 'read' | 'write' | 'delete' | 'manage';

export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  isActive: boolean;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  description: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}