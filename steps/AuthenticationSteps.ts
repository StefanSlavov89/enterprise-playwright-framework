import { LoginPage } from '../pages/LoginPage';
import { User } from '../data/models/User';

export class AuthenticationSteps {
  constructor(private loginPage: LoginPage) {}

  async loginAs(user: User) {
    await this.loginPage.goto();
    await this.loginPage.login(user.username, user.password);
  }
}
