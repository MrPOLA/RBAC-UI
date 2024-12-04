import React from 'react';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'error' | 'info';
}

export default function Badge({ label, variant = 'info' }: BadgeProps) {
  const variantClasses = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${variantClasses[variant]}`}>
      {label}
    </span>
  );
}