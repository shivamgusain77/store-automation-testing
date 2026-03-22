import { test } from '@playwright/test';

class assertion {
  constructor(page, expect, context) {
    this.page = page;
    this.expect = expect;
    this.context = context;
  }

  async verifyPageTitle(expectedTitle) {
    await this.expect(this.page, 'verify page title to be ' + expectedTitle).toHaveTitle(
      expectedTitle
    );
  }

  async verifyPageTitleContains(expectedTitle) {
    await this.expect(this.page, 'verify page title contains ' + expectedTitle).toHaveTitle(
      new RegExp(expectedTitle)
    );
  }

  async verifyElementVisible(selector, elementName) {
    const element = this.page.locator(selector);
    try {
      await element.scrollIntoViewIfNeeded();
      await this.expect(element, elementName + ' should be visible').toBeVisible();
    } catch (error) {
      throw new Error('Element : ' + elementName + ' is not visible. ' + error.message);
    }
  }

  async verifyTextEquals(actual, expected) {
    let result = false;
    try {
      await this.expect(expected, 'Actual Value :: ' + actual + 'Expcetd Value ::' + expected).toBe(
        actual
      );
      result = true;
    } catch (error) {
      throw new Error('Test Failed: actual( ' + actual + ' ) & expected ( ' + expected + ' ) text');
    }
    return result;
  }
}

module.exports = { assertion };
