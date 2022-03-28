import { products } from 'repositories';
import { PricingRule, ItemsCount, PriceTable, Product } from 'types';

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export class Checkout {
  private pricingRules?: PricingRule[];
  private itemsCount: Partial<ItemsCount> = {};
  private priceTable: PriceTable;

  constructor(pricingRules?: PricingRule[]) {
    this.pricingRules = pricingRules;
    this.priceTable = this.initializePriceTable(products);
  }

  scan(item: keyof ItemsCount) {
    let itemCount = this.itemsCount[item];

    if (!itemCount) {
      itemCount = 1;
    } else {
      itemCount += 1;
    }

    Object.assign(this.itemsCount, { [item]: itemCount });
  }

  total(): number {
    const rulesAppliedPriceTable = { ...this.priceTable };
    if (this.pricingRules) {
      this.pricingRules.forEach((pricingRule) => {
        const newPrice = pricingRule.getNewPrice(
          this.priceTable,
          this.itemsCount
        );

        Object.assign(rulesAppliedPriceTable, {
          [pricingRule.target]: newPrice,
        });
      });
    }

    const total = (
      Object.entries(this.itemsCount) as Entries<ItemsCount>
    ).reduce((previousTotal, currentItem) => {
      return (
        previousTotal + rulesAppliedPriceTable[currentItem[0]] * currentItem[1]!
      );
    }, 0);

    console.log(
      `Total: \$${Number.parseFloat((total / 100).toString()).toFixed(2)}`
    );
    return total;
  }

  private initializePriceTable(products: Product[]): PriceTable {
    const priceTable = {};

    products.forEach((product: Product) =>
      Object.assign(priceTable, { [product.sku]: product.price })
    );

    return priceTable as PriceTable;
  }
}
