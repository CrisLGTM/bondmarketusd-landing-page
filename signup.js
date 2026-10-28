// Local-only form prototype: no fetch, storage, account creation, or form navigation.
const signupForm = document.querySelector('#signup-form');
const passwordInput = document.querySelector('#signup-password');
const confirmInput = document.querySelector('#confirm-password');
const confirmationHint = document.querySelector('#confirm-hint');

// Display all ISO region options without implying jurisdiction eligibility.
const regionCodes = 'AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'.split(' ');
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
const countrySelect = document.querySelector('#signup-country');
regionCodes.map(code => ({ code, name: regionNames.of(code) })).sort((a, b) => a.name.localeCompare(b.name)).forEach(({ code, name }) => {
  const option = document.createElement('option');
  option.value = code; option.textContent = name; countrySelect.append(option);
});

function validateConfirmation(showMessage = false) {
  const mismatch = Boolean(confirmInput.value) && confirmInput.value !== passwordInput.value;
  confirmInput.setCustomValidity(mismatch ? 'Your passwords do not match.' : '');
  confirmInput.setAttribute('aria-invalid', String(mismatch && showMessage));
  confirmationHint.textContent = mismatch && showMessage ? 'Passwords do not match yet.' : '';
  confirmationHint.classList.toggle('is-error', mismatch && showMessage);
}
passwordInput.addEventListener('input', () => validateConfirmation(Boolean(confirmInput.value)));
confirmInput.addEventListener('input', () => validateConfirmation(true));
confirmInput.addEventListener('blur', () => validateConfirmation(true));
document.querySelectorAll('[data-password]').forEach(button => button.addEventListener('click', () => {
  const input = document.getElementById(button.dataset.password);
  const reveal = input.type === 'password';
  input.type = reveal ? 'text' : 'password';
  button.textContent = reveal ? 'Hide' : 'Show';
  button.setAttribute('aria-pressed', String(reveal));
  button.setAttribute('aria-label', `${reveal ? 'Hide' : 'Show'} ${input === confirmInput ? 'confirmed password' : 'password'}`);
}));

function clearForm() {
  signupForm.reset();
  document.querySelector('.signup-options').open = false;
  validateConfirmation();
  document.querySelectorAll('[data-password]').forEach(button => {
    document.getElementById(button.dataset.password).type = 'password';
    button.textContent = 'Show';
    button.setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-label', `Show ${button.dataset.password === 'confirm-password' ? 'confirmed password' : 'password'}`);
  });
}
signupForm.addEventListener('submit', event => {
  event.preventDefault();
  validateConfirmation(true);
  if (!signupForm.reportValidity()) return;
  clearForm();
  document.querySelector('#signup-content').hidden = true;
  document.querySelector('#signup-complete').hidden = false;
  document.querySelector('#complete-title').focus({ preventScroll: true });
});
document.querySelector('#signup-back').addEventListener('click', () => {
  setPageView('playground');
  document.querySelector('#artwork-view').focus({ preventScroll: true });
  document.querySelector('.visual').scrollIntoView({ behavior: 'instant', block: 'nearest' });
});
document.querySelector('#signup-again').addEventListener('click', () => {
  document.querySelector('#signup-content').hidden = false;
  document.querySelector('#signup-complete').hidden = true;
  document.querySelector('#signup-email').focus();
});
