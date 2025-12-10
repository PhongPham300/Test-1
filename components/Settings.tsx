
import React from 'react';
import { Database, RefreshCw, Trash2, Info, Shield, Server, Settings as SettingsIcon } from 'lucide-react';

interface SettingsProps {
  onResetData: () => void;
  onClearData: () => void;
  stats: {
    areasCount: number;
    farmersCount: number;
    purchasesCount: number;
  }
}

const Settings: React.FC<SettingsProps> = ({ onResetData, onClearData, stats }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* System Status Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="p-2 bg-slate-100 rounded-lg">
                <Server className="w-5 h-5 text-slate-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Trạng Thái Hệ Thống</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-500 mb-1">Vùng Trồng</p>
                <p className="text-2xl font-bold text-slate-800">{stats.areasCount}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-500 mb-1">Hộ Nông Dân</p>
                <p className="text-2xl font-bold text-slate-800">{stats.farmersCount}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-500 mb-1">Bản Ghi Thu Mua</p>
                <p className="text-2xl font-bold text-slate-800">{stats.purchasesCount}</p>
            </div>
        </div>
      </div>

      {/* Data Management Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
                <Database className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Quản Lý Dữ Liệu</h3>
        </div>
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                <div>
                    <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-green-600" />
                        Khôi phục dữ liệu mẫu
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">
                        Đặt lại toàn bộ cơ sở dữ liệu về trạng thái ban đầu với dữ liệu demo.
                    </p>
                </div>
                <button 
                    onClick={onResetData}
                    className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm whitespace-nowrap"
                >
                    Khôi Phục
                </button>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 bg-red-50 rounded-xl border border-red-100 border-dashed">
                <div>
                    <h4 className="font-semibold text-red-800 flex items-center gap-2">
                        <Trash2 className="w-4 h-4 text-red-600" />
                        Xóa toàn bộ dữ liệu
                    </h4>
                    <p className="text-sm text-red-600/80 mt-1">
                        Hành động này sẽ xóa vĩnh viễn tất cả vùng trồng, nông dân và lịch sử thu mua.
                    </p>
                </div>
                <button 
                    onClick={onClearData}
                    className="px-4 py-2 bg-white border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors shadow-sm whitespace-nowrap"
                >
                    Xóa Dữ Liệu
                </button>
            </div>
        </div>
      </div>

      {/* App Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
                <Info className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Thông Tin Ứng Dụng</h3>
        </div>
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Tên ứng dụng</span>
                    <span className="font-medium text-slate-800">Hoa Cương Agri Manager</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Phiên bản</span>
                    <span className="font-medium text-slate-800">v1.2.0 (Beta)</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Giấy phép</span>
                    <span className="font-medium text-slate-800">Enterprise License</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Cập nhật lần cuối</span>
                    <span className="font-medium text-slate-800">20/10/2023</span>
                </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 text-blue-800 text-sm rounded-lg flex gap-3">
                <Shield className="w-5 h-5 flex-shrink-0" />
                <p>
                    Hệ thống được bảo mật và dữ liệu được mã hóa cục bộ. Vui lòng liên hệ quản trị viên nếu cần xuất dữ liệu nhạy cảm.
                </p>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Settings;
