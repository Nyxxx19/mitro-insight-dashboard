
import React, { useState } from 'react';
import { 
  User, 
  Users, 
  Database, 
  FileText, 
  BarChart, 
  Bell,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const menuItems = [
  { icon: BarChart, label: 'Dashboard', path: '/' },
  { icon: User, label: 'User', path: '/user' },
  { icon: Database, label: 'Produk', path: '/produk' },
  { icon: Users, label: 'Supplier', path: '/supplier' },
  { icon: BarChart, label: 'Sales', path: '/sales' },
  { icon: FileText, label: 'Transaksi', path: '/transaksi' },
  { icon: Database, label: 'Data', path: '/data' },
  { icon: FileText, label: 'Laporan', path: '/laporan' },
];

const mitroSubmenu = [
  { label: 'Data Mitra', path: '/mitro/data' },
  { label: 'Laporan Mitra', path: '/mitro/laporan' },
  { label: 'Transaksi Mitra', path: '/mitro/transaksi' },
];

export const Sidebar = () => {
  const [isMitroOpen, setIsMitroOpen] = useState(false);

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">Admin Dashboard</h1>
      </div>
      
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.path}
            className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
        
        <div className="pt-2">
          <button
            onClick={() => setIsMitroOpen(!isMitroOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
          >
            <div className="flex items-center">
              <Database className="w-5 h-5 mr-3" />
              <span className="font-medium">Mitro BUMDes</span>
            </div>
            {isMitroOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          
          {isMitroOpen && (
            <div className="ml-8 mt-2 space-y-1">
              {mitroSubmenu.map((item, index) => (
                <a
                  key={index}
                  href={item.path}
                  className="block px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
