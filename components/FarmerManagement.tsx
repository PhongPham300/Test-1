import React, { useState } from 'react';
import { AreaCode, Farmer } from '../types';
import { Plus, Search, Edit2, Trash2, X, Phone, User } from 'lucide-react';

interface FarmerManagementProps {
  farmers: Farmer[];
  areas: AreaCode[];
  onAddFarmer: (farmer: Farmer) => void;
  onUpdateFarmer: (farmer: Farmer) => void;
  onDeleteFarmer: (id: string) => void;
}

const FarmerManagement: React.FC<FarmerManagementProps> = ({ farmers, areas, onAddFarmer, onUpdateFarmer, onDeleteFarmer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFarmer, setEditingFarmer] = useState<Farmer | null>(null);

  const [formData, setFormData] = useState<Partial<Farmer>>({
    name: '',
    phone: '',
    address: '',
    areaId: ''
  });

  const filteredFarmers = farmers.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.phone.includes(searchTerm)
  );

  const handleOpenModal = (farmer?: Farmer) => {
    if (farmer) {
      setEditingFarmer(farmer);
      setFormData(farmer);
    } else {
      setEditingFarmer(null);
      setFormData({ name: '', phone: '', address: '', areaId: areas[0]?.id || '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFarmer) {
      onUpdateFarmer({ ...editingFarmer, ...formData } as Farmer);
    } else {
      onAddFarmer({
        id: crypto.randomUUID(),
        ...formData
      } as Farmer);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Quản Lý Hộ Nông Dân</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" />
          Thêm Nông Dân
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc SĐT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {filteredFarmers.map((farmer) => {
            const area = areas.find(a => a.id === farmer.areaId);
            return (
              <div key={farmer.id} className="bg-slate-50 rounded-lg p-5 border border-slate-200 hover:shadow-md transition-shadow relative group">
                 <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                    <button onClick={() => handleOpenModal(farmer)} className="p-1 bg-white rounded-md shadow-sm text-blue-600 hover:text-blue-700">
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDeleteFarmer(farmer.id)} className="p-1 bg-white rounded-md shadow-sm text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                    </button>
                 </div>
                 <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg">
                        {farmer.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800">{farmer.name}</h3>
                        <div className="flex items-center text-slate-500 text-sm mt-1">
                            <Phone className="w-3 h-3 mr-1" /> {farmer.phone}
                        </div>
                        <div className="mt-2 text-xs text-slate-500 bg-white inline-block px-2 py-1 rounded border border-slate-200">
                            {area ? `Vùng: ${area.code}` : 'Chưa gán vùng'}
                        </div>
                        <p className="mt-2 text-sm text-slate-600 truncate max-w-[200px]">{farmer.address}</p>
                    </div>
                 </div>
              </div>
            )
          })}
        </div>
        {filteredFarmers.length === 0 && (
            <div className="p-12 text-center text-slate-400">Không tìm thấy hộ nông dân nào.</div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800">{editingFarmer ? 'Sửa Thông Tin' : 'Thêm Nông Dân'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Họ và Tên</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none"
                    placeholder="Nguyễn Văn A"
                    />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Số Điện Thoại</label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none"
                    />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Địa Chỉ</label>
                <input
                  required
                  type="text"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vùng Trồng</label>
                <select
                  value={formData.areaId}
                  onChange={e => setFormData({...formData, areaId: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none"
                >
                  <option value="">-- Chọn vùng trồng --</option>
                  {areas.map(area => (
                    <option key={area.id} value={area.id}>{area.name} ({area.code})</option>
                  ))}
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                >
                  {editingFarmer ? 'Cập Nhật' : 'Lưu Hồ Sơ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerManagement;