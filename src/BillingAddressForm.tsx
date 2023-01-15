import React from "react";
import { AddressEditor } from "./AddressEditor";
import { AddressSummary } from "./AddressSummary";
import { Address } from "./types";

interface Props {
  address: Address;
  showButtons: boolean;
}

export function BillingAddressForm({
  address,
  showButtons
}: Props) {
  const [isEditing, setEditing] = React.useState(false);

  if (!address.isComplete || isEditing) {
    return (
      <>
        <AddressEditor />
        {showButtons &&
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
      {showButtons &&
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
