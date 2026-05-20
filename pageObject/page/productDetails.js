import { request } from '@playwright/test';
import { action } from '../../utils/action.js';
import { assertion } from '../../utils/assertion.js';
import * as runconfig from '../../config.js';
import * as productDetailObject from '../objects/productDetailObjects.js';
import * as constant from '../../utils/constants.js';
import { productName } from '../objects/productObjects.js';

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
    await this.assert.verifyElementVisible(productDetailObject.productPrice, productName);
    const productPrice = await this.action.getInnerText(
      productDetailObject.productPrice,
      productName
    );
    return productPrice;
  }

  async verifyProductDescriptions(productName) {
    await this.assert.verifyElementVisible(
      `(${productDetailObject.productDescriptions})[1]`,
      productName
    );
    const productDescriptionFields = await this.action.getAllInnerText(
      productDetailObject.productDescriptions,
      productName
    );
    let index = 0;
    for (const productDescriptionField of productDescriptionFields) {
      await this.assert.verifyTextConatins(
        productDescriptionField,
        constant.descriptionFields[index++]
      );
    }
  }

  async verifyImageLoad() {
    await this.assert.verifyElementVisible(productDetailObject.productImage);
    let imageURL = await this.action.getElementAttribute(productDetailObject.productImage, 'src');
    imageURL = runconfig.sitePrefixURL.concat(imageURL);
    const response = await this.page.request.get(imageURL);
    await this.assert.verifyTextEquals(response.status(), 200);
  }

  async submitProductReview(name, email, review) {
    await this.action.fill(productDetailObject.nameInput, name, 'name');
    await this.action.fill(productDetailObject.emailInput, email, 'email');
    await this.action.fill(productDetailObject.productReview, review, 'review');
    await this.action.click(productDetailObject.submitButton, 'review submit button');
  }

  async verifyReviewSubmitted() {
    await this.assert.verifyElementVisible(
      productDetailObject.reviewSubmitted,
      'Review submit sucess message'
    );
  }
}

module.exports = { productDetailsPage };
