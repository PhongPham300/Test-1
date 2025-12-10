import React from 'react';
import { LayoutDashboard, Map, Users, ShoppingCart, BrainCircuit, Leaf } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tổng Quan', icon: LayoutDashboard },
    { id: 'areas', label: 'Mã Vùng Trồng', icon: Map },
    { id: 'farmers', label: 'Hộ Nông Dân', icon: Users },
    { id: 'purchases', label: 'Thu Mua', icon: ShoppingCart },
    { id: 'ai-insights', label: 'AI Phân Tích', icon: BrainCircuit },
  ];

  return (
    <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out flex flex-col`}>
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <Leaf className="w-8 h-8 text-green-600 mr-2" />
        <span className="text-xl font-bold text-slate-800">Hoa Cương</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onChangeView(item.id as ViewState)}
                  className={`w-full flex items-center px-3 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-green-50 text-green-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-green-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 text-white">
          <p className="text-xs font-medium text-green-100 mb-1">Phiên bản Pro</p>
          <p className="text-sm font-semibold mb-3">Nâng cấp quản lý</p>
          <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-colors">
            Xem chi tiết
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
