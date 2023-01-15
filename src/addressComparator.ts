import { isEqual, pick } from "lodash";
import { Address } from "./types";

export function isShippingEqualToBilling(shippingAddress: Address, billingAddress: Address) {
  const shippingFields = pick(shippingAddress, comparedFields);
  const billingFields = pick(billingAddress, comparedFields);

  return isEqual(shippingFields, billingFields);
}

const comparedFields = [
  'contactName',
  'streetAddress',
  'extendedAddress',
  'locality',
  'administrativeAreaCode',
  'postalCode',
  'countryCode'
];
