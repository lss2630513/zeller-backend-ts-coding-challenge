import { Products, PricingRule } from 'types';

export const pricingRules: PricingRule[] = [
  {
    description: 'AppleTV: 3 for 2 deal: buy 3 pay the price of 2',
    target: Products.ATV,
    getNewPrice: function (priceTable, itemsCount) {
      const quantity = itemsCount[this.target];

      if (quantity) {
        const newPrice =
          (priceTable[this.target] *
            (Math.floor(quantity / 3) * 2 + (quantity % 3))) /
          quantity;

        return newPrice;
      }

      return priceTable[this.target];
    },
  },

  {
    description:
      'iPad: bulk buy discount: when buys more than 4, price drop to $499.99 each',
    target: Products.IPad,
    getNewPrice: function (priceTable, itemsCount) {
      const quantity = itemsCount[this.target];

      if (quantity && quantity >= 4) {
        return 49999;
      }

      return priceTable[this.target];
    },
  },
];
