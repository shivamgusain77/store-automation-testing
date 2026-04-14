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

  async selectOption(selctor, optionName) {
    return await this.page.locator(selctor).selectOption(optionName);
  }

  async uploadFileForNonInput(locator, fileDir) {
    const fileChoosePromise = this.page.waitForEvent('filechooser');
    await this.clickVisibleElement(locator, 'click on file button');
    const fileChooser = await fileChoosePromise;
    await fileChooser.setFiles(fileDir);
  }

  async goBack() {
    return await this.page.goBack();
  }

  async typeSequentially(selector, text) {
    return await this.page.locator(selector).pressSequentially(text);
  }

  async hover(selector, description) {
    console.log(`Hover on ${description}`);
    return await this.page.hover(selector);
  }

  async clickVisibleElement(selector, description) {
    return await this.page.locator(selector).locator('visible=true').click();
  }

  async clickNth(selector, index, description) {
    return await this.page.locator(selector).nth(index).click();
  }

  async clickFirst(selector, description) {
    return await this.page.locator(selector).first().click();
  }

  async clickLast(selector, description) {
    return await this.page.locator(selector).last().click();
  }

  async getElementText(selector) {
    return await this.page.locator(selector).textContent();
  }

  async getElementTextNth(selector, index) {
    return await this.page.locator(selector).nth(index).textContent();
  }

  async getElementList(selector) {
    return await this.page.locator(selector).all(); //return array
  }

  async getElementCount(selector) {
    return await this.page.locator(selector).count(); //return a count(Integer)
  }

  async bringElementIntoView(selector) {
    const element = this.page.locator(selector);
    return await element.scrollIntoViewIfNeeded();
  }

  async keyPress(selector, key) {
    return await this.page.press(selector, key);
  }

  async checkElementVisibility(selctor) {
    return await this.page.locator(selctor).isVisible();
  }

  async getElementAttribute(selector, attribute) {
    const textValue = await this.page.getAttribute(selector, attribute);
    return textValue;
  }

  async getCheckBox(selector) {
    return await this.page.locator(selector).isChecked();
  }

  async dragAndDrop(sourceSelector, targetSelector) {
    const source = this.page.locator(sourceSelector);
    const target = this.page.locator(targetSelector);
    return source.DragTo(target);
  }

  async checkElementIsHIdden(selector) {
    return await this.page.locator(selector).isHidden();
  }

  async waitForUrl(url) {
    const actualUrl = '**' + url;
    return await this.page.waitForURL(actualUrl);
  }
}

module.exports = { action };
