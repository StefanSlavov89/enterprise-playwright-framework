# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project overview

Playwright + TypeScript end-to-end test framework targeting **https://www.saucedemo.com** (UI) and **https://reqres.in/api** (API).
It uses a layered architecture: **Tests → Steps → Page Objects**, wired together through custom fixtures, with test data coming from factories.

- Runtime: Node 20 (matches CI), CommonJS modules, TypeScript `strict` mode (`noEmit`; Playwright transpiles on the fly)
- Only the `chromium` project is enabled in `playwright.config.ts`
- `baseURL` is `https://www.saucedemo.com`. Always navigate with relative paths (`page.goto('/inventory.html')`)

## Directory structure

```
pages/            Page Objects: locators + atomic page actions/assertions (one class per page)
steps/            Step classes: business flows composed from one or more Page Objects
fixtures/         testFixtures.ts: extends Playwright `test` with page objects, steps, and auth/state fixtures
data/models/      TypeScript interfaces for test data (User, CheckoutData)
data/factories/   Static factory classes that return model instances (UserFactory, CheckoutFactory)
utils/            Helpers that are neither pages nor steps (e.g. stateInjector.ts for cookie/localStorage injection)
tests/<feature>/  Spec files grouped by feature: auth, cart, checkout, api, visual
```

## Architecture rules

### Page Objects (`pages/`)

- One class per page, named `<Name>Page` in `pages/<Name>Page.ts` (PascalCase file name = class name).
- The constructor takes a `Page` and defines every locator as a `public readonly` `Locator` field. Don't create locators inline inside methods.
- Locator priority: `getByRole` / `getByText` / `[data-test="..."]` first, then stable `#id`. Avoid brittle CSS chains and XPath.
- Methods are small, `async`, single-purpose page interactions (`login`, `goToCart`, `addProductByIndex`).
- Page-level assertions are allowed only as `expect*` methods (e.g. `expectErrorText(text)`, `expectCartCount(n)`). Assert the specific outcome (exact text, count, URL), not just that something is visible using web-first `expect` from `@playwright/test`.
- No test data, no business flows spanning multiple pages, and no knowledge of other Page Objects.

### Steps (`steps/`)

- Named `<Feature>Steps` in `steps/<Feature>Steps.ts`.
- Receive Page Objects via constructor injection (`constructor(private loginPage: LoginPage) {}`). Steps never construct pages and never use `page` directly.
- Expose business-level actions that take model objects (`loginAs(user: User)`, `fillCheckoutData(data: CheckoutData)`).

### Fixtures (`fixtures/testFixtures.ts`)

- **Tests import `test` and `expect` from `fixtures/testFixtures`**, not from `@playwright/test`. The exception is pure API specs that need no UI fixtures.
- Every new Page Object or Steps class that tests use must be registered here, added to the `base.extend<{...}>` type map and given a fixture factory.
- Existing state fixtures to reuse rather than re-implement:
  - `authedContext`: injects the `session-username` cookie (skips the login UI)
  - `loggedInPage`: authed and already on `/inventory.html`
  - `speedyPage`: authed, images blocked via `route`, for faster runs
  - `authedCartSteps` / `authedSpeedyCartSteps`: `CartSteps` bound to the above pages

### Test data (`data/`)

- Define the shape in `data/models/` as an `interface`, and expose instances via `static` methods on a factory in `data/factories/` (`UserFactory.standardUser()`).
- Don't hardcode credentials or form data in spec files. Add a factory method instead.

### Tests (`tests/`)

- File naming: `tests/<feature>/<name>.spec.ts`.
- Tag every test (or its `describe`) in the title: `@smoke`, `@regression`, `@api`, or `@visual`. npm scripts and CI filter by these tags.
- Follow Arrange / Act / Assert with a blank line between sections (see `tests/auth/login.spec.ts`).
- Prefer driving the UI through Steps fixtures. Use Page Object fixtures directly only for assertions or single actions.
- For setup that isn't the subject of the test, use state injection (`authedContext`, `utils/stateInjector.ts`) instead of clicking through the UI.
- Use web-first assertions (`await expect(locator).toBeVisible()`). Never use `page.waitForTimeout` or hard sleeps.
- Every Playwright call must be awaited. ESLint enforces `playwright/missing-playwright-await` in `tests/**`.
- No `test.only` in committed code (`forbidOnly` fails CI).
- Remove debugging `console.log` statements before committing.

### Visual tests (`tests/visual/`)

