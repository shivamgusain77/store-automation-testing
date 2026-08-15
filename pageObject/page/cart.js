import { action } from '../../utils/action.js';
import { assertion } from '../../utils/assertion.js';
import { businessMethod } from '../../utils/businessMethods.js';
import * as runconfig from '../../config.js';
import * as cartObject from '../objects/cartObjects.js';
import * as constant from '../../utils/constants.js';

class cartPage {
  constructor(page, expect, context) {
    this.expect = expect;
    this.page = page;
    this.context = context;

    this.action = new action(this.page, this.expect, this.context);
    this.assert = new assertion(this.page, this.expect, this.context);
    this.businessMethod = new businessMethod(this.page, this.except, this.context);

    this.cartPageBreadcrumb = "//section[@id='cart_items']//ol/li[text()='Shopping Cart']";
    this.emptyCartMessage = "//span[@id='empty_cart']//b[text()='Cart is empty!']";
    this.checkoutButton = "//a[contains(@class,'check_out') and text()='Proceed To Checkout']";
    this.loginModal = "//div[@id='checkoutModal']";
    this.loginModelMessage =
      "//div[@class='modal-body']/p[text()='Register / Login account to proceed on checkout.']";
  }

  async verifyItemInCart(productName, productPrice) {
    await this.assert.verifyElementVisible(cartObject.table);
    const itemCount = await this.action.getElementCount(cartObject.productName);
    let productFound = false;
    for (let i = 0; i < itemCount; i++) {
      const itemName = await this.action.getElementTextNth(cartObject.productName, i);
      if (itemName === productName) {
        productFound = true;
        await this.assert.verifyTextEquals(productName, itemName);
        const itemPrice = await this.action.getElementTextNth(cartObject.productPrice, i);
        await this.assert.verifyTextEquals(productPrice, itemPrice);
        const itemQuantity = await this.action.getElementTextNth(cartObject.productQuantity, i);
        await this.assert.verifyTextEquals('1', itemQuantity);
        break;
      }
    }
    await this.assert.checkToBeTruthy(productFound);
  }

  async deleteItemsFromCart() {
    let itemCount = await this.action.getElementCount(cartObject.productName);
    let index = 0;
    while (itemCount > 0) {
      await this.action.clickNth(cartObject.deleteItem, index++, `Delete Item`);
      await this.action.waitForNetworkIdle();
      itemCount = await this.action.getElementCount(cartObject.productName);
    }
  }

  async getProductsQuantity() {
    const itemCount = await this.action.getElementCount(cartObject.productName);
    let actualItemQuantity = 0;
    for (let i = 0; i < itemCount; i++) {
      let itemQuantity = await this.action.getElementTextNth(cartObject.productQuantity, i);
      itemQuantity = Number(itemQuantity);
      actualItemQuantity += itemQuantity;
    }
    return actualItemQuantity;
  }

  async verifyProductsQuantity(expectedItemQuantity, actualItemQuantity) {
    await this.assert.verifyTextEquals(expectedItemQuantity, actualItemQuantity);
  }

  async removeCartItem(productName) {
    await this.action.click(
      cartObject.productDeleteButton.replace('?????', productName),
      `${productName} delete button`
    );
  }

  async verifyCartPageLoaded() {
    await this.assert.verifyURL(/\/view_cart$/, 'cart page');
    await this.assert.verifyElementVisible(this.cartPageBreadcrumb, 'cart page breadcrumb');
  }

  async verifyCartEmpty() {
    await this.assert.verifyElementVisible(this.emptyCartMessage, 'cart empty message');
  }

  async verifyCartNotEmpty() {
    await this.assert.verifyElementNotVisible(this.emptyCartMessage, 'cart empty message');
  }

  async clickOnCheckout() {
    await this.action.click(this.checkoutButton, 'checkout page button');
  }

  async verifyCheckoutButton() {
    await this.assert.verifyElementVisible(this.checkoutButton, 'checkout botton');
    await this.assert.verifyElementEnabled(this.checkoutButton, 'checkout buton');
  }

  async verifyLoginMessage() {
    await this.action.waitForElement(this.loginModal, 'login modal');
    await this.assert.verifyElementVisible(this.loginModelMessage, 'login modal message');
  }
}

module.exports = { cartPage };
