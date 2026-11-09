import { test, expect } from '../../fixtures/testFixtures';
import { UserFactory } from '../../data/factories/UserFactory';

test('@smoke Valid user can log in', async ({ authSteps, page }) => {
  const user = UserFactory.standardUser();

  await authSteps.loginAs(user);

  await expect(page).toHaveURL(/inventory/);
});

test('@regression Locked out user can not log in', async ({ authSteps, loginPage }) => {
  const { user, expectedError } = UserFactory.lockedUser();

  await authSteps.loginAs(user);

  await loginPage.expectErrorText(expectedError);
});

test('@regression User with invalid credentials can not log in', async ({
  authSteps,
  loginPage,
}) => {
  const { user, expectedError } = UserFactory.invalidCredentials();

  await authSteps.loginAs(user);

  await loginPage.expectErrorText(expectedError);
});
