import { action } from "../../utils/action.js";
import { assertion } from "../../utils/assertion.js";
import * as runconfig from "../../config.js";
import * as storeObject from "../objects/storeObjects.js";

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

    await this.assert.verifyElementVisible(storeObject.homeButton, "home button");
    await this.assert.verifyElementVisible(storeObject.contactButton, "contact button");
    await this.assert.verifyElementVisible(storeObject.aboutUsButton, "about us button");
    await this.assert.verifyElementVisible(storeObject.cartButton, "cart button");
    await this.assert.verifyElementVisible(storeObject.logInButton, "log in button");
    await this.assert.verifyElementVisible(storeObject.signUpButton, "sign up button");
  }

  async verifyFooterElementsVisible() {
    await this.action.waitForPageLoad();

    await this.assert.verifyElementVisible(storeObject.copyrightText, "copyright text");
  }

  async clickLoginButton() {
    await this.action.waitForPageLoad();
    await this.action.click(storeObject.logInButton, "log in button");
  }

  async performLogin() {
    await this.action.waitForElement(storeObject.loginLabel, "login label");
    await this.action.fill(storeObject.userNameInput, runconfig.username, "input username");
    await this.action.fill(storeObject.passwordInput, runconfig.password, "input password");
    await this.action.click(storeObject.loginButton, "login Button");
  }

  async verifyLogin() {
    await this.action.waitForElement(storeObject.loginUsername, "logged in username");
    let loggenInUsername = await this.action.getInnerText(storeObject.loginUsername, "logged in username");
    loggenInUsername = loggenInUsername.split(" ")[1];
    await this.assert.verifyTextEquals(runconfig.username, loggenInUsername);
  }
}

module.exports = { storePage };
