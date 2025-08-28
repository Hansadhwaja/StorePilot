export interface DealerProps {
  _id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  totalPurchased: number;
  totalPaid: number;
  due: number;
  status: string;
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
  category?: string;
}

export interface ProductData {
  _id: string;
  name: string;
  sellingPrice: number;
  costPrice: number;
  category: string;
}

export interface GroupedProduct {
  category: string;
  products: ProductData[]
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
  fairAmount: number;
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

export type SaleFormProps = {
  initialData?: {
    productId: string;
    quantity: number;
    sellingPrice: number;
    costPrice?: number;
    saleDate: string;
  };
  onSubmit: (data: {
    productId: string;
    quantity: number;
    sellingPrice: number;
    costPrice?: number;
    saleDate: string;
  }) => Promise<void>;
  submitLabel?: string;
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

export interface Payment {
  _id: string;
  amount: number;
  paidAt: string | Date;
  note?: string;
  dealerId: string;
}

//purchase module
export type ItemsProps = {
  productName: string;
  category?: string;
  unit?: string;
  sellingPrice?: number;
  costPrice: number;
  qty: number;
  subtotal: number;
};

//Home Dashboard 
export interface SalesSummary {
  month: string;
  sales: number;
  totalRevenue: number;
  totalProfit: number;
  totalItems: number;
  saleCount: number;
}

export type SummaryType = {
  revenue: { value: number; change: number };
  profit: { value: number; change: number };
  purchases: { value: number; change: number };
  paid: { value: number; change: number };
  due: { value: number; change: number };
};

export interface DailySale {
  date: string;
  totalRevenue: number;
  totalProfit: number;
  totalItems?: number;
  saleCount?: number;
};

export type DealerPurchaseSummary = {
  date: string;
  totalPurchases: number;
  totalPaid: number;
};
