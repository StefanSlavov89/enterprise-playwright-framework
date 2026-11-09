import { CheckoutData, CheckoutValidationCase } from '../models/CheckoutData';

export class CheckoutFactory {
  static validCheckout(): CheckoutData {
    return {
      firstName: 'Stefan',
      lastName: 'Slavov',
      postalCode: '1000',
    };
  }

  static missingFirstName(): CheckoutValidationCase {
    return {
      data: { ...CheckoutFactory.validCheckout(), firstName: '' },
      expectedError: 'Error: First Name is required',
    };
  }

  static missingLastName(): CheckoutValidationCase {
    return {
      data: { ...CheckoutFactory.validCheckout(), lastName: '' },
      expectedError: 'Error: Last Name is required',
    };
  }

  static missingPostalCode(): CheckoutValidationCase {
    return {
      data: { ...CheckoutFactory.validCheckout(), postalCode: '' },
      expectedError: 'Error: Postal Code is required',
    };
  }
}
