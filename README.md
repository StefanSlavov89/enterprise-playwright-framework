# 🧪 Playwright TypeScript Automation Framework

A scalable end-to-end test automation framework built with Playwright and TypeScript.

The framework follows a layered architecture with clear separation between UI interactions, business flows, test data, and test scenarios.

---

## 🚀 Tech Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model (POM)
- Test Fixtures (Dependency Injection)
- Data Factories (Test Data Layer)

---

## 🏗️ Architecture Overview

The framework is structured into four main layers:

### 1. Pages (UI Layer)

Responsible for direct interaction with the UI.

- Locators
- Basic UI actions (click, fill, navigation)
- No business logic
- No test logic

Examples:

- `LoginPage`
- `InventoryPage`
- `CartPage`
- `CheckoutInfoPage`
- `CheckoutOverviewPage`

---

### 2. Steps (Business Layer)

Encapsulates reusable business workflows composed of multiple page interactions.

Examples:

- login flow
- add product to cart
- checkout flow

Rules:

- Steps represent **what the user does**
- Pages represent **how UI works**
- Tests orchestrate steps

---

### 3. Data Layer (Factories + Models)

Provides structured and reusable test data.

- `UserFactory`
- `CheckoutFactory`
- `User`, `CheckoutData` models

Purpose:

- remove hardcoded values from tests
- enable reusable test scenarios
- support data-driven testing

---

### 4. Tests (Scenario Layer)

Defines test intent and validation.

Rules:

- No locators in tests
- No UI implementation logic
- Uses steps for actions
- Contains assertions

---

## 📁 Folder Structure

pages/

steps/

data/

├── factories/

├── models/

fixtures/

tests/

├── smoke/

├── regression/


---

## ⚙️ Requirements

- Node.js >= 18
- npm
- Git

---

## 🚀 Setup

### 1. Clone repository

git clone <repo-url>
cd enterprise-playwright-framework

### 2. Install dependencies

npm install

### 3. Install Playwright browsers

npx playwright install

### 4. Verify installation

npx playwright test

---

## 🏃‍♂️ Running tests

### 1. Run all test

npx playwright test

### 2. Run tests in a specific folder

npx playwright test tests/regression

### 3. Run smoke tests

npx playwright test --grep @smoke

### 4. Run regression tests

npx playwright test --grep @regression

### 5. Run tests with UI mode

npx playwright test --ui

## 🧪 Test Strategy

### Smoke Tests

- critical paths
- fast execution
- run on every commit

### Regression Tests

- full coverage
- edge cases
- negative scenarios

## ❗ Design Principles

- No locators in tests
- No business logic in Pages
- Steps are reusable and composable
- Tests define intent, not implementation
- Test data is externalized via factories
- Clear separation of concerns across layers

### 🧠 Key Design Goals

This framework is designed to be:

- scalable
- maintainable
- CI/CD ready
- team-friendly
- interview-grade SDET showcase

### 📊 Reporting

Playwright HTML report:
npx playwright show-report

### 🔥 Future Improvements

Planned enhancements:

- API testing layer integration
- advanced flaky test handling strategy
- parallel execution tuning
- visual regression testing
- CI pipeline (GitHub Actions)
- test tagging strategy expansion

### 🧩 Notes

This framework intentionally avoids over-abstraction:

PageFactory is not used at this stage
Steps are intentionally kept atomic (not monolithic flows)
Architecture favors clarity over complexity

### 📌 Author Intent

Built as a learning-to-production transition framework demonstrating:

real-world automation architecture
scalable design patterns
clean separation of concerns
SDET-level thinking