- Baselines are OS-specific (`*-chromium-linux.png`, `*-chromium-darwin.png`). CI runs on Linux, so **generate or update Linux baselines through Docker**: `npm run docker:visual:update`.
- CI runs visual tests in a separate `visual-tests` job inside the `mcr.microsoft.com/playwright` container (same image as the `Dockerfile`). On failure, the expected/actual/diff images are uploaded as the `visual-diffs` artifact.
- Don't update snapshots to make a failing test pass unless the UI change is intentional.

## Code style

- Prettier (`.prettierrc`): 2 spaces, single quotes, semicolons, trailing commas, `printWidth` 100, always parenthesize arrow params.
- ESLint (`eslint.config.mjs`): `typescript-eslint` recommended across the project, plus `eslint-plugin-playwright` recommended in `tests/**`, and `eslint-config-prettier` last.
- Use relative imports (no path aliases are configured). Keep explicit types on public methods and fixture type maps.
- Don't use `any`. Add a model interface instead.

## Commands

| Task                                    | Command                                                                                           |
| --------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Install deps                            | `npm ci` then `npx playwright install --with-deps`                                                |
| Run all tests                           | `npm test`                                                                                        |
| Smoke / Regression                      | `npm run test:smoke` / `npm run test:regression`                                                  |
| API tests                               | `npm run test:api`                                                                                |
| Visual tests                            | `npm run test:visual`                                                                             |
| Update visual baselines (local OS)      | `npm run test:visual:update`                                                                      |
| Same set CI runs                        | `npx playwright test --grep-invert @visual`                                                       |
| Single file / single test               | `npx playwright test tests/auth/login.spec.ts` / `npx playwright test -g "Valid user can log in"` |
| Headed / UI mode                        | `npm run test:headed` / `npm run test:ui`                                                         |
| Debug a test                            | `npx playwright test <file> --debug`                                                              |
| Open HTML report                        | `npm run report`                                                                                  |
| View a trace                            | `npx playwright show-trace test-results/<test>/trace.zip`                                         |
| Lint                                    | `npx eslint .`                                                                                    |
| Format                                  | `npx prettier --write .`                                                                          |
| Type-check                              | `npx tsc --noEmit`                                                                                |
| Docker: build image                     | `npm run docker:build`                                                                            |
| Docker: run all tests                   | `npm run docker:test`                                                                             |
| Docker: update visual baselines (Linux) | `npm run docker:visual:update`                                                                    |

On Windows/PowerShell, quote grep patterns that contain `@` (`--grep "@smoke"`).

## Before finishing a change

1. `npx tsc --noEmit` and `npx eslint .` pass with no errors.
2. Run the affected spec(s), and the `@smoke` suite if shared pages, steps, or fixtures changed.
3. New pages and steps are registered in `fixtures/testFixtures.ts`, and new tests are tagged.

## Gotchas

- The Playwright Docker image tag (`mcr.microsoft.com/playwright:vX.Y.Z-noble`) appears in both `Dockerfile` and the `visual-tests` job in `.github/workflows/playwright.yml`. Both must match the installed `@playwright/test` version. Bump them together whenever Playwright's version changes, or browsers and snapshots will mismatch.
- `.github/workflows/nightly.yml` runs the PR test set nightly and, on failures or flaky tests, has Claude follow `.claude/agents/analyze-nightly.md` to write an analysis that a workflow step posts to a `nightly-failure` issue. Claude there only gets `Read,Glob,Grep,Write`; keep it report-only. Keep its test commands and Docker tag in sync with `playwright.yml`.
- CI config: retries = 2, workers = 2, and traces are recorded `on-first-retry`. Locally there are 0 retries, so reproduce flakiness with `--repeat-each`.
- `tsconfig.json` uses `"module"`/`"moduleResolution": "nodenext"`. Don't switch back to `"node"`, which TypeScript 6 rejects as deprecated (TS5107).
- Line endings are LF everywhere, enforced by `.gitattributes` (`* text=auto eol=lf`) regardless of each machine's `core.autocrlf`. Keep files LF, including on Windows. This matches Prettier's default and the Linux Docker container.
- `playwright-report/` and `test-results/` are generated output (git-ignored). Don't edit or commit them.
- The ReqRes API key is currently inlined in `tests/api/userApi.spec.ts`. New secrets go in `.env` (git-ignored), not in source.

## Git & Commit Rules

- Never add "Co-Authored-By" or any AI attribution trailers to Git commit messages.
- Format commit messages cleanly without extra metadata.
