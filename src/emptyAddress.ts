import { Address } from "./types";

/** Address null object */
export const emptyAddress: Address = {
  contactName: '',
  streetAddress: '',
  extendedAddress: '',
  locality: '',
  administrativeAreaCode: '',
  postalCode: '',
  countryCode: '',
  isComplete: false,
};
