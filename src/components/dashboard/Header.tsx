
import React from 'react';
import { Bell, User } from 'lucide-react';

export const Header = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Ringkasan aktivitas bisnis Anda</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:bg-blue-50 rounded-lg">
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center space-x-3 bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">Admin User</p>
            <p className="text-xs text-gray-600">Administrator</p>
          </div>
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
