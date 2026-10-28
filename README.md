# BondTrader partners page

Standalone, buildless frontend handoff. Start `node server.cjs` in this folder and open http://127.0.0.1:4174/partners. The existing BondSwap page is unchanged.

`dist/index.html` is the editable page; `dist/partners/index.html` is its published route copy. Keep both in sync when changing markup. Assets are self-contained in `dist/assets`; fonts use Google Fonts with system fallbacks.

## Design and content

English partner recruitment page based on the supplied infographic, the 20 October Google Doc and all three tabs of “DORA Partner Explainer — Draft 2”. Public branding uses BondTrader per the conversation. There is one primary application CTA. The challenge is supporting content, not a competing signup destination. The infographic is labelled a review draft and is available to view or download.

The hero uses a clipped view of the supplied illustration, with no added issuer logos. Market size is sourced to SIFMA 2026 ($160.7tn fixed-income securities outstanding at end-2025); this is broader-market context, not product inventory or daily volume. Unverified daily turnover, retail participation and historical comparisons are excluded. Government bonds are not advertised as live. Confirm all route-dependent features before public launch.

## Integration before public launch

- Set `PARTNER_CONFIG.registrationUrl` in `dist/assets/partners.js` to the approved partner portal registration URL. Currently Apply opens an honest preview notice and submits no information.
- Align `attributionKeys` with the portal's actual parameter contract. The prototype preserves allowlisted parameters in session storage and forwards them once registration is configured. End-to-end attribution, consent/retention policy, portal activity and broker handoffs need integration verification.
- Replace or approve the draft infographic, removing its registration placeholder and updating links and terms.
- Confirm commission wording, available programs, platform names, product features, permitted territories and final legal/entity disclosures. The calculator has no assumed commission rate; visitors supply their own agreed USD-per-$1m rate. No earnings are promised.
- Supply current challenge terms and the partner agreement/privacy URLs before public rollout. No legal document links have been fabricated.
- Confirm portal signup and approval behaviour. No application backend, authentication, analytics, payouts or portal integration is implemented.
- EN is implemented. Externalise copy to the existing site's translation system for ES/AR/UR. Arabic/Urdu and right-to-left QA remain future work; no nonfunctional language selector is shown.
- Future embedded-versus-separate signup experiments and portal Program mapping need the portal contract. The base recruitment page is separate from trader campaign pages.

## FE handoff

Move this markup and styles into the existing site's route/component system at `/partners`. Navigation to broker content currently uses the observed live `/#brokers` anchor; switch it to `/brokers` when that dedicated page exists. Configure campaign-specific content and destinations separately. No invented commission schedule or master-IB hierarchy is encoded.
