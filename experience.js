const accountStep = document.querySelector('#account-step');
const detailsStep = document.querySelector('#details-step');
const nextButton = document.querySelector('#signup-next');
function setSignupStep(step, focus = true) {
  accountStep.hidden = step !== 1;
  detailsStep.hidden = step !== 2;
  const current = document.querySelector(step === 1 ? '#progress-account' : '#progress-details');
  const other = document.querySelector(step === 1 ? '#progress-details' : '#progress-account');
  current.setAttribute('aria-current', 'step');
  other.removeAttribute('aria-current');
  if (focus) document.querySelector(step === 1 ? '#signup-email' : '#first-name').focus({ preventScroll: true });
}
nextButton.addEventListener('click', () => {
  validateConfirmation(true);
  const fields = [...accountStep.querySelectorAll('input')];
  const invalid = fields.find(field => !field.checkValidity());
  if (invalid) { invalid.reportValidity(); invalid.focus(); return; }
  setSignupStep(2);
});
document.querySelector('#signup-previous').addEventListener('click', () => setSignupStep(1));
// Enter on the first step advances the preview rather than submitting hidden fields.
accountStep.addEventListener('keydown', event => {
  if (event.key === 'Enter' && event.target.tagName === 'INPUT') { event.preventDefault(); nextButton.click(); }
});
document.querySelector('#signup-again').addEventListener('click', () => setSignupStep(1));
// Account links return to step one without clearing any entered details.
document.querySelectorAll('a[href="#signup-panel"]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  document.querySelector('#signup-content').hidden = false;
  document.querySelector('#signup-complete').hidden = true;
  setSignupStep(1, false);
  document.querySelector('#signup-panel').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  document.querySelector('#signup-email').focus({ preventScroll: true });
}));
document.querySelectorAll('[data-view-markets]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  setPageView('market');
  document.querySelector('.visual').scrollIntoView({ block: 'start' });
  document.querySelector('#market-view').focus({ preventScroll: true });
}));
setSignupStep(1, false);
