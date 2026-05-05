import { CheckoutData } from '../models/CheckoutData';

export class CheckoutFactory {
  static validCheckout(): CheckoutData {
    return {
      firstName: 'Stefan',
      lastName: 'Slavov',
      postalCode: '1000',
    };
  }

  static missingFirstName(): CheckoutData {
    return {
      firstName: '',
      lastName: 'Slavov',
      postalCode: '1000',
    };
  }
}
