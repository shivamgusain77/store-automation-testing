import { action } from '../../utils/action.js';
import { assertion } from '../../utils/assertion.js';
import * as runconfig from '../../config.js';
import * as productDetailObject from '../objects/productDetailObjects.js';
import * as constant from '../../utils/constants.js';

class productDetailsPage {
  constructor(page, except, context) {
    this.except = except;
    this.page = page;
    this.context = context;

    this.action = new action(this.page, this.except, this.context);
    this.assert = new assertion(this.page, this.except, this.context);
  }

  async verifyProductDetails(productName) {
    const productDetail = await this.action.getInnerText(
      productDetailObject.productInformation,
      productName
    );
    await this.assert.verifyTextEquals(productDetail, productName);
  }

  async getProductPriceFromDetails(productName) {
    const productPrice = await this.action.getInnerText(
      productDetailObject.productPrice,
      productName
    );
    return productPrice;
  }
}

module.exports = { productDetailsPage };
