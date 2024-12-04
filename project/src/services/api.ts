import { User, Role } from '../types';

// Simulated data
let users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', roleId: '1', isActive: true },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', roleId: '2', isActive: true },
];

let roles: Role[] = [
  { id: '1', name: 'Admin', permissions: ['read', 'write', 'delete', 'manage'], description: 'Full system access' },
  { id: '2', name: 'Editor', permissions: ['read', 'write'], description: 'Can edit content' },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Users
  getUsers: async () => {
    await delay(500);
    return { data: users, success: true };
  },

  createUser: async (user: Omit<User, 'id'>) => {
    await delay(500);
    const newUser = { ...user, id: Math.random().toString(36).substr(2, 9) };
    users = [...users, newUser];
    return { data: newUser, success: true };
  },

  updateUser: async (user: User) => {
    await delay(500);
    users = users.map(u => u.id === user.id ? user : u);
    return { data: user, success: true };
  },

  deleteUser: async (id: string) => {
    await delay(500);
    users = users.filter(u => u.id !== id);
    return { success: true };
  },

  // Roles
  getRoles: async () => {
    await delay(500);
    return { data: roles, success: true };
  },

  createRole: async (role: Omit<Role, 'id'>) => {
    await delay(500);
    const newRole = { ...role, id: Math.random().toString(36).substr(2, 9) };
    roles = [...roles, newRole];
    return { data: newRole, success: true };
  },

  updateRole: async (role: Role) => {
    await delay(500);
    roles = roles.map(r => r.id === role.id ? role : r);
    return { data: role, success: true };
  },

  deleteRole: async (id: string) => {
    await delay(500);
    roles = roles.filter(r => r.id !== id);
    return { success: true };
  },
};