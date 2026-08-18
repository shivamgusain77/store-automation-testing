import { storePage } from '../pageObject/page/store.js';

import { action } from './action.js';

import { assertion } from './assertion.js';

import { businessMethod } from './businessMethods.js';

import { productPage } from '../pageObject/page/products.js';

import { productDetailsPage } from '../pageObject/page/productDetails.js';

import { cartPage } from '../pageObject/page/cart.js';

import { checkoutPage } from '../pageObject/page/checkout.js';

import { paymentPage } from '../pageObject/page/payment.js';

class baseClass {
  constructor(page, expect, context) {
    this.page = page;
    this.expect = expect;
    this.context = context;

    this.action = new action(this.page, this.expect, this.context);
    this.assertion = new assertion(this.page, this.expect, this.context);
    this.storePage = new storePage(this.page, this.expect, this.context);
    this.businessMethod = new businessMethod(this.page, this.expect, this.context);
    this.productPage = new productPage(this.page, this.expect, this.context);
    this.productDetailsPage = new productDetailsPage(this.page, this.expect, this.context);
    this.cartPage = new cartPage(this.page, this.expect, this.context);
    this.checkoutPage = new checkoutPage(this.page, this.expect, this.context);
    this.paymentPage = new paymentPage(this.page, this.expect, this.context);
  }

  getAction() {
    return this.action;
  }

  getAssert() {
    return this.assertion;
  }

  getStorePage() {
    return this.storePage;
  }

  getBusinessMethod() {
    return this.businessMethod;
  }

  getProductPage() {
    return this.productPage;
  }

  getProductDetailPage() {
    return this.productDetailsPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getCheckoutPage() {
    return this.checkoutPage;
  }

  getPaymentPage() {
    return this.paymentPage;
  }
}

module.exports = { baseClass };
