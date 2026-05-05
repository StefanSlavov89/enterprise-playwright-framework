import { User } from '../models/User';

export class UserFactory {
  static standardUser(): User {
    return {
      username: 'standard_user',
      password: 'secret_sauce',
    };
  }

  static lockedUser(): User {
    return {
      username: 'locked_out_user',
      password: 'secret_sauce',
    };
  }
}
