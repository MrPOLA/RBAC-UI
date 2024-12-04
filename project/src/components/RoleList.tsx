import React, { useState } from 'react';
import { Role } from '../types';
import { Pencil, Trash2, Shield } from 'lucide-react';
import RoleModal from './RoleModal';
import SearchBar from './common/SearchBar';
import SortableHeader from './common/SortableHeader';
import Badge from './common/Badge';
import { useSort } from '../hooks/useSort';
import { useSearch } from '../hooks/useSearch';

interface RoleListProps {
  roles: Role[];
  onCreateRole: (role: Omit<Role, 'id'>) => Promise<void>;
  onUpdateRole: (role: Role) => Promise<void>;
  onDeleteRole: (id: string) => Promise<void>;
}

export default function RoleList({
  roles,
  onCreateRole,
  onUpdateRole,
  onDeleteRole,
}: RoleListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const { sortedItems, sortConfig, requestSort } = useSort<Role>(roles, 'name');
  const { filteredItems, searchTerm, setSearchTerm } = useSearch<Role>(
    sortedItems,
    ['name', 'description']
  );

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedRole(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (roleData: Role | Omit<Role, 'id'>) => {
    if ('id' in roleData) {
      await onUpdateRole(roleData);
    } else {
      await onCreateRole(roleData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Roles</h2>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Shield size={20} />
          Add Role
        </button>
      </div>

      <div className="mb-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search roles..."
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader<Role>
                label="Name"
                field="name"
                sortConfig={sortConfig}
                onSort={requestSort}
              />
              <SortableHeader<Role>
                label="Description"
                field="description"
                sortConfig={sortConfig}
                onSort={requestSort}
              />
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map((role) => (
              <tr key={role.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  {role.name}
                </td>
                <td className="px-6 py-4">{role.description}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <Badge
                        key={permission}
                        label={permission}
                        variant="info"
                      />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(role)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => onDeleteRole(role.id)}
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
        <RoleModal
          role={selectedRole}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}