import { compact } from "lodash";
import { Address } from "./types";

interface Props {
  address: Address;
}

export function AddressSummary({ address }: Props) {
  const localityLine = compact([
    address.locality,
    address.administrativeAreaCode,
    address.postalCode,
  ]).join(', ')

  return (
    <address>
      {address.contactName}<br />
      {address.streetAddress}<br />
      {address.extendedAddress}
      {localityLine}<br />
      {address.countryCode}
    </address>
  );
}
