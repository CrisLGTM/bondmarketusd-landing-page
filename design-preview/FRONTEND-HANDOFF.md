# BondSwap — frontend design handoff

## Files and integration

This package is a static design reference based on the existing public landing markup. It is not the production React source. No live site changes have been made.

- `index.html`: default signup view.
- `sign-in.html`: explicit returning-user view.
- `challenge.html`: signup with challenge context above the form.
- `original.css`: current public landing styles, retaining typography/layout/breakpoints.
- `preview.css`: dark theme plus form/context styling. Load after the landing CSS when reviewing; port its values into existing production components and tokens.
- `build.cjs` and `live-snapshot.json`: rebuild all static views with `node build.cjs`; no dependencies.

Open HTML directly or serve this directory. Google Fonts needs internet; fallback is Arial. Buttons deliberately do not submit. Links between files demonstrate visual states only. Country options are a placeholder; retain the existing production country list and eligibility handling.

Do not replace the production application with these static pages. Keep existing routing, authentication, validation, password visibility controls, API connections and playground behavior. Adapt styles to the actual auth components and Tailwind tokens instead of importing unrelated application CSS or fighting its `!important` utilities.

## Entry views

| Entry | Intended view |
| --- | --- |
| General landing `/` and `/auth/sign-up` | Product introduction + Create your account |
| Explicit `/auth/sign-in` | Same shell + Welcome back login |
| Recognized challenge referral | Same signup shell + challenge context shown in `challenge.html` |

Header Sign in leads to sign-in; Create account leads to signup. Preserve existing authenticated-user routing. Agree the challenge entry URL with the challenge team; no referral tracking or switching logic is implemented here.

## Layout and content changes

Preserve header → two-column hero/form → playground → FAQ → footer and existing mobile stacking. Keep the logo, powered by attribution, DM Sans body and Space Grotesk display typography, ticket shapes, coin positions and existing spacing system.

Keep **Big bonds. / Smaller entry.**

Hero introduction: **Fund with USDC. Buy and sell fractions of corporate bonds.** Follow with **Start below $1 and trade 24/7—even on weekends.** Keep the company-debt clarification, product facts and risk note.

Remove the left-hand Create account CTA when the form is alongside it; keep View markets. The form owns the primary action: Create account on signup, Sign in on login. Keep the reciprocal sign-in/signup link below the form.

Signup order: paired First name / Last name; Email; Country of residence; Password and existing requirements; Confirm password; collapsed optional referral code; Create account; Sign in link. Preserve actual referral behavior and any required production agreements/disclosures. Their absence from this visual sample does not authorize removing them.

General challenge note: **Coming from the BondTrader Challenge? / See how rewards work ↗** below product facts. Challenge entry adds **Selected BondSwap for your reward? Create your account here, then follow your challenge instructions.** Do not promise automatic credit, timing, shared credentials or eligibility.

Keep product FAQs first; append the BondTrader relationship and challenge questions. Exact draft answers are in the HTML. Confirm the final reward process with the product owner before publishing. Maintain thin-rule accordions rather than boxed cards.

## Exact palette

| Role | Value |
| --- | --- |
| Page | `#0B1220` |
| Main text | `#EDF2FA` |
| Supporting text | `#AAB6C8` |
| Section rules | `#263246` |
| Headline emphasis / focus | `#8BAEFF` |
| Text links | `#9BB9FF` |
| Primary button / text | `#2855E8` / `#FFFFFF` |
| Primary hover | `#3564F2` |
| Brand symbol | `#3867F4` |
| Form surface / border / top edge | `#131E30` / `#2B3950` / `#4273FF` |
| Input fill / border | `#0E1828` / `#35435A` |
| Field labels / placeholders | `#DCE5F3` / `#91A0B6` |
| Playground / border | `#14213A` / `#2D4060` |
| Alphabet / NVIDIA tickets | `#B7CFFF` / `#D3CCEE` |
| Ticket text | `#14213B` |

Remaining artwork colors are specified in `preview.css`. The preview maps legacy `--lime` to pale blue for compatibility. Prefer semantic names such as `--ticket-alphabet` in production; yellow-green is no longer the action color.

## Visual details and verification

- Flat fills; no glow, gradient or heavy form shadow. Preserve existing radii and placement.
- Inputs: 46px high, 8px radius, 14px text. Labels: 12px. Form primary button: 46px high, 7px radius, 16px text.
- Keep visible focus, associated labels and existing error feedback. Check text contrast at 4.5:1 and meaningful control boundaries at 3:1.
- Keep playground keyboard/tap alternatives and reduced-motion behavior when integrating. This static package omits application JavaScript.
- Review desktop and 390px mobile: no horizontal overflow; paired name fields readable; signup follows introduction; referral collapsed initially; challenge remains secondary; FAQ follows playground.

Scope is design and content only. No authentication wiring, deposits, orders, reward claims, tracking or deployment. Use the normal production content review for product claims and challenge wording.
