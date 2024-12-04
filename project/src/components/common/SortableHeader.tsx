import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { SortConfig } from '../../hooks/useSort';

interface SortableHeaderProps<T> {
  label: string;
  field: keyof T;
  sortConfig: SortConfig<T>;
  onSort: (field: keyof T) => void;
}

export default function SortableHeader<T>({
  label,
  field,
  sortConfig,
  onSort,
}: SortableHeaderProps<T>) {
  const getSortIcon = () => {
    if (sortConfig.key !== field) return <ArrowUpDown size={16} />;
    return sortConfig.direction === 'asc' ? (
      <ArrowUp size={16} />
    ) : (
      <ArrowDown size={16} />
    );
  };

  return (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        {label}
        {getSortIcon()}
      </div>
    </th>
  );
}