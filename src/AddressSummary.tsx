import { Address } from "./types";

interface Props {
  address: Address;
}

export function AddressSummary({ address }: Props) {
  return (
    <address>
      {address.contactName}<br />
      {address.streetAddress}<br />
      {address.extendedAddress}
      {`${address.locality}, ${address.administrativeAreaCode}, ${address.postalCode}`}<br />
      {address.countryCode}
    </address>
  );
}
