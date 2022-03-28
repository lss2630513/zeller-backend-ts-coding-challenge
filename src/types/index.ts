export type ProductKeys = 'ipd' | 'mbp' | 'atv' | 'vga';

export interface Product {
  sku: string;
  name: string;
  price: number;
}

export enum Products {
  IPad = 'ipd',
  MBP = 'mbp',
  ATV = 'atv',
  VGA = 'vga',
}

export type ItemsCount = {
  [key in ProductKeys]: number;
};

export type PriceTable = {
  [key in ProductKeys]: number;
};

export interface PricingRule {
  description?: string;
  target: ProductKeys;
  getNewPrice: (
    priceTable: PriceTable,
    itemsCount: Partial<ItemsCount>
  ) => number;
}
