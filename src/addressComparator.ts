import { isEqual, pick } from "lodash";
import { Address } from "./types";

export function compare(firstAddress: Address, secondAddress: Address) {
  const shippingFields = pick(firstAddress, comparedFields);
  const billingFields = pick(secondAddress, comparedFields);

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
