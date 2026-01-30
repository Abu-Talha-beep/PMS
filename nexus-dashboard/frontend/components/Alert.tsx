'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface AlertProps {
  variant?: 'error' | 'success' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
}

const Alert = ({ variant = 'info', title, message, onClose }: AlertProps) => {
  const baseStyle = 'p-4 rounded-lg border flex items-start gap-3 mb-4';
  const variants = {
    error: 'bg-red-50 border-red-200 text-red-700',
    success: 'bg-green-50 border-green-200 text-green-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700',
  };

  return (
    <div className={`${baseStyle} ${variants[variant]}`}>
      <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        {title && <p className="font-semibold">{title}</p>}
        <p className="text-sm">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-xl font-bold">
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
