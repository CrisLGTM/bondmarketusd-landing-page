/* Deployment configuration: connect the approved portal URL before public release. */
const PARTNER_CONFIG = { registrationUrl: '', attributionKeys: ['ref', 'affiliate', 'affiliate_code', 'partner', 'partner_id', 'campaign', 'program', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] };
const attributionKey = 'bondtrader_partner_attribution_v1';
let attribution = {};
try { attribution = JSON.parse(sessionStorage.getItem(attributionKey) || '{}'); if (!attribution || typeof attribution !== 'object' || Array.isArray(attribution)) attribution = {}; } catch { attribution = {}; }
const params = new URLSearchParams(location.search);
for (const key of PARTNER_CONFIG.attributionKeys) { const value = params.get(key); if (value) attribution[key] = value.slice(0, 200); }
try { sessionStorage.setItem(attributionKey, JSON.stringify(attribution)); } catch { /* The visit remains usable when storage is blocked. */ }

// Frontend-only application until the existing user/partner registration API is supplied.
// No database write, account creation, notifications, or portal redirect occurs here.
const applicationForm = document.querySelector('#partner-application');
const applicationStatus = document.querySelector('#application-status');
applicationForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!applicationForm.reportValidity()) return;
  applicationStatus.textContent = 'Online applications are currently unavailable. Your details have not been submitted.';
});
applicationForm.addEventListener('input', () => { applicationStatus.textContent = ''; });
const ideas = ['“Trading a company’s debt versus its shares.”','“My first corporate bond trade.”','“How interest-rate expectations move bond prices.”','“A bond trading challenge: what I learned.”'];
let ideaIndex=0;
document.querySelector('#next-idea').addEventListener('click',()=>{ideaIndex=(ideaIndex+1)%ideas.length;document.querySelector('#content-idea').textContent=ideas[ideaIndex];document.querySelector('#idea-status').textContent=ideas[ideaIndex];});
