export interface SalesOverviewProps {
  sales: number;
  revenue: number;
  profit: number;
  cost: number;
}

export interface InventorySummaryProps {
  quantityInHand: number;
  toBeReceived: number;
}

export interface PurchaseOverviewProps {
  purchaseCount: number;
  cost: number;
  cancelCount: number;
  returnAmount: number;
}

export interface ProductSummaryProps {
  supplierCount: number;
  categoryCount: number;
}

export interface SalesAndPurchaseProps {}
