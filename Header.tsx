import React from 'react';
import { Bell, Menu, UserCircle } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, title }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-slate-800">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
            <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-700">Quản Trị Viên</p>
                <p className="text-xs text-slate-400">Admin</p>
            </div>
            <UserCircle className="w-10 h-10 text-slate-300" />
        </div>
      </div>
    </header>
  );
};

export default Header;
