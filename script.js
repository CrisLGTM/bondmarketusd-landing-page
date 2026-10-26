const dialog = document.querySelector('#preview-dialog');
const content = {
  trade: ['Your next move starts here.', 'This is the first design preview. The trading destination will be connected once the brand and onboarding journey are confirmed.'],
  how: ['Big bonds. Smaller pieces.', 'Companies issue bonds to borrow money. Fractionalization breaks a bond into smaller units, making smaller trades possible. A coupon is the bond’s stated interest payment; maturity is when repayment is due under its terms. Prices can fall, and issuers can default. The rights and payments attached to each product depend on its terms.'],
  about: ['A first point of view.', 'BondMarket is a retail trading concept for bondmarket.app. This preview explores the layout, colors, motion, and action hierarchy. The artwork is illustrative; product details and destinations are still to be confirmed.']
};
document.querySelectorAll('[data-dialog]').forEach(button => button.addEventListener('click', () => {
  const [title, copy] = content[button.dataset.dialog];
  document.querySelector('#dialog-title').textContent = title;
  document.querySelector('#dialog-copy').textContent = copy;
  dialog.showModal();
}));
const artworkView = document.querySelector('#artwork-view');
const marketView = document.querySelector('#market-view');
function setMarketView(showMarket) {
  document.querySelector('#artwork-pane').hidden = showMarket;
  document.querySelector('#market-viewer').hidden = !showMarket;
  document.querySelector('#motion-toggle').hidden = showMarket;
  artworkView.setAttribute('aria-pressed', String(!showMarket));
  marketView.setAttribute('aria-pressed', String(showMarket));
  document.querySelector('.visual').classList.toggle('showing-market', showMarket);
}
artworkView.addEventListener('click', () => setMarketView(false));
marketView.addEventListener('click', () => setMarketView(true));
document.querySelector('#browse-markets').addEventListener('click', () => {
  setMarketView(true);
  marketView.focus({ preventScroll: true });
  document.querySelector('.visual').scrollIntoView({ behavior: 'instant', block: 'nearest' });
});
document.querySelectorAll('.dialog-close, .dialog-done').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => { if (event.target === dialog && (event.clientX < dialog.getBoundingClientRect().left || event.clientX > dialog.getBoundingClientRect().right || event.clientY < dialog.getBoundingClientRect().top || event.clientY > dialog.getBoundingClientRect().bottom)) dialog.close(); });
const visual = document.querySelector('.visual');
const toggle = document.querySelector('#motion-toggle');
toggle.addEventListener('click', () => {
  const paused = visual.classList.toggle('paused');
  toggle.setAttribute('aria-pressed', String(paused));
  toggle.setAttribute('aria-label', paused ? 'Resume animation' : 'Pause animation');
  toggle.textContent = paused ? '▶' : 'Ⅱ';
});

const allocations = { alphabet: 0, nvidia: 0 };
const coins = [...document.querySelectorAll('[data-cents]')];
const certificates = [...document.querySelectorAll('[data-bond]')];
const objects = [...document.querySelectorAll('.art-object')];
const positions = new Map(objects.map(object => [object, { x: 0, y: 0 }]));
let selectedCoin = null;
const formatAmount = cents => `${(cents / 100).toFixed(2)} USDC`;
const announce = message => { document.querySelector('#demo-status').textContent = message; };

