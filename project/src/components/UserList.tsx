import React, { useState } from 'react';
import { User, Role } from '../types';
import { Pencil, Trash2, UserPlus } from 'lucide-react';
import UserModal from './UserModal';
import SearchBar from './common/SearchBar';
import SortableHeader from './common/SortableHeader';
import Badge from './common/Badge';
import { useSort } from '../hooks/useSort';
import { useSearch } from '../hooks/useSearch';

interface UserListProps {
  users: User[];
  roles: Role[];
  onCreateUser: (user: Omit<User, 'id'>) => Promise<void>;
  onUpdateUser: (user: User) => Promise<void>;
  onDeleteUser: (id: string) => Promise<void>;
}

export default function UserList({
  users,
  roles,
  onCreateUser,
  onUpdateUser,
  onDeleteUser,
}: UserListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { sortedItems, sortConfig, requestSort } = useSort<User>(users, 'name');
  const { filteredItems, searchTerm, setSearchTerm } = useSearch<User>(
    sortedItems,
    ['name', 'email']
  );

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (userData: User | Omit<User, 'id'>) => {
    if ('id' in userData) {
      await onUpdateUser(userData);
    } else {
      await onCreateUser(userData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Users</h2>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <UserPlus size={20} />
          Add User
        </button>
      </div>

      <div className="mb-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search users..."
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader<User>
                label="Name"
                field="name"
                sortConfig={sortConfig}
                onSort={requestSort}
              />
              <SortableHeader<User>
                label="Email"
                field="email"
                sortConfig={sortConfig}
                onSort={requestSort}
              />
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {roles.find((role) => role.id === user.roleId)?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge
                    label={user.isActive ? 'Active' : 'Inactive'}
                    variant={user.isActive ? 'success' : 'error'}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <UserModal
          user={selectedUser}
          roles={roles}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}