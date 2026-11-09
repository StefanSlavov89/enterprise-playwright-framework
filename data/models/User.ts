export interface User {
  username: string;
  password: string;
}

/** Login attempt that should be rejected, paired with the error it must produce. */
export interface LoginFailureCase {
  user: User;
  expectedError: string;
}
