# Bond Swap — DeFi concept

An independent local repository cloned from the approved Bond Swap prototype at commit `1e82fd7ede4653513f9127893096776644e1b9b1`.

The approved design remains on `main` at `1e82fd7ede4653513f9127893096776644e1b9b1`. This independent checkout is for the experimental `codex/defi-concept` branch.

## Preview

The signup-first revision places the existing two-step account preview in the hero, followed by the sample allocation playground and a compact FAQ. The oversized sample market table and three-column explainer have been removed. View markets opens the retained market-viewer placeholder.

Current local preview: http://127.0.0.1:4185/ (`$env:PORT='4185'; node server.cjs`). Nothing has been pushed, merged or published.

Validation: desktop and mobile widths (320, 390, 768, 1024 and 1440px), both signup steps and required fields, password confirmation, consent, referral preservation, CTA focus, preview completion, tap/drag allocation, reset, FAQ, market navigation and reduced-motion CTA behavior passed in Chrome. Desktop/mobile screenshots are included locally. Registration remains a frontend preview with no storage or account service.

The marketplace revision adds an issuer preview with explicitly fictional sample terms, bond-detail dialogs, a three-step explainer, and a secondary allocation/account section. Its responsive styling is in `marketplace.css`.

For comparison with an existing server on 4183, the current review session serves this checkout at http://127.0.0.1:4184/. The command below still uses the default port.

Run `node server.cjs`, then visit http://127.0.0.1:4183/.

Or open `index.html` directly. No installation or build step is needed. Google Fonts is optional; local font fallbacks are included.

## Direction

- Bold sans-serif typography, blue, lime, pale blue, and pink.
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

The user requested the experiment be shared as a separate branch in `CrisLGTM/bondmarketusd-landing-page`. This checkout uses a `github` remote with its default push destination restricted to `codex/defi-concept`. Do not merge or push this design into `main` unless explicitly requested. The original checkout and preview port 4173 remain separate; this concept uses port 4183.

## Checks performed

- Desktop rendering inspected in the in-app browser.
- First sign-up step and back navigation tested with dummy details.
- Tap-to-select coin allocation tested in the browser.
- Simulated checks cover password mismatch blocking, both form steps, form clearing, retry, allocation totals, reset, and view switching.
- All JavaScript files pass syntax checks.
- Mobile breakpoints are implemented; mobile rendering still needs visual review.

## Content review update

The DeFi concept now uses blue rather than purple, with BondTrader attribution retained. A native-HTML mini FAQ explains fractionalized corporate bonds, 24/7/weekend execution, USDC funding and small sizing, coupon schedules, spot/leverage/long/short/lending, and risks. Weekend execution and feature scope were confirmed by the user. Coupon and platform descriptions were informed by the supplied Partner Integration Overview and product-team Doc comments. The existing Terms and Privacy placeholders are unchanged. This is a source-code prototype; no website deployment is included.