function selectCoin(coin) {
  selectedCoin = coin;
  coins.forEach(item => item.setAttribute('aria-pressed', String(item === coin)));
  certificates.forEach(item => item.classList.toggle('awaiting-coin', Boolean(coin)));
  document.querySelector('#demo-instruction').textContent = coin
    ? `${formatAmount(Number(coin.dataset.cents))} selected. Choose a bond.`
    : 'Drag a USDC coin onto either bond. Or tap a coin, then tap a bond. Move objects anywhere.';
}
function renderBasket() {
  Object.entries(allocations).forEach(([issuer, cents]) => {
    document.querySelectorAll(`[data-amount="${issuer}"]`).forEach(label => { label.textContent = formatAmount(cents); });
  });
  const total = allocations.alphabet + allocations.nvidia;
  document.querySelector('#sample-total').textContent = formatAmount(total);
  document.querySelector('#sample-basket').hidden = total === 0;
  visual.classList.toggle('has-allocation', total > 0);
}
function allocate(coin, certificate) {
  const issuer = certificate.dataset.bond;
  const cents = Number(coin.dataset.cents);
  allocations[issuer] += cents;
  renderBasket();
  selectCoin(null);
  certificate.classList.remove('received');
  void certificate.offsetWidth;
  certificate.classList.add('received');
  announce(`${formatAmount(cents)} added to the ${issuer === 'alphabet' ? 'Alphabet' : 'NVIDIA'} sample. Total ${formatAmount(allocations.alphabet + allocations.nvidia)}. No order placed.`);
}
function setPosition(object, x, y) {
  const position = positions.get(object);
  position.x = x; position.y = y;
  object.style.setProperty('--dx', `${x}px`);
  object.style.setProperty('--dy', `${y}px`);
}
objects.forEach(object => {
  let startX = 0, startY = 0, originX = 0, originY = 0, moved = false, suppressClick = false;
  object.addEventListener('pointerdown', event => {
    if (event.button !== 0 || !event.isPrimary) return;
    startX = event.clientX; startY = event.clientY;
    const position = positions.get(object);
    originX = position.x; originY = position.y; moved = false;
    object.setPointerCapture(event.pointerId);
  });
  object.addEventListener('pointermove', event => {
    if (!object.hasPointerCapture(event.pointerId)) return;
    if (Math.hypot(event.clientX - startX, event.clientY - startY) > 6) moved = true;
    if (!moved) return;
    object.classList.add('dragging');
    setPosition(object, originX + event.clientX - startX, originY + event.clientY - startY);
    object.classList.add('repositioned');
    certificates.forEach(card => {
      const rect = card.getBoundingClientRect();
      card.classList.toggle('drop-hover', Boolean(object.dataset.cents) && event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom);
    });
  });
  object.addEventListener('pointerup', event => {
    if (!object.hasPointerCapture(event.pointerId)) return;
    object.releasePointerCapture(event.pointerId);
    if (moved) {
      suppressClick = true;
      setTimeout(() => { suppressClick = false; }, 0);
      const target = object.dataset.cents && certificates.find(card => {
        const rect = card.getBoundingClientRect();
        return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      });
      if (target) { allocate(object, target); setPosition(object, 0, 0); }
    }
    object.classList.remove('dragging');
    certificates.forEach(card => card.classList.remove('drop-hover'));
  });
  object.addEventListener('pointercancel', () => {
    setPosition(object, originX, originY);
    object.classList.remove('dragging');
    certificates.forEach(card => card.classList.remove('drop-hover'));
  });
  object.addEventListener('click', () => {
    if (suppressClick) return;
    if (object.dataset.cents) {
      selectCoin(selectedCoin === object ? null : object);
      if (selectedCoin) announce(`${formatAmount(Number(object.dataset.cents))} selected. Choose Alphabet or NVIDIA.`);
    } else if (selectedCoin) allocate(selectedCoin, object);
    else announce('Choose a USDC coin first, then select this bond.');
  });
  object.addEventListener('keydown', event => {
    const steps = { ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, -12], ArrowDown: [0, 12] };
    if (steps[event.key]) {
      event.preventDefault();
      const { x, y } = positions.get(object);
      setPosition(object, x + steps[event.key][0], y + steps[event.key][1]);
      object.classList.add('repositioned');
    }
    if (event.key === 'Home') { event.preventDefault(); setPosition(object, 0, 0); }
    if (event.key === 'Escape') selectCoin(null);
  });
});
function resetPositions() { objects.forEach(object => { setPosition(object, 0, 0); object.classList.remove('repositioned'); }); }
document.querySelector('#reset-positions').addEventListener('click', resetPositions);
document.querySelector('#reset-demo').addEventListener('click', () => {
  allocations.alphabet = 0; allocations.nvidia = 0;
  selectCoin(null); renderBasket(); resetPositions();
  coins[0].focus({ preventScroll: true });
  announce('Sample basket reset.');
});
window.addEventListener('resize', resetPositions);
