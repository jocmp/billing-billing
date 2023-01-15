import { isEmpty } from "lodash";
import React from "react";
import { isShippingEqualToBilling } from "./addressComparator";
import { BillingAddressForm } from "./BillingAddressForm";
import { emptyAddress } from "./emptyAddress";
import { ShippingAddressForm } from "./ShippingAddressForm";
import { Address } from "./types";

interface Props {
  data: {
    shippingAddress: Address;
    billingAddress: Address;
  };
}

export function Layout(props: Props) {
  const { shippingAddress } = props.data;
  const defaultBillingAddress = props.data.billingAddress;

  const isShippingEqualToDefaultBilling =
    isShippingEqualToBilling(shippingAddress, defaultBillingAddress);
  const showCheckbox = !isEmpty(shippingAddress) && isShippingEqualToDefaultBilling;
  const [isChecked, setChecked] = React.useState(isShippingEqualToDefaultBilling);

  // might need to be inside form itself
  const [billingAddress, setBillingAddress] = React.useState(defaultBillingAddress);

  function toggleBillingAsShipping() {
    if (isChecked) {
      setBillingAddress(emptyAddress);
    } else {
      setBillingAddress(defaultBillingAddress);
    }

    setChecked(!isChecked);
  }

  return (
    <div>
      <fieldset>
        <legend>Shipping Address</legend>
        <ShippingAddressForm address={shippingAddress} />
      </fieldset>
      <fieldset>
        <legend>Billing Address</legend>
        {showCheckbox &&
          <>
            <input
              type="checkbox"
              id="billing-as-shipping"
              name="billing-as-shipping"
              onChange={toggleBillingAsShipping}
              checked={isChecked}
            />
            <label htmlFor="billing-as-shipping">Same as shipping address</label>
          </>
        }
        <BillingAddressForm
          address={billingAddress}
          showButtons={!showCheckbox}
        />
      </fieldset>
    </div>
  );
}
