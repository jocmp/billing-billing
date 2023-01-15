import { compare } from "./addressComparator";
import { PrefilledBillingAddressForm } from "./PrefilledBillingAddressForm";
import { Address } from "./types";
import { ShippingAddressForm } from "./ShippingAddressForm";
import { BillingAddressForm } from "./BillingAddressForm";

interface Props {
  data: {
    shippingAddress: Address;
    billingAddress: Address;
  };
}

export function Layout(props: Props) {
  const { shippingAddress, billingAddress } = props.data;

  const isBillingSameAsShipping =
    shippingAddress.isComplete &&
    compare(shippingAddress, billingAddress);

  return (
    <div>
      <fieldset>
        <legend>Shipping Address</legend>
        <ShippingAddressForm
          address={shippingAddress}
        />
      </fieldset>
      <fieldset>
        <legend>Billing Address</legend>
        {
          isBillingSameAsShipping
            ? <PrefilledBillingAddressForm billingAddress={billingAddress} />
            : <BillingAddressForm address={billingAddress} />
        }
      </fieldset>
    </div>
  );
}
