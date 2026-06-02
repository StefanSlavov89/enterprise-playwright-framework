# 🧪 Playwright TypeScript Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

A scalable, production-oriented end-to-end test automation framework built with Playwright and TypeScript.

The framework implements a strictly layered architecture with a clear separation of concerns between UI interactions, business workflows, test data orchestration, and scenario validations.

---

## 🚀 Tech Stack

* **Playwright** – Core test automation engine and browser orchestration
* **TypeScript** – Strongly typed script execution and safety
* **Node.js** – JavaScript runtime environment
* **Page Object Model (POM)** – Design pattern for UI element abstraction
* **Custom Fixtures** – Dependency Injection and automatic state management
* **Data Factories** – Centralized test data generation layer
* **GitHub Actions** – Continuous Integration engine

---

## 🏗️ Architecture Overview

The framework is decoupled into four highly maintainable layers:

### 1. UI Components & Pages Layer (`components/`, `pages/`)
* **Pages**: Responsible strictly for direct interaction with the DOM. Contains page locators and atomic UI actions (e.g., `click()`, `fill()`). No business rules, flow logic, or assertions are allowed here.
* **Components**: Encapsulates reusable web elements shared across multiple views (e.g., headers, footers, navigation bars).

### 2. Business Actions Layer (`steps/`)
* Encapsulates end-to-end user workflows composed of multi-page interactions.
* Abstracts low-level technical operations into readable business steps (e.g., `AuthenticationSteps`, `CartSteps`).
* Serves as the orchestration bridge between raw page components and functional test files.

### 3. Data Layer (`data/`)
* **Factories**: Dynamically generates robust test data (e.g., `UserFactory`, `CheckoutFactory`) to eliminate hardcoded string values in assertions.
* **Models**: Contains strict TypeScript interfaces defining data structures for full compile-time type-checking support.

### 4. Scenario Layer (`tests/`)
* Defines functional test specifications partitioned by business domain.
* **Rules**: Absolutely no CSS/XPath locators or low-level UI implementation details are permitted in tests. Assertions live exclusively in this layer.

---

## 📁 Folder Structure

```text
├── .github/workflows/   # CI/CD pipelines (GitHub Actions)
├── components/          # Shared and reusable UI components
├── data/
│   ├── factories/       # Data generation engines (UserFactory, CheckoutFactory)
│   └── models/          # Type definitions and interfaces (User, CheckoutData)
├── fixtures/            # Custom Playwright fixtures (Dependency Injection)
├── pages/               # Page Objects (Pure locators and core actions)
├── steps/               # Business Action steps (Orchestration Layer)
├── tests/               # Feature-specific test suites (Scenario Layer)
│   ├── auth/            # Authentication and login edge cases
│   ├── cart/            # Cart management and badge verification
│   └── checkout/        # Happy-path checkouts and context validations
└── utils/               # Common helper functions and custom utilities
```

---

## 🔄 CI/CD Integration
Continuous Integration is handled via GitHub Actions.

The .github/workflows/playwright.yml pipeline triggers automatically on every push and pull_request targetting the main branch.

Pipeline capabilities:

- Deterministic execution inside an isolated ubuntu-latest image

- Automated dependency installation using npm ci

- Smart caching mechanisms for Playwright browser binaries to minimize build execution times

- Automated test orchestration targeting @smoke scenarios

- Post-execution HTML test report compilation uploaded securely into GitHub Artifacts (7 days retention policy)

---

## ⚙️ Requirements

- Node.js >= 18
- npm
- Git

---

## 🚀 Setup

### 1. Clone repository

```
git clone <repo-url>
cd enterprise-playwright-framework
```

### 2. Install dependencies

`npm install`

### 3. Install Playwright browsers

`npx playwright install`

### 4. Verify installation

`npm run test`

---

## 🏃‍♂️ Running tests
The framework utilizes pre-configured shorthand npm commands mapped inside package.json:

### 1. Run all tests

`npm run test`

### 2. Run all smoke tests

`npm run test:smoke`

### 3. Run all regression tests

`npm run test:regression`

### 4. Run all tests in headed mode

`npm run test:headed`

### 5. Run tests with UI mode

`npm run test:ui`

### 6. View local html report

`npm run report`

## 🧪 Test Strategy

### Smoke Tests

- Critical business paths execution.
- Fast execution feedback loop.
- Triggered automatically on every PR and commit.

### Regression Tests

- Full feature coverage.
- Edge cases and negative scenarios.
- Data validation and error handling verification.

## ❗ Design Principles

- No locators in tests: Every element must be encapsulated inside a Page Object or Component.
- No business logic in Pages: Pages only know how the UI works, not why.
- Reusable and composable Steps: Tests define the business intent, steps handle the execution.
- Externalized Test Data: Zero hardcoded strings in test scenarios; everything flows through factories.
- Tag-Based Execution: Test scopes are managed via @smoke and @regression annotations instead of physical directory duplication.

### 🧠 Key Design Goals

This framework is designed to be:

- scalable
- maintainable
- CI/CD ready
- team-friendly

### 🔥 Future Improvements

Planned enhancements:

- API testing layer integration for hybrid E2E scenarios.
- Advanced flaky test handling and automatic retry strategies.
- Visual regression testing execution.
- Matrix-based parallel execution tuning in CI.
