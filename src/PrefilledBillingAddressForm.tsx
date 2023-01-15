import React from "react";
import { AddressEditor } from "./AddressEditor";
import { AddressSummary } from "./AddressSummary";
import { emptyAddressEntry } from "./emptyAddress";
import { Address, AddressEntry } from "./types";

interface Props {
  billingAddress: Address;
}

export function PrefilledBillingAddressForm(props: Props) {
  const [isEditing, setEditing] = React.useState(false);
  const [, setBillingAddress] = React.useState<AddressEntry>(
    props.billingAddress
  );

  function toggleEditing() {
    if (isEditing) {
      setBillingAddress(props.billingAddress);
    } else {
      setBillingAddress(emptyAddressEntry)
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
          ? <AddressEditor />
          : <AddressSummary address={props.billingAddress} />
      }
    </>
  );
}
