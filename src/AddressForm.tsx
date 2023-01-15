import React from "react";
import { AddressEditor } from "./AddressEditor";
import { AddressSummary } from "./AddressSummary";
import { Address, AddressEntry } from "./types";

interface Props {
  address: Address;
  updateAddress: (addressEntry: AddressEntry) => Promise<void>;
}

/**
 * Example shipping address form.
 *
 * Internal logic to show or display a shipping address is slightly different
 * than the billing address since it does not have the ability
 * to fallback to a second address like the "billing as shipping"
 * option.
 */
export function AddressForm(props: Props) {
  const [isEditing, setEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const formID = React.useMemo(() => crypto.randomUUID(), []);

  async function updateAddress(entry: AddressEntry) {
    setLoading(true);
    await props.updateAddress(entry)
    setLoading(false);
  }

  function toggleEditing(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setEditing(!isEditing);
  }

  if (!props.address.isComplete || isEditing) {
    return (
      <>
        <AddressEditor
          formID={formID}
          address={props.address}
          onSubmit={updateAddress}
        />
        <div className="address-editor-actions">
          <button
            form={formID}
            type="submit"
            disabled={loading}
          >
            {loading ? "Please wait..." : "Save"}
          </button>
          {props.address.isComplete &&
            <button
              type="button"
              disabled={loading}
              onClick={toggleEditing}
            >
              Cancel
            </button>
          }
        </div>
      </>
    );
  }

  return (
    <>
      <AddressSummary address={props.address} />
      {props.address.isComplete &&
        <button
          type="button"
          onClick={toggleEditing}
        >
          Edit
        </button>
      }
    </>
  );
}
