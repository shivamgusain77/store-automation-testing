import test from "@playwrigt/test";

class businessMethod {
  constructor(page, expect, context) {
    this.page = page;
    this.expect = expect;
    this.context = context;
  }

  async getTestDataForTestcases(data, testCaseName) {
    let index = 0;
    for (let i = 0; i < data.lenght; i++) {
      if (data.testcasedata[i].testname === testCaseName) {
        index = i;
        break;
      }
    }
    return data.testcasedata[index];
  }
}

module.exports = { businessMethod };
