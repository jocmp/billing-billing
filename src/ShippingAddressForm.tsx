import React from "react";
import { AddressEditor } from "./AddressEditor";
import { AddressSummary } from "./AddressSummary";
import { Address } from "./types";

interface Props {
  address: Address;
}

/**
 * Example shipping address form.
 *
 * Internal logic to show or display a shipping address is slightly different
 * than the billing address since it does not have the ability
 * to fallback to a second address like the "billing as shipping"
 * option.
 */
export function ShippingAddressForm({ address }: Props) {
  const [isEditing, setEditing] = React.useState(false);

  if (!address.isComplete || isEditing) {
    return (
      <>
        <AddressEditor />
        <button
          type="button"
          onClick={() => alert('Saved shipping address')}
        >
          Save
        </button>
        {address.isComplete &&
          <button
            type="button"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        }
      </>
    );
  }

  return (
    <>
      <AddressSummary address={address} />
      {address.isComplete &&
        <button
          type="button"
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
      }
    </>
  );
}
