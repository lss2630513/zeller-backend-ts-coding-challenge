import { Checkout } from 'modules';
import { pricingRules } from 'repositories';
import { PriceTable, Products } from 'types';
import d from 'dedent';

describe('Checkout module without pricing rules', () => {
  let checkout: Checkout;
  beforeEach(() => {
    checkout = new Checkout();
  });

  test(
    d`
    When instantiate checkout module 
    Then price table should be created
    `,
    () => {
      const mockPriceTable = { ipd: 54999, mbp: 139999, atv: 10950, vga: 3000 };

      expect(checkout['priceTable']).toStrictEqual(mockPriceTable);
    }
  );

  test(
    d`
    Given instantiated checkout module 
    When scan items 
    Then itemCounts should be updated
    `,

    () => {
      const mockItemTable = { ipd: 1, mbp: 1 };

      checkout.scan(Products.IPad);
      checkout.scan(Products.MBP);

      expect(checkout['itemsCount']).toStrictEqual(mockItemTable);
    }
  );

  test(
    d`
    Given instantiated checkout module 
    When call total 
    Then total should be 0
    `,
    () => {
      expect(checkout.total()).toBe(0);
    }
  );

  test(
    d`
    Given instantiated checkout module 
    And scan items 
    When call total 
    Then total should be calculated
    `,
    () => {
      checkout.scan(Products.IPad);
      checkout.scan(Products.ATV);

      expect(checkout.total()).toBe(54999 + 10950);
    }
  );
});

describe('Checkout module with pricing rules', () => {
  let checkout: Checkout;
  let priceTable: PriceTable;

  beforeEach(() => {
    checkout = new Checkout(pricingRules);
    priceTable = checkout['priceTable'];
  });

  test(
    d`
    AppleTV 3 for 2 deal: 
    Given scan 3 AppleTVs
    When call total 
    Then the total will be the amount of 2 AppleTV
    `,
    () => {
      checkout.scan(Products.ATV);
      checkout.scan(Products.ATV);
      checkout.scan(Products.ATV);

      expect(checkout.total()).toBe(priceTable[Products.ATV] * 2);
    }
  );

  test(
    d`
    iPad bulk buy discount: 
    Given scan more than 4 iPads
    When call total 
    Then the price will drop to $499.99 each
    `,
    () => {
      checkout.scan(Products.IPad);
      checkout.scan(Products.IPad);
      checkout.scan(Products.IPad);

      expect(checkout.total()).toBe(priceTable[Products.IPad] * 3);

      checkout.scan(Products.IPad);
      expect(checkout.total()).toBe(49999 * 4);

      checkout.scan(Products.IPad);
      expect(checkout.total()).toBe(49999 * 5);
    }
  );
});
