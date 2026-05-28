import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutData } from '../data/models/CheckoutData';

export class CheckoutSteps {
  constructor(
    private checkoutInfoPage: CheckoutInfoPage,
    private checkoutOverviewPage: CheckoutOverviewPage,
  ) {}

  async fillCheckoutData(data: CheckoutData) {
    await this.checkoutInfoPage.fillInfo(data.firstName, data.lastName, data.postalCode);
  }

  async submitCheckout() {
    await this.checkoutInfoPage.continueToOverviewPage();
  }

  async finishCheckout() {
    await this.checkoutOverviewPage.finishCheckOut();
  }
}
