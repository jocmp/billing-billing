import { isEmpty, isEqual, omitBy, pick } from "lodash";
import { Address } from "./types";

export function compare(firstAddress: Address, secondAddress: Address) {
  const shippingFields = pick(firstAddress, userEnteredFields);
  const billingFields = pick(secondAddress, userEnteredFields);

  return isEqual(shippingFields, billingFields);
}

export function isEmptyAddress(address: Address) {
  // Select only user-entered fields. Leave out IDs and other checks.
  const addressEntryFields = pick(address, userEnteredFields);
  // Leave out falsey fields
  const presentFields = omitBy(addressEntryFields, isEmpty);

  // If no fields remain, then the address is "empty".
  return isEmpty(presentFields);
}

const userEnteredFields = [
  'contactName',
  'streetAddress',
  'extendedAddress',
  'locality',
  'administrativeAreaCode',
  'postalCode',
  'countryCode'
];
