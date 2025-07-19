export interface DealerProps {
  _id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  openingBalance: number;
  createdAt?: string;
};

export interface DealerFormData {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  openingBalance: number;
}

export interface DealerPurchaseProps {
  _id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface Product {
  _id: string;
  name: string;
}

export interface PopulatedItem {
  _id: string;
  productId: {
    _id: string;
    name: string;
  };
  quantity: number;
  rate: number;
}

export interface PopulatedPurchase {
  _id: string;
  dealerId: {
    _id: string;
    name: string;
  };
  items: PopulatedItem[];
  totalAmount: number;
  paidAmount: number;
  purchaseDate: Date;
}

export type Sale = {
  _id: string;
  productId: string;
  quantity: number;
  sellingPrice: number;
  costPrice?: number;
  profit?: number;
  saleDate: string;
};

export interface DaySale {
  productName: string;
  quantity: number;
  sellingPrice: number;
  costPrice?: number;
  profit?: number;
}

export interface SalesProps {
  date: string;
  sales: (Sale & { productName: string })[];
  totalItems: number;
  totalRevenue: number;
  totalProfit: number;
  initiallyOpen?: boolean;
}