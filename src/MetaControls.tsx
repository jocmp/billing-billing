import { isEmpty } from "lodash";
import { isShippingEqualToBilling } from "./addressComparator";
import { Address } from "./types";
import * as database from './database';
import { emptyAddress } from "./emptyAddress";

interface Props {
  shippingAddress: Address;
  billingAddress: Address;
  onShippingUpdate: (address: Address) => void;
  onBillingUpdate: (address: Address) => void;
  showJSONDebug: boolean;
  setJSONDebug: (showJSONDebug: boolean) => void;
}

/**
 * Toggles for the simulated app state.
 */
export function MetaControls({
  shippingAddress,
  billingAddress,
  onBillingUpdate,
  onShippingUpdate,
  showJSONDebug,
  setJSONDebug
}: Props) {
  const isPrefilledBillingEqualToShipping = isShippingEqualToBilling(
    shippingAddress,
    billingAddress
  );

  function toggleShippingDefault() {
    const nextShippingAddress =
      isEmpty(shippingAddress) ?
        database.shippingAddress :
        emptyAddress;

    onShippingUpdate(nextShippingAddress);

    const canUpdateBillingAddress =
      isPrefilledBillingEqualToShipping ||
      isShippingEqualToBilling(nextShippingAddress, billingAddress) ||
      isEmpty(billingAddress);

    if (canUpdateBillingAddress) {
      onBillingUpdate(nextShippingAddress);
    }
  }

  function toggleBillingPrefilled() {
    if (isPrefilledBillingEqualToShipping) {
      onBillingUpdate(database.billingAddress);
    } else {
      onBillingUpdate(shippingAddress);
    }
  }

  function toggleJSONDebug() {
    setJSONDebug(!showJSONDebug);
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
            checked={!isEmpty(shippingAddress)}
          />
          <label htmlFor="shipping-default">Prefill shipping address</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="billing-prefilled"
            name="billing-prefilled"
            onChange={toggleBillingPrefilled}
            checked={!isPrefilledBillingEqualToShipping}
          />
          <label htmlFor="billing-prefilled">Prefill billing address</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="json-debug"
            name="json-debug"
            onChange={toggleJSONDebug}
            checked={showJSONDebug}
          />
          <label htmlFor="json-debug">Show JSON values</label>
        </div>
      </fieldset>
    </div>
  )
}
