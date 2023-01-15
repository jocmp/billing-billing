import React from 'react';
import { MetaControls } from './MetaControls';
import { Layout } from './Layout';
import './App.css';
import { APIClientContext, buildApiClient } from './apiClient';
import { emptyAddress } from './emptyAddress';

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
  const [shippingAddress, setShippingAddress] = React.useState(emptyAddress);
  const [billingAddress, setBillingAddress] = React.useState(emptyAddress);
  const [showDatabaseDebug, setDatabaseDebug] = React.useState(false);

  const apiClient = buildApiClient(
    billingAddress,
    {
      setShippingAddress,
      setBillingAddress,
    }
  );

  return (
    <>
      <div className="main">
        <APIClientContext.Provider value={apiClient}>
          <div className="layout">
            <MetaControls
              shippingAddress={shippingAddress}
              billingAddress={billingAddress}
              onShippingUpdate={setShippingAddress}
              onBillingUpdate={setBillingAddress}
              showDatabaseDebug={showDatabaseDebug}
              setDatabaseDebug={setDatabaseDebug}
            />
            <Layout
              data={{
                billingAddress,
                shippingAddress,
              }}
            />
          </div>
          <div className="database-debug">
            {showDatabaseDebug &&
              <fieldset>
                <legend>Database</legend>
                <pre>
                  {JSON.stringify({
                    shippingAddress,
                    billingAddress,
                  }, null, 2)}
                </pre>
              </fieldset>
            }
          </div>
        </APIClientContext.Provider>
      </div>
    </>
  );
}
