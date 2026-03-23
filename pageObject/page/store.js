import { action } from '../../utils/action.js';
import { assertion } from '../../utils/assertion.js';
import * as runconfig from '../../config.js';
import * as storeObject from '../objects/storeObjects.js';

class storePage {
  constructor(page, except, context) {
    this.except = except;
    this.page = page;
    this.context = context;

    this.action = new action(this.page, this.except, this.context);
    this.assert = new assertion(this.page, this.except, this.context);
  }

  async verifyNavigationMenuVisible() {
    await this.action.waitForPageLoad();

    await this.assert.verifyElementVisible(storeObject.homeButton, 'home button');
    await this.assert.verifyElementVisible(storeObject.contactButton, 'contact button');
    await this.assert.verifyElementVisible(storeObject.aboutUsButton, 'about us button');
    await this.assert.verifyElementVisible(storeObject.cartButton, 'cart button');
    await this.assert.verifyElementVisible(storeObject.logInButton, 'log in button');
    await this.assert.verifyElementVisible(storeObject.signUpButton, 'sign up button');
  }

  async verifyFooterElementsVisible() {
    await this.action.waitForPageLoad();
    await this.assert.verifyElementVisible(storeObject.copyrightText, 'copyright text');
  }

  async clickLoginButton() {
    await this.action.waitForPageLoad();
    await this.action.click(storeObject.logInButton, 'log in button');
  }

  async performLogin(data, operation) {
    await this.action.waitForElement(storeObject.loginLabel, 'login page logo');
    switch (operation) {
      case 'correct':
        await this.action.fill(storeObject.userNameInput, runconfig.username, 'input username');
        await this.action.fill(storeObject.passwordInput, runconfig.password, 'input password');
        break;

      case 'invalid password':
        await this.action.fill(storeObject.userNameInput, runconfig.username, 'input username');
        await this.action.fill(storeObject.passwordInput, data.invalidPassword, 'input password');
        break;

      case 'invalid username':
        await this.action.fill(storeObject.userNameInput, data.invalidUsername, 'input username');
        await this.action.fill(storeObject.passwordInput, runconfig.password, 'input password');
        break;
    }

    await this.action.click(storeObject.loginButton, 'login Button');
  }

  async verifyLogin() {
    await this.action.waitForElement(storeObject.loginAppLogo, 'logged in logo');
    await this.assert.verifyElementVisible(storeObject.loginAppLogo, 'logged in logo');
  }

  async verifyErrorMessageDisplayed() {
    await this.action.waitForTimeout(2000);
    await this.assert.verifyElementVisible(storeObject.loginErrorMessage, 'error message');
  }

  async clickOnBurgericon() {
    await this.action.click(storeObject.burgerButton, 'burger icon');
  }

  async loggOutUser() {
    await this.action.click(storeObject.logoutButton, 'logout button');
  }

  async verifyLoginPageLogo() {
    await this.assert.verifyElementVisible(storeObject.loginLabel, 'login page logo');
  }

  async signUp(data) {
    await this.action.waitForElement(storeObject.signUpLabel, 'sign up label');
    await this.action.fill(storeObject.signUpName, data.signUpName, 'sign up name');
    await this.action.fill(storeObject.signUpEmail, data.signUpEmail, 'sign up email');
    await this.action.click(storeObject.signUpButton, 'signup button');
  }

  async fillAccountInfo(data) {
    await this.action.waitForElement(storeObject.enterAccInfoLabel, ' enter account info label');
    await this.action.click(storeObject.gender, 'gender radio button');
    await this.action.fill(storeObject.passwordSingUp, data.dummyPassword, 'signup pasword');
    await this.fillDateOfBirth();
    await this.action.click(storeObject.newsLetterCheckBox, 'newsletter checkbox');
    await this.action.click(storeObject.optionCheckBox, 'other checkbox');
    await this.action.fill(storeObject.firstName, data.firstName, 'firstName');
    await this.action.fill(storeObject.lastName, data.lastName, 'lastName');
    await this.action.fill(storeObject.company, data.company, 'company');
    await this.action.fill(storeObject.address, data.address, 'address');
    await this.action.selectOption(storeObject.selectCountry, 'India');
    await this.action.fill(storeObject.state, data.state, 'state');
    await this.action.fill(storeObject.city, data.city, 'city');
    await this.action.fill(storeObject.zipCode, data.zipCode, 'zipCode');
    await this.action.fill(storeObject.mobileNumber, data.mobileNumber, 'mobileNumber');
    await this.action.click(storeObject.createAccountButton, 'create account button');
  }

  async fillDateOfBirth() {
    await this.action.selectOption(storeObject.daysSelectOption, '1');
    await this.action.selectOption(storeObject.monthSelectOption, '10');
    await this.action.selectOption(storeObject.yearSelectOption, '2001');
  }

  async verfiyAccountCreated() {
    await this.assert.verifyElementVisible(
      storeObject.accountCreateMessage,
      'account creation message'
    );
    await this.action.click(storeObject.continueButton, 'continue button');
  }

  async verfiyAccountUsername(data) {
    const expectUsername = await this.action.getInnerText(
      storeObject.loggedInUserName,
      'logged in username'
    );
    await this.assert.verifyTextEquals(data.signUpName, expectUsername);
  }

  async deleteAccount() {
    await this.action.click(storeObject.deleteAccount, 'delete account button');
    await this.assert.verifyElementVisible(
      storeObject.accountDeletedMessage,
      ' account deleted message'
    );
  }
}

module.exports = { storePage };
