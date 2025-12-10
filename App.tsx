import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AreaManagement from './components/AreaManagement';
import FarmerManagement from './components/FarmerManagement';
import PurchaseManagement from './components/PurchaseManagement';
import AIInsights from './components/AIInsights';
import Settings from './components/Settings';
import { ViewState, AreaCode, Farmer, PurchaseRecord, QualityType } from './types';

// Mock Data Initialization
const INITIAL_AREAS: AreaCode[] = [
  { id: '1', code: 'VN-DL-001', name: 'Vùng Cầu Đất 1', location: 'Xã Xuân Trường, Đà Lạt', acreage: 15.5, status: 'Active' },
  { id: '2', code: 'VN-DL-002', name: 'Vùng Trại Mát A', location: 'Phường 11, Đà Lạt', acreage: 8.2, status: 'Active' },
  { id: '3', code: 'VN-LD-003', name: 'Vùng Lạc Dương Bắc', location: 'Huyện Lạc Dương, Lâm Đồng', acreage: 22.0, status: 'Inactive' },
];

const INITIAL_FARMERS: Farmer[] = [
  { id: 'f1', name: 'Nguyễn Văn An', phone: '0912345678', areaId: '1', address: 'Thôn 1, Xuân Trường' },
  { id: 'f2', name: 'Trần Thị Bích', phone: '0987654321', areaId: '1', address: 'Thôn 3, Xuân Trường' },
  { id: 'f3', name: 'Lê Văn Cường', phone: '0909090909', areaId: '2', address: 'Tổ 5, Trại Mát' },
];

const INITIAL_PURCHASES: PurchaseRecord[] = [
  { id: 'p1', farmerId: 'f1', date: '2023-10-20', weight: 500, pricePerKg: 15000, quality: QualityType.TYPE_1, totalAmount: 7500000, note: 'Hàng đẹp' },
  { id: 'p2', farmerId: 'f2', date: '2023-10-21', weight: 300, pricePerKg: 12000, quality: QualityType.TYPE_2, totalAmount: 3600000 },
  { id: 'p3', farmerId: 'f1', date: '2023-10-22', weight: 450, pricePerKg: 15500, quality: QualityType.TYPE_1, totalAmount: 6975000 },
  { id: 'p4', farmerId: 'f3', date: '2023-10-22', weight: 1200, pricePerKg: 14000, quality: QualityType.TYPE_1, totalAmount: 16800000 },
  { id: 'p5', farmerId: 'f2', date: '2023-10-23', weight: 200, pricePerKg: 8000, quality: QualityType.TYPE_3, totalAmount: 1600000, note: 'Hơi xấu' },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // App State
  const [areas, setAreas] = useState<AreaCode[]>(INITIAL_AREAS);
  const [farmers, setFarmers] = useState<Farmer[]>(INITIAL_FARMERS);
  const [purchases, setPurchases] = useState<PurchaseRecord[]>(INITIAL_PURCHASES);

  // Handlers
  const handleAddArea = (area: AreaCode) => setAreas([...areas, area]);
  const handleUpdateArea = (updatedArea: AreaCode) => setAreas(areas.map(a => a.id === updatedArea.id ? updatedArea : a));
  const handleDeleteArea = (id: string) => setAreas(areas.filter(a => a.id !== id));

  const handleAddFarmer = (farmer: Farmer) => setFarmers([...farmers, farmer]);
  const handleUpdateFarmer = (updatedFarmer: Farmer) => setFarmers(farmers.map(f => f.id === updatedFarmer.id ? updatedFarmer : f));
  const handleDeleteFarmer = (id: string) => setFarmers(farmers.filter(f => f.id !== id));

  const handleAddPurchase = (record: PurchaseRecord) => setPurchases([record, ...purchases]);
  const handleDeletePurchase = (id: string) => setPurchases(purchases.filter(p => p.id !== id));

  // Settings Handlers
  const handleResetData = () => {
    if (window.confirm("Bạn có chắc chắn muốn khôi phục dữ liệu về mặc định? Dữ liệu hiện tại sẽ bị thay thế.")) {
        setAreas(INITIAL_AREAS);
        setFarmers(INITIAL_FARMERS);
        setPurchases(INITIAL_PURCHASES);
        alert("Dữ liệu đã được khôi phục thành công!");
    }
  };

  const handleClearData = () => {
    if (window.confirm("CẢNH BÁO: Bạn sắp xóa toàn bộ dữ liệu khỏi hệ thống. Hành động này không thể hoàn tác.")) {
        setAreas([]);
        setFarmers([]);
        setPurchases([]);
        alert("Đã xóa toàn bộ dữ liệu!");
    }
  };

  // View Selection
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard areas={areas} farmers={farmers} purchases={purchases} />;
      case 'areas':
        return <AreaManagement areas={areas} onAddArea={handleAddArea} onUpdateArea={handleUpdateArea} onDeleteArea={handleDeleteArea} />;
      case 'farmers':
        return <FarmerManagement farmers={farmers} areas={areas} onAddFarmer={handleAddFarmer} onUpdateFarmer={handleUpdateFarmer} onDeleteFarmer={handleDeleteFarmer} />;
      case 'purchases':
        return <PurchaseManagement purchases={purchases} farmers={farmers} onAddPurchase={handleAddPurchase} onDeletePurchase={handleDeletePurchase} />;
      case 'ai-insights':
        return <AIInsights areas={areas} farmers={farmers} purchases={purchases} />;
      case 'settings':
        return (
            <Settings 
                onResetData={handleResetData} 
                onClearData={handleClearData}
                stats={{
                    areasCount: areas.length,
                    farmersCount: farmers.length,
                    purchasesCount: purchases.length
                }}
            />
        );
      default:
        return <Dashboard areas={areas} farmers={farmers} purchases={purchases} />;
    }
  };

  const getViewTitle = () => {
    switch (currentView) {
        case 'dashboard': return 'Tổng Quan Hệ Thống';
        case 'areas': return 'Mã Vùng Trồng';
        case 'farmers': return 'Hộ Nông Dân';
        case 'purchases': return 'Quản Lý Thu Mua';
        case 'ai-insights': return 'Phân Tích Dữ Liệu AI';
        case 'settings': return 'Cấu Hình Hệ Thống';
        default: return 'Hoa Cương';
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar 
        currentView={currentView} 
        onChangeView={(view) => { setCurrentView(view); setIsSidebarOpen(false); }} 
        isOpen={isSidebarOpen}
      />
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          title={getViewTitle()} 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;