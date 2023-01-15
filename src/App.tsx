import React from 'react';
import { MetaControls } from './MetaControls';
import { Layout } from './Layout';
import * as database from './database';
import './App.css';

/**
 * Simulates a checkout scenario where a user can provide a shipping
 * address and a billing address in separate forms.
 *
 * There are four main scenarios this application supports:
 *
 * 1. Both forms are incomplete
 *    - Both shipping and billing forms display the editor
 * 2. Both forms are complete and are match
 *    - Billing is prefilled with shipping, "same as shipping" button is shown.
 *    - Both shipping and billing forms display summary
 * 3. Both forms are complete and don't match
 *    - Billing has a standalone address, so "same as shipping" button is hidden
 *    - Both shipping and billing forms display summary
 * 4. Only billing is complete
 *    - Shipping displays and editor
 *    - Billing displays a summary
 *    - Shipping is not complete, so "same as shipping" button is hidden
 */
export default function App() {
  const [shippingAddress, setShippingAddress] = React.useState(database.shippingAddress);
  const [billingAddress, setBillingAddress] = React.useState(database.shippingAddress)
  const [showJSONDebug, setJSONDebug] = React.useState(false);

  return (
    <>
      <div className="main">
        <div className="layout">

          <MetaControls
            shippingAddress={shippingAddress}
            billingAddress={billingAddress}
            onShippingUpdate={setShippingAddress}
            onBillingUpdate={setBillingAddress}
            showJSONDebug={showJSONDebug}
            setJSONDebug={setJSONDebug}
          />
          <Layout
            data={{
              billingAddress,
              shippingAddress,
            }}
          />
        </div>
        <div className="json-debug">
          {showJSONDebug &&
            <fieldset>
              <legend>JSON</legend>
              <pre>
                {JSON.stringify({
                  shippingAddress,
                  billingAddress,
                }, null, 2)}
              </pre>
            </fieldset>
          }
        </div>
      </div>
    </>
  );
}
