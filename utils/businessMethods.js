import { test } from '@playwright/test';
import * as siteLandingPageObject from '../pageObject/objects/siteLandingPageObjects.js';
import { action } from '../utils/action.js';
import { assertion } from '../utils/assertion.js';

class businessMethod {
  constructor(page, expect, context) {
    this.page = page;
    this.expect = expect;
    this.context = context;

    this.action = new action(this.page, this.expect, this.context);
    this.assert = new assertion(this.page, this.expect, this.context);
  }

  async getTestDataForTestcases(data, testCaseName) {
    let index = -1;
    for (let i = 0; i < data.testcasedata.length; i++) {
      if (data.testcasedata[i].testname === testCaseName) {
        index = i;
        break;
      }
    }
    return data.testcasedata[index].data;
  }

  async closeAdPopup() {
    const popupVisibility = await this.checkElementVisibile(siteLandingPageObject.popup);
    console.log(popupVisibility);
    if (popupVisibility) {
      await this.action.click(siteLandingPageObject.popupCloseButton, 'Popup close button');
    }
  }

  async checkElementVisibile(selector) {
    try {
      await this.action.waitForElement(selector);
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = { businessMethod };

//40014026013283
//40014026019821
