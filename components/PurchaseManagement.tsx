import React, { useState } from 'react';
import { Farmer, PurchaseRecord, QualityType } from '../types';
import { Plus, Search, FileDown, TrendingUp, Calendar, Trash2 } from 'lucide-react';
import { utils, writeFile } from 'xlsx';

interface PurchaseManagementProps {
  purchases: PurchaseRecord[];
  farmers: Farmer[];
  onAddPurchase: (record: PurchaseRecord) => void;
  onDeletePurchase: (id: string) => void;
}

const PurchaseManagement: React.FC<PurchaseManagementProps> = ({ purchases, farmers, onAddPurchase, onDeletePurchase }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState<Partial<PurchaseRecord>>({
    farmerId: '',
    date: new Date().toISOString().split('T')[0],
    weight: 0,
    pricePerKg: 0,
    quality: QualityType.TYPE_1,
    note: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalAmount = (formData.weight || 0) * (formData.pricePerKg || 0);
    onAddPurchase({
      id: crypto.randomUUID(),
      totalAmount,
      ...formData
    } as PurchaseRecord);
    setFormData({
        farmerId: '',
        date: new Date().toISOString().split('T')[0],
        weight: 0,
        pricePerKg: 0,
        quality: QualityType.TYPE_1,
        note: ''
    });
    setIsFormOpen(false);
  };

  const handleExportExcel = () => {
    const data = purchases.map(p => {
        const farmer = farmers.find(f => f.id === p.farmerId);
        return {
            'Ngày': p.date,
            'Nông Dân': farmer?.name || 'Unknown',
            'Khối Lượng (kg)': p.weight,
            'Chất Lượng': p.quality,
            'Đơn Giá (VND)': p.pricePerKg,
            'Thành Tiền (VND)': p.totalAmount,
            'Ghi Chú': p.note
        };
    });
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Thu Mua");
    writeFile(wb, "HoaCuong_ThuMua.xlsx");
  };

  const filteredPurchases = purchases.filter(p => {
    const farmer = farmers.find(f => f.id === p.farmerId);
    return farmer?.name.toLowerCase().includes(searchTerm.toLowerCase());
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Hoạt Động Thu Mua</h2>
        <div className="flex gap-2">
            <button 
            onClick={handleExportExcel}
            className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
            >
            <FileDown className="w-5 h-5 mr-2" />
            Xuất Excel
            </button>
            <button 
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
            >
            <Plus className="w-5 h-5 mr-2" />
            Ghi Nhận Mới
            </button>
        </div>
      </div>

      {isFormOpen && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 animate-in slide-in-from-top-4 duration-300">
            <h3 className="font-bold text-lg text-green-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Phiếu Thu Mua Mới
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">Nông Dân</label>
                    <select
                        required
                        value={formData.farmerId}
                        onChange={e => setFormData({...formData, farmerId: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none"
                    >
                        <option value="">-- Chọn nông dân --</option>
                        {farmers.map(f => (
                            <option key={f.id} value={f.id}>{f.name} - {f.phone}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">Ngày Thu Mua</label>
                    <input
                        required
                        type="date"
                        value={formData.date}
                        onChange={e => setFormData({...formData, date: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">Phân Loại</label>
                    <select
                        value={formData.quality}
                        onChange={e => setFormData({...formData, quality: e.target.value as QualityType})}
                        className="w-full px-3 py-2 bg-white border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none"
                    >
                        {Object.values(QualityType).map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">Khối Lượng (kg)</label>
                    <input
                        required
                        type="number"
                        min="1"
                        value={formData.weight || ''}
                        onChange={e => setFormData({...formData, weight: parseFloat(e.target.value)})}
                        className="w-full px-3 py-2 bg-white border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">Đơn Giá (VND/kg)</label>
                    <input
                        required
                        type="number"
                        min="1000"
                        step="100"
                        value={formData.pricePerKg || ''}
                        onChange={e => setFormData({...formData, pricePerKg: parseFloat(e.target.value)})}
                        className="w-full px-3 py-2 bg-white border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none"
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-green-800 mb-1">Ghi Chú</label>
                    <input
                        type="text"
                        value={formData.note}
                        onChange={e => setFormData({...formData, note: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none"
                    />
                </div>
                <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-3 mt-2">
                    <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="px-6 py-2 text-green-700 bg-white border border-green-200 hover:bg-green-50 rounded-lg font-medium transition-colors"
                    >
                        Hủy Bỏ
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                    >
                        Lưu Giao Dịch
                    </button>
                </div>
            </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                type="text"
                placeholder="Tìm giao dịch theo tên nông dân..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                />
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-700 font-medium">
                    <tr>
                        <th className="px-6 py-4">Ngày</th>
                        <th className="px-6 py-4">Nông Dân</th>
                        <th className="px-6 py-4">Loại</th>
                        <th className="px-6 py-4 text-right">Khối Lượng</th>
                        <th className="px-6 py-4 text-right">Đơn Giá</th>
                        <th className="px-6 py-4 text-right">Thành Tiền</th>
                        <th className="px-6 py-4 text-center">Thao Tác</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredPurchases.map(p => {
                        const farmer = farmers.find(f => f.id === p.farmerId);
                        return (
                            <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 flex items-center">
                                    <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                                    {new Date(p.date).toLocaleDateString('vi-VN')}
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-900">{farmer?.name}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
                                        p.quality === QualityType.TYPE_1 ? 'bg-green-100 text-green-700' :
                                        p.quality === QualityType.TYPE_2 ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-orange-100 text-orange-700'
                                    }`}>
                                        {p.quality}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">{p.weight.toLocaleString()} kg</td>
                                <td className="px-6 py-4 text-right">{p.pricePerKg.toLocaleString()} đ</td>
                                <td className="px-6 py-4 text-right font-bold text-slate-800">{p.totalAmount.toLocaleString()} đ</td>
                                <td className="px-6 py-4 text-center">
                                     <button 
                                        onClick={() => onDeletePurchase(p.id)}
                                        className="text-red-400 hover:text-red-600 p-1"
                                        title="Xóa giao dịch"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                     {filteredPurchases.length === 0 && (
                        <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                                Chưa có dữ liệu thu mua nào.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default PurchaseManagement;
