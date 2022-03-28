import { Checkout } from 'modules/checkout';
import { pricingRules } from 'repositories';

const co = new Checkout(pricingRules);
co.scan('atv');
co.scan('atv');
co.scan('atv');
co.scan('vga');
co.total();

const co2 = new Checkout(pricingRules);
co2.scan('atv');
co2.scan('ipd');
co2.scan('ipd');
co2.scan('atv');
co2.scan('ipd');
co2.scan('ipd');
co2.scan('ipd');

co2.total();
