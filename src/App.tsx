import React from 'react';
import { MetaControls } from './MetaControls';
import { Layout } from './Layout';
import './App.css';
import { APIClientContext, buildApiClient } from './apiClient';
import { emptyAddress } from './emptyAddress';

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
