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
}

/**
 * Toggles for the simulated app state.
 */
export function MetaControls({
  shippingAddress,
  billingAddress,
  onBillingUpdate,
  onShippingUpdate,
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
    const nextInitialBillingAddress =
      isPrefilledBillingEqualToShipping ?
        database.billingAddress :
        shippingAddress;

    onBillingUpdate(nextInitialBillingAddress);
  }

  return (
    <div>
      <fieldset>
        <legend className="meta-legend">Meta controls 🪬</legend>
        <input
          type="checkbox"
          id="shipping-default"
          name="shipping-default"
          onChange={toggleShippingDefault}
          checked={!isEmpty(shippingAddress)}
        />
        <label htmlFor="shipping-default">Prefill shipping address</label>
        <input
          type="checkbox"
          id="billing-prefilled"
          name="billing-prefilled"
          onChange={toggleBillingPrefilled}
          checked={!isPrefilledBillingEqualToShipping}
        />
        <label htmlFor="billing-prefilled">Prefill billing address</label>
      </fieldset>
    </div>
  )
}
