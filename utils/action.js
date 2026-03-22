import { test } from '@playwright/test';

class action {
  constructor(page, expect, context) {
    this.page = page;
    this.expect = expect;
    this.context = context;
  }

  async navigateToURL(url) {
    return await this.page.goto(url);
  }

  async refreshPage() {
    return await this.page.reload();
  }

  async getTitle() {
    return await this.page.title();
  }

  async pausePage() {
    return await this.page.pause();
  }

  async getURL() {
    return await this.page.url();
  }

  async waitForTimeout(duration) {
    return await this.page.waitForTimeout(duration);
  }

  async typeSequentially(selector, text) {
    return await this.page.locator(selector).pressSequentially(text);
  }

  async waitForPageLoad() {
    return await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForNetworkIdle() {
    return await this.page.waitForLoadState('networkidle');
  }

  async click(selector, elementName) {
    return await this.page.locator(selector).click('Click on ' + elementName);
  }

  async waitForElement(selector, elementName) {
    return await this.page.waitForSelector(selector, 'Wait for ' + elementName);
  }

  async fill(selector, text, elementName) {
    return await this.page
      .locator(selector)
      .locator('visible=true')
      .fill(text, 'Fill ' + elementName);
  }

  async getInnerText(selector, elementName) {
    return await this.page.locator(selector).innerText('Inner Text of ' + elementName);
  }
}

module.exports = { action };
