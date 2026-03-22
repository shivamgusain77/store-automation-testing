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
}

module.exports = { storePage };
