import { map } from "lodash";
import { TextInput } from "./TextInput";
import { adminAreas } from "./database";

export function AddressEditor() {
  return (
    <div>
      <TextInput id="contactName" label="Name" />
      <TextInput id="streetAddress" label="Street Address" />
      <TextInput id="extendedAddress" label="Extended Address" />
      <label htmlFor="admin-area">State</label>
      <select
        className="selector"
        id="admin-area"
        name="admin-area"
      >
        {map(adminAreas, (name, key) => (
          <option value={key}>{name}</option>
        ))}
      </select>
      <TextInput id="postalCode" label="ZIP Code" />
    </div>
  );
}
