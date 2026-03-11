import test from "@playwrigt/test";

class action {
  constructor(page, expect, context) {
    this.page = page;
    this.expect = expect;
    this.context = context;
  }
}

module.exports = { action };
