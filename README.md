# Billing Billing

Simulates a checkout scenario where a user can provide a shipping address and a billing address in separate forms.

Try out the demo on [Codesandbox](https://codesandbox.io/p/github/jocmp/billing-billing/gifted-framework?file=%2FREADME.md)

There are four main scenarios this application supports:

1. Both forms are incomplete
   - Both shipping and billing forms display the editor
2. Both forms are complete and are match
   - Billing is prefilled with shipping, "same as shipping" button is shown.
   - Both shipping and billing forms display summary
3. Both forms are complete and don't match
   - Billing has a standalone address, so "same as shipping" button is hidden
   - Both shipping and billing forms display summary
4. Only billing is complete
   - Shipping displays and editor
   - Billing displays a summary
   - Shipping is not complete, so "same as shipping" button is hidden

The demo relies on remote state from a fake API provided by the [apiClient.ts](./src/apiClient.ts) file. On refresh, the "response" rehydrates the page.

Stale data is prevented by branching on the refreshed network state. This prevents address forms from holding onto old results. One major example of this can be found in the [PrefilledBillingAddressForm](./src/PrefilledBillingAddressForm.tsx) component:

```typescript
{
  isEditing
  ? <BillingAddressForm address={billingAddress} />
  : <AddressSummary address={props.billingAddress} />
}
```

This line encapsulates the following conditions:

- In the editing case, show the [BillingAddressForm](./src/BillingAddressForm.tsx) component that contains React state.
- Otherwise, show a stateless address summary.

Since the address summary is shown when the billing is the same as shipping, the refreshed state will always reset a new address if the user edits the form.
