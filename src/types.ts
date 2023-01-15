export interface Address {
  contactName: string;
  streetAddress: string;
  extendedAddress: string;
  locality: string;
  administrativeAreaCode: string;
  postalCode: string
  countryCode: string;
  isComplete: boolean
}

export interface AddressEntry {
  contactName: string;
  streetAddress: string;
  extendedAddress: string;
  locality: string;
  administrativeAreaCode: string;
  postalCode: string
  countryCode: string;
}
