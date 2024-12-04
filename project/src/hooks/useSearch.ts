import { useState, useMemo } from 'react';

export function useSearch<T>(items: T[], searchableFields: (keyof T)[]) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return items.filter(item =>
      searchableFields.some(field => {
        const value = item[field];
        return String(value).toLowerCase().includes(lowerSearchTerm);
      })
    );
  }, [items, searchTerm, searchableFields]);

  return { filteredItems, searchTerm, setSearchTerm };
}