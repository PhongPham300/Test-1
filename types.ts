
export enum QualityType {
  TYPE_1 = 'Loại 1',
  TYPE_2 = 'Loại 2',
  TYPE_3 = 'Loại 3',
}

export interface AreaCode {
  id: string;
  code: string; // Mã vùng trồng (e.g., VN-DL-001)
  name: string;
  location: string;
  acreage: number; // Diện tích (ha)
  status: 'Active' | 'Inactive';
}

export interface Farmer {
  id: string;
  name: string;
  phone: string;
  areaId: string; // Linked to AreaCode
  address: string;
}

export interface PurchaseRecord {
  id: string;
  farmerId: string;
  date: string;
  weight: number; // kg
  pricePerKg: number; // VND
  quality: QualityType;
  totalAmount: number;
  note?: string;
}

export type ViewState = 'dashboard' | 'areas' | 'farmers' | 'purchases' | 'ai-insights' | 'settings';
