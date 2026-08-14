import { action } from '../../utils/action.js';
import { assertion } from '../../utils/assertion.js';
import { businessMethod } from '../../utils/businessMethods.js';
import * as runconfig from '../../config.js';
import * as cartObject from '../objects/cartObjects.js';
import * as constant from '../../utils/constants.js';

class checkoutPage {
  constructor(page, expect, context) {
    this.expect = expect;
    this.page = page;
    this.context = context;

    this.action = new action(this.page, this.expect, this.context);
    this.assert = new assertion(this.page, this.expect, this.context);
    this.businessMethod = new businessMethod(this.page, this.except, this.context);

    this.totalCartPrice = "//b[text()='Total Amount']/ancestor::td/following-sibling::td/p";
    this.placeOrderButton = "//a[text()='Place Order']";
  }

  async getTotalCartPrice() {
    let totalPrice = await this.action.getElementText(this.totalCartPrice);
    totalPrice = this.businessMethod.cleanPriceText(totalPrice);
    return totalPrice;
  }

  async verifyTotalPrice(expectedPrice, actualPrice) {
    let totalPriceCalculated = 0;
    Array.isArray(expectedPrice)
      ? (totalPriceCalculated = expectedPrice.reduce((total, num) => total + Number(num), 0))
      : (totalPriceCalculated = expectedPrice);

    await this.assert.verifyTextEquals(totalPriceCalculated, Number(actualPrice));
  }
}

module.exports = { checkoutPage };
