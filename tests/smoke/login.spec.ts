import { test, expect } from '../../fixtures/testFixtures';
import { UserFactory } from '../../data/factories/UserFactory';

test('@smoke Valid user can log in', async ({ authSteps, page }) => {
  const user = UserFactory.standardUser();

  await authSteps.loginAs(user);

  await expect(page).toHaveURL(/inventory/);
});
