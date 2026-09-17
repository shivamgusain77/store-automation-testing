# 🛒 Store Automation Testing Framework

A scalable **UI test automation framework** built using **JavaScript, Playwright Test, and Node.js**, designed to automate end-to-end workflows for a web-based e-commerce application.

The framework follows industry-standard automation practices including **Page Object Model (POM), custom Playwright fixtures, reusable utilities, centralized configuration, external test data, authentication handling, parallel execution, and automated reporting**.

---

## 🚀 Overview

This project demonstrates a maintainable approach to **end-to-end web application automation** using Playwright.

The framework is designed to separate:

* Test scenarios
* Page interactions
* Authentication
* Test data
* Reusable utilities
* Configuration
* Test execution and reporting

This separation improves **maintainability, reusability, readability, and scalability** as the test suite grows.

---

## 🛠️ Tech Stack

| Technology              | Purpose                               |
| ----------------------- | ------------------------------------- |
| **JavaScript**          | Programming language                  |
| **Node.js**             | Runtime environment                   |
| **Playwright Test**     | UI automation & test runner           |
| **Page Object Model**   | Page interaction abstraction          |
| **Playwright Fixtures** | Dependency injection & reusable setup |
| **JSON**                | Test data management                  |
| **GitHub Actions**      | CI/CD automation                      |
| **HTML Reporter**       | Test execution reporting              |

---

# 🏗️ Framework Architecture

```text
                         ┌──────────────────────┐
                         │      Test Cases      │
                         │      tests/          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Playwright Fixtures  │
                         │     fixtures/        │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    Page Objects      │
                         │    pageObject/       │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     Web Application  │
                         └──────────────────────┘

              ┌──────────────────┐
              │   Test Data      │
              │   test-data/     │
              └──────────────────┘

              ┌──────────────────┐
              │ Authentication   │
              │     auth/        │
              └──────────────────┘

              ┌──────────────────┐
              │ Utilities        │
              │    utils/        │
              └──────────────────┘
```

---

# 📂 Project Structure

```text
store-automation-testing/
│
├── auth/
│   └── ...
│
├── fixtures/
│   └── ...
│
├── pageObject/
│   └── ...
│
├── test-data/
│   └── ...
│
├── tests/
│   └── ...
│
├── utils/
│   └── ...
│
├── output/
│   └── ...
│
├── .gitignore
├── config.js
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

The repository is organized around reusable page objects, fixtures, authentication, test data, utilities, and test specifications.

---

# 🧩 Framework Components

## 1. Test Layer

```text
tests/
```

Contains the actual Playwright test scenarios.

The test layer focuses on **business workflows and validations** rather than low-level element interaction.

Example:

```javascript
test("Verify product can be added to cart", async ({ productPage }) => {

    await productPage.addProductToCart("Product Name");

    await expect(productPage.cartCount).toHaveText("1");

});
```

This keeps test cases concise and easy to understand.

---

# 2. Page Object Model

```text
pageObject/
```

The framework follows the **Page Object Model (POM)** design pattern.

Page objects encapsulate:

* Locators
* Page-specific actions
* Navigation
* Reusable UI operations
* Page-level validations

Example:

```javascript
class LoginPage {

    constructor(page) {
        this.page = page;

        this.email = page.getByPlaceholder("Email");
        this.password = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole("button", {
            name: "Login"
        });
    }

    async login(email, password) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}
```

Tests can then focus on the business scenario:

```javascript
await loginPage.login(
    testData.email,
    testData.password
);
```

### Benefits

* Centralized locators
* Reduced code duplication
* Easier maintenance
* Better readability
* Reusable page actions

---

# 3. Playwright Fixtures

```text
fixtures/
```

Custom fixtures are used to initialize and inject reusable page objects into test cases.

Example:

```javascript
test("Login test", async ({ loginPage }) => {

    await loginPage.login(
        email,
        password
    );

});
```

Instead of creating page objects inside every test, fixtures manage their creation and lifecycle.

This provides a cleaner dependency-injection approach.

---

# 4. Authentication

```text
auth/
```

Authentication-related functionality is separated from the test implementation.

The framework can use Playwright's authentication capabilities such as:

* Login setup
* Authentication state
* Storage state
* Reusable authenticated sessions

This helps avoid performing the same login operation repeatedly when tests require an authenticated session.

Example concept:

```text
Login
  ↓
Authenticate User
  ↓
Generate Storage State
  ↓
Reuse Session
  ↓
Execute Tests
```

---

# 5. Test Data

```text
test-data/
```

Test data is maintained separately from test implementation.

This allows scenarios to be data-driven without hardcoding values throughout the test files.

Example:

```json
{
    "validUser": {
        "email": "test@example.com",
        "password": "password123"
    }
}
```

Tests can consume the data:

```javascript
await loginPage.login(
    testData.validUser.email,
    testData.validUser.password
);
```

### Advantages

* Easy data maintenance
* Reduced hardcoding
* Better test reusability
* Supports data-driven testing

---

# 6. Utilities

```text
utils/
```

Reusable helper functionality is maintained inside the utilities layer.

Typical responsibilities include:

* Assertions
* Common UI actions
* Configuration handling
* Test helpers
* Reusable functions

This prevents common functionality from being duplicated across test files.

---

# 🧪 Test Coverage

The framework is designed to cover key end-to-end e-commerce workflows.

### Authentication

* Valid login
* Invalid login
* Login validation
* Logout
* Authentication state handling

### Product

* Product listing
* Product search
* Product selection
* Product details validation
* Product filtering

### Cart

* Add product to cart
* Remove product from cart
* Update cart
* Verify cart item count
* Validate product details in cart

### Checkout

* Checkout workflow
* Customer information validation
* Order summary validation
* Order completion

### Validation

* UI element validation
* URL validation
* Text validation
* Product information validation
* Error message validation

---

# 🔄 Typical E2E Workflow

A typical shopping workflow can be automated as:

```text
Launch Application
       ↓
