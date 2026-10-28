# Bond Swap — DeFi concept

An independent local repository cloned from the approved Bond Swap prototype at commit `1e82fd7ede4653513f9127893096776644e1b9b1`.

The approved source repository is unchanged. This clone has no origin remote, preventing accidental pushes to the approved design.

## Preview

Run `node server.cjs`, then visit http://127.0.0.1:4183/.

Or open `index.html` directly. No installation or build step is needed. Google Fonts is optional; local font fallbacks are included.

## Direction

- Bold sans-serif typography, violet, lime, lavender, and pink.
- Rounded corporate-bond tickets instead of formal certificates.
- An always-visible sign-up card with two short steps.
- Free dragging and coin-drop sample allocation, with tap and keyboard alternatives.
- A Market viewer placeholder for the frontend team.

## Files

- `index.html` and `defi.css`: the new DeFi-oriented design.
- `script.js`: dialogs, view switching, free dragging, and sample allocations.
- `signup.js`: local-only form validation and completion.
- `experience.js`: sign-up steps and navigation.
- `server.cjs`: optional preview server on port 4183.

Legacy stylesheets are retained from the source clone but are not loaded by the new page.

## Prototype limitations

No accounts, quotes, wallet connection, trades, or data integrations are live. Form data is not sent or stored. Use dummy entries. Demo USDC allocations do not calculate bond ownership, prices, or returns. Issuer tickers are references to the bond issuer, not listings of shares. Terms, Privacy Notice, and sign-in remain placeholders. Eligibility and product details require confirmation before production.

## Isolation

Do not set this clone's origin to `CrisLGTM/bondmarketusd-landing-page`. A new GitHub repository is needed for this experiment.

## Checks performed

- Desktop rendering inspected in the in-app browser.
- First sign-up step and back navigation tested with dummy details.
- Tap-to-select coin allocation tested in the browser.
- Simulated checks cover password mismatch blocking, both form steps, form clearing, retry, allocation totals, reset, and view switching.
- All JavaScript files pass syntax checks.
- Mobile breakpoints are implemented; mobile rendering still needs visual review.
