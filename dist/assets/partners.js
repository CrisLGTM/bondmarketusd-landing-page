/* Deployment configuration: connect the approved portal URL before public release. */
const PARTNER_CONFIG = { registrationUrl: '', attributionKeys: ['ref', 'affiliate', 'affiliate_code', 'partner', 'partner_id', 'campaign', 'program', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] };
const attributionKey = 'bondtrader_partner_attribution_v1';
let attribution = {};
try { attribution = JSON.parse(sessionStorage.getItem(attributionKey) || '{}'); if (!attribution || typeof attribution !== 'object' || Array.isArray(attribution)) attribution = {}; } catch { attribution = {}; }
const params = new URLSearchParams(location.search);
for (const key of PARTNER_CONFIG.attributionKeys) { const value = params.get(key); if (value) attribution[key] = value.slice(0, 200); }
try { sessionStorage.setItem(attributionKey, JSON.stringify(attribution)); } catch { /* The visit remains usable when storage is blocked. */ }
const modal = document.querySelector('#application-dialog');
document.querySelectorAll('[data-apply]').forEach(button => button.addEventListener('click', () => {
  if (PARTNER_CONFIG.registrationUrl) {
    const target = new URL(PARTNER_CONFIG.registrationUrl, location.origin);
    for (const key of PARTNER_CONFIG.attributionKeys) if (typeof attribution[key] === 'string') target.searchParams.set(key, attribution[key]);
    location.assign(target.href);
  } else modal.showModal();
}));
document.querySelectorAll('.close-dialog, #dialog-done').forEach(button => button.addEventListener('click', () => modal.close()));
modal.addEventListener('click', event => { if (event.target === modal) { const rect = modal.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) modal.close(); } });
const volume = document.querySelector('#volume'), rate = document.querySelector('#rate'), output = document.querySelector('#commission');
const money = new Intl.NumberFormat('en-US', {style:'currency',currency:'USD',maximumFractionDigits:2});
function calculate() { const v=Number(volume.value), r=Number(rate.value); const valid=volume.value!=='' && rate.value!=='' && volume.validity.valid && rate.validity.valid && Number.isFinite(v) && Number.isFinite(r); output.textContent=valid?money.format(v/1000000*r):'—'; }
volume.addEventListener('input',calculate); rate.addEventListener('input',calculate);
const ideas = ['“Trading a company’s debt versus its shares.”','“My first corporate bond trade.”','“How interest-rate expectations move bond prices.”','“A bond trading challenge: what I learned.”'];
let ideaIndex=0;
document.querySelector('#next-idea').addEventListener('click',()=>{ideaIndex=(ideaIndex+1)%ideas.length;document.querySelector('#content-idea').textContent=ideas[ideaIndex];document.querySelector('#idea-status').textContent=ideas[ideaIndex];});
