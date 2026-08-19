import { action } from '../../utils/action.js';
import { assertion } from '../../utils/assertion.js';
import { businessMethod } from '../../utils/businessMethods.js';
import * as runconfig from '../../config.js';
import * as cartObject from '../objects/cartObjects.js';
import * as constant from '../../utils/constants.js';

class paymentPage {
  constructor(page, expect, context) {
    this.expect = expect;
    this.page = page;
    this.context = context;

    this.action = new action(this.page, this.expect, this.context);
    this.assert = new assertion(this.page, this.expect, this.context);
    this.businessMethod = new businessMethod(this.page, this.except, this.context);

    this.paymentBreadcrumb = "//section[@id='cart_items']//ol/li[text()='Payment']";
    this.nameOnCardLabel = "//label[@class='control-label' and text()='Name on Card']";
    this.cardNumberLabel = "//label[@class='control-label' and text()='Card Number']";
    this.CVVLabel = "//label[@class='control-label' and text()='CVC']";
    this.expirationDateLabel = "//label[@class='control-label' and text()='Expiration']";
    this.nameOnCardInput =
      "//label[@class='control-label' and text()='Name on Card']/following-sibling::input";
    this.CVVInput = "//label[@class='control-label' and text()='CVC']/following-sibling::input";
    this.cardNumberInput =
      "//label[@class='control-label' and text()='Card Number']/following-sibling::input";
    this.expirationDateInput =
      "//label[@class='control-label' and text()='Expiration']/following-sibling::input";
    this.expirationYearInput = "//input[@data-qa='expiry-year']";
    this.payAndConfirmButon = "//button[@id='submit']";
    this.orderPlacedMessage = "//h2[@data-qa='order-placed']/b";
    this.downloadInvoiceButton = "//a[text()='Download Invoice']";
    this.continueButton = "//a[text()='Continue']";
  }

  async verifyPaymentPage() {
    await this.assert.verifyURL(/\/payment$/, 'payment page');
    await this.assert.verifyElementVisible(this.paymentBreadcrumb, 'payemnt breadcrumb');
    await this.verifyFormFields();
  }

  async verifyFormFields() {
    await this.assert.verifyElementVisible(this.nameOnCardLabel, 'name on card field');
    await this.assert.verifyElementVisible(this.cardNumberLabel, 'card number field');
    await this.assert.verifyElementVisible(this.CVVLabel, 'CVV label');
    await this.assert.verifyElementVisible(this.expirationDateLabel, 'expiration date label');
    await this.assert.verifyElementVisible(this.nameOnCardInput, 'name on card input field');
    await this.assert.verifyElementVisible(this.CVVInput, 'CVV input field');
    await this.assert.verifyElementVisible(this.cardNumberInput, 'card number input field');
    await this.assert.verifyElementVisible(this.expirationDateInput, 'expiration date input field');
  }

  async clickOnPayAndConfirmOrder() {
    await this.action.click(this.payAndConfirmButon, 'pay and confirm order button');
  }

  async verifyEmptyFormErrorMessage() {
    await this.assert.verifyBorwserErrorMessage(
      this.nameOnCardInput,
      'Please fill out this field.'
    );
  }

  async fillPaymentDetails(data) {
    await this.action.fill(this.nameOnCardInput, data.nameOnCard, 'name on card');
    await this.action.fill(this.CVVInput, data.CVV, 'CVV');
    await this.action.fill(this.cardNumberInput, data.cardNumber, 'card number');
    await this.action.fill(this.expirationDateInput, data.expirationDate, 'expiration date');
    await this.action.fill(this.expirationYearInput, data.expirationYear, 'expiration year');
  }

  async verifyOrderPlacedMessage() {
    await this.assert.verifyElementVisible(this.orderPlacedMessage, 'order placed message');
  }

  async clickOnContinue() {
    await this.action.click(this.continueButton, 'continue button');
  }

  async clickOnDownloadInvoice() {
    await this.action.click(this.downloadInvoiceButton, 'download invoice button');
  }

  async verifyOrderPlacedMessage(price) {
    const fileText = await this.action.fileDownloadText(this.downloadInvoiceButton);
    await this.assert.verifyTextConatins(
      fileText,
      `Your total purchase amount is ${price}. Thank you`
    );
  }
}

module.exports = { paymentPage };
