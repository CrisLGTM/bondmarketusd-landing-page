# BondTrader partners page

Standalone, buildless frontend handoff. Start `node server.cjs` in this folder and open http://127.0.0.1:4174/partners. The existing BondSwap page is unchanged.

`dist/index.html` is the editable page; `dist/partners/index.html` is its published route copy. Keep both in sync when changing markup. Assets are self-contained in `dist/assets`; fonts use Google Fonts with system fallbacks.

## Design and content

English partner recruitment page based on the supplied infographic, the 20 October Google Doc and all three tabs of “DORA Partner Explainer — Draft 2”. Public branding uses BondTrader per the conversation. There is one primary application CTA. The challenge is supporting content, not a competing signup destination. The infographic sits in the content-ideas section and is available to view or download. Public draft labels and the earnings/calculator section have been removed.

The hero uses a clipped view of the supplied illustration, with no added issuer logos. Market size is sourced to SIFMA 2026 ($160.7tn fixed-income securities outstanding at end-2025); this is broader-market context, not product inventory or daily volume. Unverified daily turnover, retail participation and historical comparisons are excluded. Government bonds are not advertised as live. Confirm all route-dependent features before public launch.

## 30 October partner-brief revision (local review)

Preserves the existing Manrope / DM Sans typography, mint / teal palette, hero illustration and onboarding steps. Order: hero, partner benefits, product comparison with sourced market statistic, trading-venue diagram, partner types / channels / rotating content ideas / infographic, programmes, unchanged onboarding, ten FAQs, email-first application and footer.

- The infographic now belongs to the content-ideas section, rather than the space directly after the hero.
- Challenge CTA uses the current link observed on bondtrader.io: https://app.bondtrader.io/challenge and opens a new tab.
- BondSwap and Navion use text access badges (Web3 / wallet and MT5). Venue identification is typographic pending approved logo assets. BLKBOX's DORA platform badge is intentionally omitted until its implementation is confirmed.
- No-deposit bonus is stored in an inert HTML template; it does not render or appear in the accessibility tree. Keep it inactive until qualifying requirements, geographical restrictions, terms and destination are approved. No separate cash prize is advertised.
- An unconfirmed 2027 venue-expansion promise is omitted. The growing-network wording from the supplied brief remains.
- Eligibility copy follows the supplied brief: US, UK, Canada, China, Iran and applicable OFAC sanctions restrictions. Brent must approve the complete list and final text before release. No country selector exists on this partner application; other pages' country lists were not changed.
- Page has no mockup / placeholder / review-note labels. Application is still frontend-only. Submit prevents a network request and reports that online applications are unavailable and no details were submitted; it never reports success.
- General partner privacy, agreement and legal-entity URLs are still required. Observed challenge-specific policies are not substituted for partner legal documents.
- Review locally before any source push or public deployment.

## Integration before public launch

- Become a partner links scroll to an embedded application form. Email is required; full name and website/social profile are optional. The form validates locally and submits no information. Backend integration is deferred at the user's request.
- Connect the existing registration/application API when supplied. Do not insert directly into a production partners table from browser code. Agree required fields, authentication, duplicate handling, consent, validation and response format with the backend team.
- For users who both trade and partner, use the same authenticated user identity and link a pending partner application/profile to it. Approval and commission/program assignment must be controlled by the backend, not frontend-supplied flags.
- Notifications and authenticated portal access are deferred; neither is implemented. Reuse the existing account/signup service rather than creating separate partner passwords.
- `PARTNER_CONFIG.registrationUrl` remains unset; no portal URL or API endpoint is fabricated.
- Align `attributionKeys` with the portal's actual parameter contract. The prototype preserves allowlisted parameters in session storage and forwards them once registration is configured. End-to-end attribution, consent/retention policy, portal activity and broker handoffs need integration verification.
- Confirm the infographic copy and its links and terms before public rollout.
- Confirm commission wording, available programs, platform names, product features, permitted territories and final legal/entity disclosures. No commission calculator or numerical earnings offer is included.
- Supply current challenge terms and the partner agreement/privacy URLs before public rollout. No legal document links have been fabricated.
- Confirm portal signup and approval behaviour. No application backend, authentication, analytics, payouts or portal integration is implemented.
- EN is implemented. Externalise copy to the existing site's translation system for ES/AR/UR. Arabic/Urdu and right-to-left QA remain future work; no nonfunctional language selector is shown.
- Future embedded-versus-separate signup experiments and portal Program mapping need the portal contract. The base recruitment page is separate from trader campaign pages.

## FE handoff

Move this markup and styles into the existing site's route/component system at `/partners`. Navigation to broker content currently uses the observed live `/#brokers` anchor; switch it to `/brokers` when that dedicated page exists. Configure campaign-specific content and destinations separately. No invented commission schedule or master-IB hierarchy is encoded.
