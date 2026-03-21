import { test } from "@playwright/test";

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
    await this.page.waitForLoadState("domcontentloaded");
  }

  async waitForNetworkIdle() {
    await this.page.waitForLoadState("networkidle");
  }
}

module.exports = { action };
