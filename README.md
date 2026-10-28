# Bond Swap landing page

Powered by BondTrader.

An English-language retail landing page prototype for fractionalized bond trading with USDC on Ethereum.

## Preview

Open `index.html` directly, or run the optional local server with Node.js:

```sh
node server.cjs
```

Then visit http://127.0.0.1:4173/.

No installation or build step is required. Google Fonts uses an internet connection; system fonts provide a fallback.

## Files

- `index.html`: page content and accessible controls.
- `styles.css`: base visual design.
- `playground.css`: interactive allocation playground layout.
- `script.js`: coin dragging, illustrative allocations, reset controls, dialogs, and view switching.
- `signup.css` and `signup.js`: embedded sign-up preview, validation, and local completion state.
- `server.cjs`: optional local static server.

## Prototype scope

Drag USDC coins onto issuer cards, or select a coin and then a card. Allocations are samples, not executable trades, bond quantities, or market quotes. Reset artwork restores moved objects.

The Market viewer is a placeholder for frontend integration. The sign-up prototype is always visible in the left-hand panel beneath a compact product introduction. The right panel switches independently between Playground and Market viewer, so visitors can explore while signing up. The form checks required fields, email format, password requirements, matching confirmation, and the confirmation checkbox. Optional referral and challenge codes are layout placeholders. All country options are shown without implying eligibility.

Form submission is local only: entries are cleared and a preview completion state appears. No account is created. No form data is transmitted or stored by the application. Use dummy details when testing. Terms, Privacy Notice, and sign-in are placeholders. No wallet, live data feed, registration service, analytics, or financial transaction is connected.

Product structure, bond terms, eligibility, legal links, and onboarding destinations require confirmation before production use.

## Validation

JavaScript syntax and simulated interaction checks have passed, including pointer-drop allocation, free movement, sample arithmetic, view switching, and reset. Rendered browser and mobile interaction verification remain outstanding.
