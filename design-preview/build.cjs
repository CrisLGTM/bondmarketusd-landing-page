const fs = require('node:fs');
const path = require('node:path');
const snapshot = JSON.parse(fs.readFileSync(path.join(__dirname,'live-snapshot.json'),'utf8'));
const field=(id,label,type,placeholder,autocomplete)=>`<label for="${id}">${label}</label><div class="preview-input"><input id="${id}" type="${type}" placeholder="${placeholder}" autocomplete="${autocomplete}"></div>`;
const login=`<div class="preview-form">${field('email','Email','email','Enter email','email')}${field('password','Password','password','Enter password','current-password')}<button type="button" class="preview-submit">Sign in</button></div><button type="button" class="bondswap-recover-link">Forgot password?</button><p class="bondswap-auth-switch">New here? <a href="index.html">Create an account</a></p>`;
const signup=`<div class="preview-form"><div class="preview-name-row"><div>${field('first-name','First name','text','First name','given-name')}</div><div>${field('last-name','Last name','text','Last name','family-name')}</div></div>${field('email','Email','email','you@example.com','email')}<label for="country">Country of residence</label><div class="preview-input"><select id="country" autocomplete="country-name"><option value="">Select country</option></select></div>${field('password','Password','password','Create a password','new-password')}<p class="password-hint">8+ characters · 1 letter · 1 number · 1 special character</p>${field('confirm-password','Confirm password','password','Confirm your password','new-password')}<details class="referral-details"><summary>Add a referral code <span>(optional)</span></summary>${field('referral','Referral code','text','Enter your affiliate’s code','off')}<p>Added when your account is created; cannot be changed later.</p></details><button type="button" class="preview-submit">Create account ↗</button></div><p class="bondswap-auth-switch">Already have an account? <a href="sign-in.html">Sign in</a></p>`;
const extraFaq=`<details name="bond-faq"><summary>How is BondSwap connected to BondTrader?<span aria-hidden="true">+</span></summary><div class="faq-answer"><p>BondSwap is a bond trading venue powered by BondTrader. Fund your account with USDC to buy and sell fractions of corporate bonds.</p></div></details><details name="bond-faq" id="challenge-faq"><summary>Coming from the BondTrader Challenge?<span aria-hidden="true">+</span></summary><div class="faq-answer"><p>If you selected BondSwap as your reward venue, create a BondSwap account. Check your BondTrader Challenge instructions for the steps to receive your reward here.</p></div></details>`;
for(const mode of ['signup','signin','challenge']){
 let html=snapshot.html;
 const start=html.indexOf('<div class="bondswap-signup">');
 const end=html.indexOf('</section></section>',start);
 if(start<0||end<0)throw new Error('Inspect captured auth markup before rebuilding.');
 html=html.slice(0,start)+(mode==='signin'?login:signup)+html.slice(end);
 if(mode!=='signin')html=html.replace('Welcome back.','Create your account.').replace('Sign in to your Bondswap account.','Fund with USDC. Explore the bond market.');
 if(mode==='challenge')html=html.replace('<div class="signup-heading">','<p class="challenge-context">BONDTRADER CHALLENGE</p><p class="challenge-description">Selected BondSwap for your reward? Create your account here, then follow your challenge instructions.</p><div class="signup-heading">');
 html=html.replace(/<a class="primary-action"[^>]*>[\s\S]*?<\/a>/,'');
 html=html.replace('<p class="hero-risk">Smaller positions. Same investment risks.</p>','<p class="hero-risk">Smaller positions. Same investment risks.</p><p class="challenge-note">Coming from the BondTrader Challenge?<br><a href="#challenge-faq">See how rewards work ↗</a></p>');
 html=html.replace(/<p class="market-intro">[\s\S]*?<\/p>/,'<p class="market-intro">Fund with USDC. Buy and sell fractions of corporate bonds.<br>Start below $1 and trade 24/7—even on weekends.</p>');
 html=html.replace('</div></section><footer>',extraFaq+'</div></section><footer>');
 html=html.replace('<button type="button" class="signin-link">Sign in</button>','<a class="signin-link" href="sign-in.html">Sign in</a>');
 html=html.replace('<button type="button" class="account-link">Create account ↗</button>','<a class="account-link" href="index.html#signup-panel">Create account ↗</a>');
 html=html.replace(/<img[^>]*>/g,'');
 const filename=mode==='signup'?'index.html':mode==='signin'?'sign-in.html':'challenge.html';
 fs.writeFileSync(path.join(__dirname,filename),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#0b1220"><title>BondSwap — ${mode} design preview</title><link rel="stylesheet" href="original.css"><link rel="stylesheet" href="preview.css"></head><body>${html}</body></html>`);
}
console.log('Built signup, sign-in and challenge design views.');
