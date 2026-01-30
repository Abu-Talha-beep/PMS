'use client';

import React from 'react';
import { Bell, Search } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header = ({ title = 'Welcome back, Manoj', subtitle = 'Track and manage your inventory and orders.' }: HeaderProps) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-8 py-6 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-1">{subtitle}</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-2">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-gray-700 placeholder-gray-400 w-48"
            />
          </div>

          {/* Notifications */}
          <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Logo */}
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500">
            ∞
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