Login
       ↓
Browse Products
       ↓
Select Product
       ↓
Add Product to Cart
       ↓
Verify Cart
       ↓
Checkout
       ↓
Enter Customer Details
       ↓
Review Order
       ↓
Place Order
       ↓
Validate Order Confirmation
```

---

# ⚙️ Installation

## Prerequisites

Install the following:

* Node.js
* npm
* Git

## Clone Repository

```bash
git clone https://github.com/shivamgusain77/store-automation-testing.git
```

## Navigate to Project

```bash
cd store-automation-testing
```

## Install Dependencies

```bash
npm install
```

## Install Playwright Browsers

```bash
npx playwright install
```

---

# 🔐 Configuration

Application and test configuration is maintained separately from test implementation.

Configuration can include:

* Base URL
* Environment
* Browser settings
* Test execution settings
* Authentication configuration

Example:

```javascript
const config = {
    baseURL: "https://your-application-url.com"
};
```

> Credentials and sensitive information should not be committed to the repository.

---

# ▶️ Running Tests

## Run All Tests

```bash
npx playwright test
```

## Run a Specific Test File

```bash
npx playwright test tests/<test-file>.spec.js
```

## Run in Headed Mode

```bash
npx playwright test --headed
```

## Run in Debug Mode

```bash
npx playwright test --debug
```

## Run a Specific Test

```bash
npx playwright test -g "test name"
```

## Run Using Specific Workers

```bash
npx playwright test --workers=4
```

---

# 🌐 Browser Execution

Playwright allows the framework to execute tests against multiple browser engines.

Typical browser coverage can include:

```text
Chromium
Firefox
WebKit
```

Browser projects can be configured in:

```text
playwright.config.js
```

This allows the same test suite to be executed across different browsers without changing the test implementation.

---

# ⚡ Parallel Execution

Playwright supports parallel test execution using workers.

Example:

```bash
npx playwright test --workers=4
```

Parallel execution helps reduce total regression execution time when tests are independent.

The framework can also be configured for fully parallel execution where appropriate.

---

# 📊 Test Reporting

The framework uses Playwright's reporting capabilities to provide test execution results.

Reports can provide information such as:

* Passed tests
* Failed tests
* Skipped tests
* Execution duration
* Test steps
* Screenshots
* Traces
* Failure details

HTML reports can be opened using:

```bash
npx playwright show-report
```

---

# 🐛 Debugging & Failure Analysis

Playwright provides several features for debugging failed tests.

### Debug Mode

```bash
npx playwright test --debug
```

### Trace Viewer

For configured trace collection:

```bash
npx playwright show-trace <trace-file>
```

### Screenshots

Screenshots can be captured automatically for failed tests through Playwright configuration.

### Video

Video recording can also be configured when required for failure analysis.

---

# 🔄 CI/CD Integration

The repository is structured to support CI/CD execution through automated workflows.

A typical pipeline can follow:

```text
Checkout Repository
        ↓
Install Node.js
        ↓
Install Dependencies
        ↓
Install Playwright
        ↓
Execute Test Suite
        ↓
Generate Test Report
        ↓
Publish Artifacts
```

This enables the automation suite to be executed consistently in a CI environment.

---

# 🧠 Design Principles

## Separation of Concerns

The framework separates:

```text
Tests
  ↓
Fixtures
  ↓
Page Objects
  ↓
Application
```

while keeping:

```text
Test Data
Authentication
Utilities
Configuration
```

independent from the test implementation.

---

## Reusability

Common UI operations are implemented inside page objects and utilities rather than duplicated across test cases.

---

## Maintainability

When a UI locator changes, the corresponding page object can be updated without requiring changes across every test that uses that element.

---

## Scalability

Additional pages and workflows can be added without changing the overall framework architecture.

For example:

```text
pageObject/
├── LoginPage.js
├── HomePage.js
├── ProductPage.js
├── CartPage.js
├── CheckoutPage.js
└── OrderConfirmationPage.js
```

---

# 📈 Future Enhancements

Potential enhancements include:

* [ ] Cross-browser regression pipeline
* [ ] Environment-based test execution
* [ ] Enhanced test-data parameterization
* [ ] API + UI combined workflows
* [ ] Visual regression testing
* [ ] Accessibility testing
* [ ] Database validation
* [ ] Dockerized execution
* [ ] Enhanced CI/CD reporting
* [ ] Allure reporting
* [ ] Test tagging and selective execution
* [ ] Retry and flaky-test analysis

---

# 🎯 Why Playwright?

Playwright provides a modern browser automation platform with capabilities such as:

* Auto-waiting
* Web-first assertions
* Multi-browser support
* Parallel execution
* Network interception
* Authentication state management
* Screenshots and video
* Trace Viewer
* API testing
* Built-in test reporting

These capabilities make it suitable for building scalable end-to-end automation frameworks.

---

# 👨‍💻 Author

**Shivam Gusain**

QA Automation Engineer / SDET

### Areas of Focus

* UI Automation
* API Automation
* Playwright
* JavaScript
* Page Object Model
* Test Framework Development
* CI/CD
* Quality Engineering

---

# 📄 License

This project is intended for learning, demonstration, and test automation framework development purposes.
