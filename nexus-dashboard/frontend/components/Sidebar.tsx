'use client';

import React from 'react';
import { Menu, Home, Package, Users, FileText, BarChart3, HelpCircle, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Sidebar = () => {
  const router = useRouter();
  const { logout, user } = useAuthStore();
  const [isOpen, setIsOpen] = React.useState(true);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const menuItems = [
    { icon: Home, label: 'Home', href: '/dashboard' },
    { icon: Package, label: 'Inventory', href: '/inventory' },
    { icon: FileText, label: 'Distributes', href: '/distributes' },
    { icon: Users, label: 'Users', href: '/users' },
    { icon: BarChart3, label: 'Reporting', href: '/reporting' },
    { icon: HelpCircle, label: 'Support', href: '/support' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <div className={`${isOpen ? 'w-80' : 'w-20'} bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 flex flex-col`}>
      {/* Logo section */}
      <div className="p-6 flex items-center justify-between border-b border-gray-200">
        {isOpen && <h1 className="text-xl font-bold text-gray-900">NEXUS</h1>}
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-all"
          >
            <item.icon size={20} />
            {isOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* User section */}
      <div className="border-t border-gray-200 p-4">
        {isOpen && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">Logged in as</p>
            <p className="font-semibold text-gray-900">{user?.name || 'User'}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
