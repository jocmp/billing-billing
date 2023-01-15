import { compare } from "./addressComparator";
import { Address } from "./types";
import * as database from './database';
import { emptyAddress } from "./emptyAddress";

interface Props {
  shippingAddress: Address;
  billingAddress: Address;
  onShippingUpdate: (address: Address) => void;
  onBillingUpdate: (address: Address) => void;
  showDatabaseDebug: boolean;
  setDatabaseDebug: (showDatabaseDebug: boolean) => void;
}

/**
 * Toggles for the simulated app state.
 */
export function MetaControls({
  shippingAddress,
  billingAddress,
  onBillingUpdate,
  onShippingUpdate,
  showDatabaseDebug,
  setDatabaseDebug
}: Props) {
  const isBillingSameAsShipping = compare(
    shippingAddress,
    billingAddress
  );

  function toggleShippingDefault() {
    const nextShippingAddress =
      !shippingAddress.isComplete ?
        database.shippingAddress :
        emptyAddress;

    onShippingUpdate(nextShippingAddress);

    const canUpdateBillingAddress =
      isBillingSameAsShipping ||
      compare(nextShippingAddress, billingAddress) ||
      !billingAddress.isComplete;

    if (canUpdateBillingAddress) {
      onBillingUpdate(nextShippingAddress);
    }
  }

  function toggleBillingPrefilled() {
    if (isBillingSameAsShipping) {
      onBillingUpdate(database.billingAddress);
    } else {
      onBillingUpdate(shippingAddress);
    }
  }

  function toggleJSONDebug() {
    setDatabaseDebug(!showDatabaseDebug);
  }

  function resetAddresses() {
    onShippingUpdate(emptyAddress);
    onBillingUpdate(emptyAddress);
  }

  return (
    <div className="meta-controls">
      <fieldset>
        <legend className="meta-legend">Meta controls 🪬</legend>
        <div>
          <input
            type="checkbox"
            id="shipping-default"
            name="shipping-default"
            onChange={toggleShippingDefault}
            checked={shippingAddress.isComplete}
          />
          <label htmlFor="shipping-default">Prefill shipping address</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="billing-prefilled"
            name="billing-prefilled"
            onChange={toggleBillingPrefilled}
            checked={billingAddress.isComplete && !isBillingSameAsShipping}
          />
          <label htmlFor="billing-prefilled">Prefill billing address</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="database-debug"
            name="database-debug"
            onChange={toggleJSONDebug}
            checked={showDatabaseDebug}
          />
          <label htmlFor="database-debug">Show Database</label>
        </div>
        <div>
          <button
            className="reset-button"
            type="button"
            onClick={resetAddresses}
          >
            Reset Addresses
          </button>
        </div>
      </fieldset>
    </div>
  )
}
