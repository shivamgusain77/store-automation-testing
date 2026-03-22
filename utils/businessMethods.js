import { test } from '@playwright/test';

class businessMethod {
  constructor(page, expect, context) {
    this.page = page;
    this.expect = expect;
    this.context = context;
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
}

module.exports = { businessMethod };
