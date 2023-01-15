import { AddressForm } from "./AddressForm";
import { useAPIClient } from "./apiClient";
import { Address, AddressEntry } from "./types";

interface Props {
  address: Address;
}

export function BillingAddressForm(props: Props) {
  const client = useAPIClient();

  async function updateAddress(addressEntry: AddressEntry) {
    return client.update("billing", addressEntry);
  }

  return (
    <AddressForm
      address={props.address}
      updateAddress={updateAddress}
    />
  );
}
