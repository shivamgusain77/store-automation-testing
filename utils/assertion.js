import { test } from "@playwright/test";

class assertion {
  constructor(page, expect, context) {
    this.page = page;
    this.expect = expect;
    this.context = context;
  }

  async verifyPageTitle(expectedTitle) {
    await this.expect(this.page, "verify page title to be " + expectedTitle).toHaveTitle(expectedTitle);
  }

  async verifyPageTitleContains(expectedTitle) {
    await this.expect(this.page, "verify page title contains " + expectedTitle).toHaveTitle(new RegExp(expectedTitle));
  }
}

module.exports = { assertion };
