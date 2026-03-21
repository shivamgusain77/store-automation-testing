import { storePage } from "../pageObject/page/store.js";

import { action } from "./action.js";

import { assertion } from "./assertion.js";

import { businessMethod } from "./businessMethods.js";

class baseClass {
  constructor(page, expect, context) {
    this.page = page;
    this.expect = expect;
    this.context = context;

    this.action = new action(this.page, this.expect, this.context);
    this.assertion = new assertion(this.page, this.expect, this.context);
    this.storePage = new storePage(this.page, this.expect, this.context);
    this.businessMethod = new businessMethod(this.page, this.expect, this.context);
  }

  getAction() {
    return this.action;
  }

  getAsset() {
    return this.assertion;
  }

  getStorePage() {
    return this.storePage;
  }

  getBusinessMethod() {
    return this.businessMethod;
  }
}

module.exports = { baseClass };
