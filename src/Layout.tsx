import { compare } from "./addressComparator";
import { PrefilledBillingAddressForm } from "./PrefilledBillingAddressForm";
import { AddressForm } from "./AddressForm";
import { Address } from "./types";

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
        <AddressForm address={shippingAddress} />
      </fieldset>
      <fieldset>
        <legend>Billing Address</legend>
        {
          isBillingSameAsShipping
            ? <PrefilledBillingAddressForm billingAddress={billingAddress} />
            : <AddressForm address={billingAddress} />
        }
      </fieldset>
    </div>
  );
}

// if shipping is not complete and billing is not complete
