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
}

module.exports = { storePage };
