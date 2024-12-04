import React, { useState, useEffect } from 'react';
import { User, Role } from './types';
import { api } from './services/api';
import UserList from './components/UserList';
import RoleList from './components/RoleList';
import { Shield, Users } from 'lucide-react';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [usersResponse, rolesResponse] = await Promise.all([
      api.getUsers(),
      api.getRoles(),
    ]);

    if (usersResponse.success) setUsers(usersResponse.data);
    if (rolesResponse.success) setRoles(rolesResponse.data);
  };

  // User handlers
  const handleCreateUser = async (userData: Omit<User, 'id'>) => {
    const response = await api.createUser(userData);
    if (response.success) {
      setUsers([...users, response.data]);
    }
  };

  const handleUpdateUser = async (userData: User) => {
    const response = await api.updateUser(userData);
    if (response.success) {
      setUsers(users.map(user => user.id === userData.id ? userData : user));
    }
  };

  const handleDeleteUser = async (id: string) => {
    const response = await api.deleteUser(id);
    if (response.success) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  // Role handlers
  const handleCreateRole = async (roleData: Omit<Role, 'id'>) => {
    const response = await api.createRole(roleData);
    if (response.success) {
      setRoles([...roles, response.data]);
    }
  };

  const handleUpdateRole = async (roleData: Role) => {
    const response = await api.updateRole(roleData);
    if (response.success) {
      setRoles(roles.map(role => role.id === roleData.id ? roleData : role));
    }
  };

  const handleDeleteRole = async (id: string) => {
    const response = await api.deleteRole(id);
    if (response.success) {
      setRoles(roles.filter(role => role.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <nav className="bg-white border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Shield className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-bold text-secondary-900">RBAC Manager</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-semibold text-secondary-900">Access Management</h1>
              <p className="mt-2 text-sm text-secondary-600">
                Manage your system's users and roles with granular permission control.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="border-b border-secondary-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('users')}
                className={`${
                  activeTab === 'users'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:border-secondary-300 hover:text-secondary-700'
                } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
              >
                <Users className="mr-2 h-5 w-5" />
                Users
              </button>
              <button
                onClick={() => setActiveTab('roles')}
                className={`${
                  activeTab === 'roles'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:border-secondary-300 hover:text-secondary-700'
                } flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
              >
                <Shield className="mr-2 h-5 w-5" />
                Roles
              </button>
            </nav>
          </div>
        </div>

        <div className="animate-fade-in">
          {activeTab === 'users' ? (
            <UserList
              users={users}
              roles={roles}
              onCreateUser={handleCreateUser}
              onUpdateUser={handleUpdateUser}
              onDeleteUser={handleDeleteUser}
            />
          ) : (
            <RoleList
              roles={roles}
              onCreateRole={handleCreateRole}
              onUpdateRole={handleUpdateRole}
              onDeleteRole={handleDeleteRole}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;