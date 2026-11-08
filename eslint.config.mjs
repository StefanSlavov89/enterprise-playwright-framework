import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
  // Lints all TypeScript files in the project
  ...tseslint.configs.recommended,

  // Type-aware rules: catch promises that are never awaited (e.g. a forgotten `await` on a
  // page-object or step method, or on route.fulfill() inside a fixture)
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },

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
