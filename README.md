# Billing Billing

Simulates a checkout scenario where a user can provide a shipping address and a billing address in separate forms.

Try out the demo on [Codesandbox](https://codesandbox.io/p/github/jocmp/billing-billing/draft/gifted-framework?create=true&file=%2FREADME.md&workspace=%257B%2522activeFileId%2522%253A%2522clcxwytbt00108sh4gudzata1%2522%252C%2522openFiles%2522%253A%255B%2522%252FREADME.md%2522%255D%252C%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522gitSidebarPanel%2522%253A%2522COMMIT%2522%252C%2522spaces%2522%253A%257B%2522clcxwyv4h00133n6gyng6mxcv%2522%253A%257B%2522key%2522%253A%2522clcxwyv4h00133n6gyng6mxcv%2522%252C%2522name%2522%253A%2522Default%2522%252C%2522devtools%2522%253A%255B%257B%2522key%2522%253A%2522clcxwz4rk008u3n6gaam0svn7%2522%252C%2522type%2522%253A%2522PROJECT_SETUP%2522%252C%2522isMinimized%2522%253Afalse%257D%252C%257B%2522type%2522%253A%2522PREVIEW%2522%252C%2522taskId%2522%253A%2522start%2522%252C%2522port%2522%253A3000%252C%2522key%2522%253A%2522clcxwzgaw00i83n6gjf7kw791%2522%252C%2522isMinimized%2522%253Afalse%257D%252C%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522start%2522%252C%2522key%2522%253A%2522clcxwzdnz00f53n6g6p36pumr%2522%252C%2522isMinimized%2522%253Afalse%257D%255D%257D%257D%252C%2522currentSpace%2522%253A%2522clcxwyv4h00133n6gyng6mxcv%2522%252C%2522spacesOrder%2522%253A%255B%2522clcxwyv4h00133n6gyng6mxcv%2522%255D%257D)

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
