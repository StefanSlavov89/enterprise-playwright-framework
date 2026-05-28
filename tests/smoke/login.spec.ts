import { test, expect } from '../../fixtures/testFixtures';
import { UserFactory } from '../../data/factories/UserFactory';

test('@smoke Valid user can log in', async ({ authSteps, page }) => {
  const user = UserFactory.standardUser();

  await authSteps.loginAs(user);

  await expect(page).toHaveURL(/inventory/);
});

test('@regression Invalid user can not log in', async ({ authSteps, loginPage }) => {
  const user = UserFactory.lockedUser();

  await authSteps.loginAs(user);

  await loginPage.expectError();
});
