import { isEmpty } from "lodash";
import React from "react";
import { Address, AddressEntry } from "./types"

export type Action = "billing" | "shipping";

export type UpdateCallback = (action: Action, address: AddressEntry) => Promise<any>

export interface APIClient {
  update: UpdateCallback;
}

export const APIClientContext = React.createContext<APIClient>({
  update: () => Promise.resolve(),
});

export function useAPIClient() {
  return React.useContext(APIClientContext);
}

export function buildApiClient(
  billingAddress: Address,
  callbacks: {
    setShippingAddress: (address: Address) => any;
    setBillingAddress: (address: Address) => any;
  },

): APIClient {
  /**
   * Updates the billing address in addition to the shipping address if
   * the billing address is not set
   */
  function updateShippingAddress(entry: AddressEntry) {
    callbacks.setShippingAddress(completedEntry(entry));

    if (isEmpty(billingAddress)) {
      callbacks.setBillingAddress(completedEntry(entry));
    }
  }

  async function update(action: Action, entry: AddressEntry) {
    const updater = (() => {
      if (action === "billing") {
        return callbacks.setBillingAddress
      } else {
        return updateShippingAddress;
      }
    })();

    return apiCall(() => updater(completedEntry(entry)));
  }

  return {
    update,
  };
}

async function apiCall(callback: () => void) {
  return new Promise((resolve) => setTimeout(() => {
    callback();
    resolve(null);
  }, jitterResponseTime()));
}

function completedEntry(entry: AddressEntry): Address {
  return {
    ...entry,
    isComplete: true,
  }
}

/**
 * Mimic an API response that takes between 1 to 3 seconds.
 */
function jitterResponseTime() {
  return Math.floor(Math.random() * 2) * 1_000 + 1_000;
}
