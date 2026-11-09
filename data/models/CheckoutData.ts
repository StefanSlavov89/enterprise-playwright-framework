export interface CheckoutData {
  firstName: string;
  lastName: string;
  postalCode: string;
}

/** Checkout form input that should be rejected, paired with the error it must produce. */
export interface CheckoutValidationCase {
  data: CheckoutData;
  expectedError: string;
}
