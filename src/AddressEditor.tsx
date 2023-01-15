import { map } from "lodash";
import { TextInput } from "./TextInput";
import { usAdminAreas, countries } from "./database";
import { Address, AddressEntry } from "./types";
import React from "react";

interface Props {
  address: Address;
  formID: string;
  onSubmit: (address: AddressEntry) => void;
}

export function AddressEditor(props: Props) {
  const [address, setAddress] = React.useState<AddressEntry>({
    ...props.address,
    ...countryOrDefault(props.address),
  });

  function updateField(field: keyof AddressEntry) {
    return function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
      setAddress({
        ...address,
        [field]: e.target.value,
      })
    }
  }

  function onSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    props.onSubmit(address);
  }

  return (
    <form
      id={props.formID}
      onSubmit={onSubmit}
    >
      <label htmlFor="country-code">Country</label>
      <select
        className="selector"
        id="country-code"
        name="country-code"
        value={address.countryCode}
        required
        onChange={updateField('countryCode')}
      >
        {map(countries, (name, key) => (
          <option key={key} value={key}>{name}</option>
        ))}
      </select>
      <TextInput
        id="contact-name"
        label="Name"
        onChange={updateField('contactName')}
        value={address.contactName}
        required
      />
      <TextInput
        id="street-address"
        label="Street Address"
        onChange={updateField('streetAddress')}
        value={address.streetAddress}
        required
      />
      <TextInput
        id="extended-address"
        label="Extended Address"
        onChange={updateField('extendedAddress')}
        value={address.extendedAddress}
      />
      <TextInput
        id="locality"
        label="City"
        onChange={updateField('locality')}
        value={address.locality}
        required
      />
      {address.countryCode === 'US' &&
        <>
          <label htmlFor="admin-area">State</label>
          <select
            className="selector"
            id="admin-area"
            name="admin-area"
            value={address.administrativeAreaCode}
            required
            onChange={updateField('administrativeAreaCode')}
          >
            <option disabled value=""></option>
            {map(usAdminAreas, (name, key) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </>
      }
      <TextInput
        id="postal-code"
        label="Postal Code"
        onChange={updateField('postalCode')}
        value={address.postalCode}
        required
      />
    </form>
  );
}

function countryOrDefault(address: Address) {
  return {
    countryCode: address.countryCode || 'US'
  };
}
