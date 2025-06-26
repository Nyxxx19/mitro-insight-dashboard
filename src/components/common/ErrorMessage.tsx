
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center py-8 text-red-600">
      <AlertCircle className="h-5 w-5 mr-2" />
      <span>Error: {message}</span>
    </div>
  );
};
