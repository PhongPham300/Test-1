import React from 'react';
import { AreaCode, Farmer, PurchaseRecord } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { DollarSign, Scale, Tractor, MapPin } from 'lucide-react';

interface DashboardProps {
  areas: AreaCode[];
  farmers: Farmer[];
  purchases: PurchaseRecord[];
}

const StatCard: React.FC<{ title: string; value: string; icon: React.ElementType; color: string }> = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ areas, farmers, purchases }) => {
  const totalVolume = purchases.reduce((acc, p) => acc + p.weight, 0);
  const totalRevenue = purchases.reduce((acc, p) => acc + p.totalAmount, 0);

  // Prepare data for charts
  const volumeByDate = purchases.reduce((acc: any, curr) => {
    const date = new Date(curr.date).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' });
    if (!acc[date]) acc[date] = { date, weight: 0, amount: 0 };
    acc[date].weight += curr.weight;
    acc[date].amount += curr.totalAmount;
    return acc;
  }, {});
  const chartData = Object.values(volumeByDate).slice(-7); // Last 7 days/entries

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Tổng Sản Lượng" 
          value={`${(totalVolume / 1000).toFixed(2)} Tấn`} 
          icon={Scale} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Doanh Số" 
          value={`${(totalRevenue / 1000000).toFixed(1)} Tr`} 
          icon={DollarSign} 
          color="bg-green-500" 
        />
        <StatCard 
          title="Nông Dân Hợp Tác" 
          value={farmers.length.toString()} 
          icon={Tractor} 
          color="bg-amber-500" 
        />
        <StatCard 
          title="Vùng Trồng" 
          value={areas.filter(a => a.status === 'Active').length.toString()} 
          icon={MapPin} 
          color="bg-indigo-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Sản Lượng Thu Mua Gần Đây</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value: number) => [`${value.toLocaleString()} kg`, 'Sản lượng']}
                />
                <Bar dataKey="weight" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Biến Động Giá Thu Mua</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={purchases.slice(-10)}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickFormatter={(str) => new Date(str).toLocaleDateString('vi-VN', {day: '2-digit', month: '2-digit'})} />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                   formatter={(value: number) => [`${value.toLocaleString()} đ`, 'Giá/Kg']}
                />
                <Line type="monotone" dataKey="pricePerKg" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
