import { Address } from "./types";

export const adminAreas = {
  IL: "Illinois",
  MI: "Michigan",
  CA: "California",
  NJ: "New Jersey"
};

export const shippingAddress: Address = {
  contactName: "Daniel Burnham",
  streetAddress: "211 S Clark St",
  extendedAddress: "",
  locality: "Chicago",
  administrativeAreaCode: "IL",
  postalCode: "60604",
  countryCode: "US",
  isComplete: true,
};

export const billingAddress: Address = {
  contactName: "Claude Shannon",
  streetAddress: "101 Crawfords Corner Road",
  extendedAddress: "",
  locality: "Holmdel",
  administrativeAreaCode: "NJ",
  postalCode: "07733",
  countryCode: "US",
  isComplete: true,
};
