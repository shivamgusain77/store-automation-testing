import { action } from '../../utils/action.js';
import { assertion } from '../../utils/assertion.js';
import * as runconfig from '../../config.js';
import * as productObject from '../objects/productObjects.js';
import * as constant from '../../utils/constants.js';

class productPage {
  constructor(page, except, context) {
    this.except = except;
    this.page = page;
    this.context = context;

    this.action = new action(this.page, this.except, this.context);
    this.assert = new assertion(this.page, this.except, this.context);
  }

  async searchProduct(data) {
    await this.action.fill(productObject.productInput, data, `search ${data}`);
    await this.action.click(productObject.productSreachBar, 'product sreach bar');
    await this.action.waitForNetworkIdle();
  }

  async verifyProductResults(data) {
    const selector = productObject.productName;
    const noOfItems = await this.action.getElementCount(selector);
    await this.assert.toHaveCountGreaterThan(selector, 0, 'no products found');
    for (let i = 0; i < noOfItems; i++) {
      const indexSelector = `(${selector})[${i + 1}]`;
      const productName = await this.action.getInnerText(indexSelector, 'product name');
      console.log(`Product ${i + 1}: ${productName}`);
      await this.assert.verifyElementContainsText(indexSelector, data);
    }
  }
}

module.exports = { productPage };
