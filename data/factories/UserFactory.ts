import { LoginFailureCase, User } from '../models/User';

export class UserFactory {
  static standardUser(): User {
    return {
      username: 'standard_user',
      password: 'secret_sauce',
    };
  }

  static lockedUser(): LoginFailureCase {
    return {
      user: { username: 'locked_out_user', password: 'secret_sauce' },
      expectedError: 'Epic sadface: Sorry, this user has been locked out.',
    };
  }

  static invalidCredentials(): LoginFailureCase {
    return {
      user: { ...UserFactory.standardUser(), password: 'wrong_password' },
      expectedError: 'Epic sadface: Username and password do not match any user in this service',
    };
  }
}
