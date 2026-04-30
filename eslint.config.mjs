import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
  // Lints all TypeScript files in the project
  ...tseslint.configs.recommended,

  // Specific Playwright rules for anything in the /tests folder
  {
    files: ['tests/**/*.ts'],
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/missing-playwright-await': ['error', { includePageLocatorMethods: true }],
    },
  },

  // Disable rules that conflict with Prettier (always last)
  prettier,
];
