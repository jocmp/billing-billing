import React from "react";
import { AddressSummary } from "./AddressSummary";
import { BillingAddressForm } from "./BillingAddressForm";
import { emptyAddress } from "./emptyAddress";
import { Address } from "./types";

interface Props {
  billingAddress: Address;
}

export function PrefilledBillingAddressForm(props: Props) {
  const [isEditing, setEditing] = React.useState(false);
  const [billingAddress, setBillingAddress] = React.useState({
    ...props.billingAddress,
    isComplete: false,
  });

  function toggleEditing() {
    if (isEditing) {
      setBillingAddress(props.billingAddress);
    } else {
      setBillingAddress(emptyAddress);
    }
    setEditing(!isEditing);
  }

  return (
    <>
      <input
        type="checkbox"
        id="billing-as-shipping"
        name="billing-as-shipping"
        onChange={toggleEditing}
        checked={!isEditing}
      />
      <label htmlFor="billing-as-shipping">Same as shipping address</label>
      {
        isEditing
          ? <BillingAddressForm address={billingAddress} />
          : <AddressSummary address={props.billingAddress} />
      }
    </>
  );
}
