/* Trading rules help-center content (source: The Asbel Funding – Complete Trading & Account Guide) */
export const ICONS={
  about:'<path d="M4 20V6l8-3 8 3v14M9 20v-5h6v5M8 9h2M14 9h2M8 12h2M14 12h2"/>',
  kyc:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6 16c.6-1.6 1.8-2 3-2s2.4.4 3 2M14 10h4M14 13h4"/>',
  one:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/>',
  two:'<circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/>',
  rules:'<path d="M12 4v16M6 20h12M5 8h14M5 8l-3 7a3 3 0 0 0 6 0zM19 8l-3 7a3 3 0 0 0 6 0z"/>',
  inf:'<path d="M12 12c-2-3-3.500-4-5.500-4a4 4 0 0 0 0 8c2 0 3.500-1 5.500-4zm0 0c2 3 3.500 4 5.500 4a4 4 0 0 0 0-8c-2 0-3.500 1-5.500 4z"/>',
  live:'<path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z"/><path d="M9.500 12l2 2 3.500-4"/>',
  pay:'<circle cx="12" cy="12" r="9"/><path d="M14.500 9.500c-.5-1-1.500-1.500-2.500-1.500-1.500 0-2.500.8-2.500 2s1 1.700 2.500 2 2.500.8 2.500 2-1 2-2.500 2c-1 0-2-.5-2.500-1.500M12 6.500V8M12 16v1.500"/>',
  soon:'<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/>'
}

const note=(t,x)=>`<div class="note"><b>${t}</b><p>${x}</p></div>`
const dd=(a)=>`<div class="dd">${a.map(([l,v,n])=>`<div><small>${l}</small><strong>${v}</strong><span>${n}</span></div>`).join('')}</div>`
const ex=(t,x)=>`<div class="note ex"><b>${t}</b><p>${x}</p></div>`

export const RULES=[
{id:'about',icon:'about',title:'About The Absel Funding',sub:'Firm overview',articles:[
 {id:'what-is',title:'What is The Absel Funding?',body:`
  <p>The Absel Funding is a broker-backed proprietary trading firm that provides traders with funded capital through a structured evaluation process. Our goal is to identify disciplined traders and allocate capital to those who demonstrate strong risk management and consistency.</p>
  <p>Unlike traditional prop firms, our model is designed to reduce unnecessary restrictions and allow traders to focus on performance.</p>
  <h3>We offer three evaluation pathways</h3>
  <ul><li>One-Step Challenge</li><li>Two-Step Challenge</li><li>Limitless Challenge</li></ul>
  <p>All challenges are manually reviewed and designed to assess trading discipline, decision-making, and capital-preservation skills before funding is granted.</p>`},
 {id:'what-makes-us-different',title:'What makes The Absel Funding different?',body:`
  <p>The Absel Funding aims to provide a simplified, trader-focused model built around:</p>
  <ul><li>Broker-backed trading infrastructure.</li><li>A static maximum drawdown model on the One-Step and Two-Step challenges.</li><li>A Limitless evaluation with no challenge-stage drawdown limits.</li><li>Manual challenge evaluation and review.</li><li>Fewer unnecessary restrictions on funded accounts, subject to applicable live-account rules.</li></ul>
  <p>Top-performing traders may be selected for an exclusive opportunity to trade directly from our physical trading office, where hedge-fund capital may be allocated to a small percentage of consistently profitable traders.</p>
  ${note('A top-tier opportunity','Only around 1% of traders reach the level required for this exclusive opportunity, according to the firm’s estimate.')}`},
 {id:'how-to-get-started',title:'How to get started',body:`
  <ol><li><b>Visit the checkout page.</b> Choose the challenge that best fits your trading style.</li>
  <li><b>Select your challenge.</b> Choose the One-Step, Two-Step, or Limitless Challenge.</li>
  <li><b>Trade according to the applicable rules.</b> Work toward the evaluation objectives while following the challenge requirements.</li>
  <li><b>Pass the challenge.</b> Once objectives are completed, the team manually reviews your account.</li>
  <li><b>Get funded and start trading.</b> After successful verification, you receive your funded account and may trade and request payouts according to the payout policy.</li></ol>`}
]},

{id:'kyc',icon:'kyc',title:'KYC (Know Your Customer)',sub:'Verification',articles:[
 {id:'why-kyc',title:'Why KYC is required',body:`
  <p>Completing the Know Your Customer (KYC) process is mandatory to maintain a secure, fair, and compliant trading environment at The Absel Funding.</p>
  <h3>1. Legal and regulatory compliance</h3>
  <p>KYC helps The Absel Funding comply with applicable international requirements designed to prevent:</p>
  <ul><li>Fraud</li><li>Money laundering</li><li>Identity misuse</li><li>Financial crime</li></ul>
  <p>By verifying identities, we help ensure that accounts belong to real and legitimate individuals.</p>
  <h3>2. Account security and protection</h3>
  <p>KYC adds a layer of security by linking trading accounts to verified personal information. This helps prevent unauthorized account access, identity theft, and account misuse. Verified information can also help resolve security issues more quickly.</p>
  <h3>3. Fair trading environment</h3>
  <ul><li>Helps prevent one individual from operating multiple accounts where prohibited.</li><li>Helps prevent duplicate or fraudulent accounts.</li><li>Supports equal evaluation conditions for all traders.</li></ul>
  <p>This protects genuine traders and helps maintain evaluation integrity.</p>
  <h3>4. Payout eligibility</h3>
  <p>KYC must be completed before a payout request can be processed. This helps ensure profits are paid to the correct account holder, withdrawals are processed securely, and disputes or delays are minimized.</p>
  ${note('Important','Payouts cannot be approved while required KYC verification is incomplete.')}`},
 {id:'kyc-documents',title:'Documents required for KYC',body:`
  <p>Traders must submit valid documents confirming their identity and residential address, where requested.</p>
  <h3>Personal identification (required)</h3>
  <p>Submit one valid government-issued photo ID. Accepted documents include:</p>
  <ul><li>Passport (preferred)</li><li>Driver’s licence</li><li>National ID card</li></ul>
  <h3>Important requirements</h3>
  <ul><li>The document must be valid and not expired.</li><li>The photo and personal details must be clear and readable.</li><li>The name on the ID must match the name on your The Absel Funding account.</li></ul>`},
 {id:'kyc-rejected',title:'What if your KYC application is rejected?',body:`
  <p>A rejected application does not automatically mean permanent disqualification. Rejections often happen because information is missing, unclear, expired, or mismatched, and can usually be corrected.</p>
  <h3>Common reasons for rejection</h3>
  <ul><li>Documents are blurry, cropped, or low quality.</li><li>Documents are expired.</li><li>The name or address does not match your account details.</li><li>Required documents are missing or incomplete.</li><li>Suspicious or altered documents are detected.</li></ul>
  <h3>What happens after rejection?</h3>
  <ol><li><b>Rejection notification.</b> You will receive an email explaining the reason for rejection and what needs to be corrected.</li><li><b>Resubmission opportunity.</b> In most cases, you can submit corrected documents. Follow the instructions, upload clear and valid documents, and ensure all details match your account information.</li></ol>
  <h3>How long does re-verification take?</h3>
  <p>Re-verification typically takes 1–2 business days. Some applications may be approved faster when corrections are clear and complete.</p>
  <h3>What if the issue cannot be resolved?</h3>
  <ul><li>Contact support to discuss alternative verification options.</li><li>Account access may remain limited until verification is completed.</li><li>Payouts and certain features may remain restricted.</li></ul>`},
 {id:'avoid-kyc-rejection',title:'How to avoid KYC rejection',body:`
  <ul><li>Upload high-quality images or scans.</li><li>Ensure documents are valid and not expired.</li><li>Double-check that names and addresses match exactly.</li><li>Submit complete documents with all corners visible.</li></ul>`}
]},

{id:'rules-and-guidelines',icon:'rules',title:'Trading Rules & Guidelines',sub:'One-Step, Two-Step & Limitless',articles:[{id:'one-step-challenge-model',title:'The Absel Funding — One-Step Challenge Model',body:`
  <p>The following rules apply to The Absel Funding One-Step Challenge model, including the relevant funded stage, unless a rule is expressly limited to a particular phase.</p>
  <h3>Maximum floating loss: funded phase only</h3>
  ${note('Phase distinction','The 2% Maximum Floating Loss rule applies only during the Funded Phase. There is no 2% Maximum Floating Loss restriction during the Challenge Phase.')}
  <p>During the Funded Phase, open trades (floating P&amp;L) must never reach or exceed a loss of 2% of the funded account balance at any moment. If floating loss reaches or exceeds this threshold, it is a hard breach and the funded account will be immediately closed, even if the position later recovers.</p>
  ${ex('Example: $100,000 funded account','2% maximum floating loss = $2,000. If open positions reach a floating loss of -$2,000 or more at any point, this results in a hard breach.')}
  <h3>Layering: hard breach</h3>
  <p>Opening more than three positions on the same instrument in the same direction simultaneously is not allowed. Adding positions to a losing trade, grid trading, or recovery-based entries may be treated as a violation. This is a hard breach during both evaluation phases.</p>
  <h3>News trading</h3>
  <p>News trading is allowed during challenge phases and the funded stage. Traders may open, close, and manage positions during high-impact news releases, economic announcements, central-bank speeches, and periods of increased market volatility. There are no timing restrictions around news events.</p>
  <p>Traders remain responsible for managing risk during volatile market conditions. Slippage, spreads, and rapid price movements may occur. Standard account rules, including applicable drawdown limits, continue to apply.</p>
  <h3>Weekend holding: prior approval required</h3>
  <p>Weekend holding is allowed in both challenge and funded phases, provided the trader obtains prior approval.</p>
  <ul><li>Before the market closes on Friday, email support or contact live support to inform the team that positions will remain open over the weekend.</li><li>Positions may remain open beyond Friday’s market close and may be managed when the market reopens, provided approval has been granted.</li><li>Failure to notify support before the Friday market close will result in a hard breach and account termination, according to the supplied policy.</li></ul>
  ${note('Important considerations','Markets may open with price gaps after the weekend. Slippage and increased volatility can occur at market open. The 10% maximum static drawdown rule continues to apply. Manage risk carefully when holding positions over the weekend.')}
  <h3>Tick scalping</h3>
  <p>Tick scalping refers to extremely fast trades intended to capture very small price movements, such as:</p>
  <ul><li>Opening and closing trades within 120 seconds.</li><li>High-frequency micro-scalping.</li></ul>
  <p>Up to 20% of total trades may be ignored. Trades beyond that allowance may be reviewed.</p>
  <h3>Challenge structure</h3>
  <ul><li>Achieve an 8% profit target.</li><li>Follow all trading rules and respect the applicable drawdown rules.</li><li>After achieving the profit target, the account enters a 24-hour trading-behaviour review. Once approved, the trader proceeds to the funded stage.</li></ul>`},

 {id:'two-step-challenge-model',title:'The Absel Funding — Two-Step Challenge Model',body:`
  <p>The following rules apply to The Absel Funding Two-Step Challenge model, including the relevant funded stage, unless a rule is expressly limited to a particular phase.</p>
  <h3>Maximum floating loss: funded phase only</h3>
  ${note('Phase distinction','The 2% Maximum Floating Loss rule applies only during the Funded Phase. There is no 2% Maximum Floating Loss restriction during the Challenge Phase.')}
  <p>During the Funded Phase, open trades (floating P&amp;L) must never reach or exceed a loss of 2% of the funded account balance at any moment. If floating loss reaches or exceeds this threshold, it is a hard breach and the funded account will be immediately closed, even if the position later recovers.</p>
  ${ex('Example: $100,000 funded account','2% maximum floating loss = $2,000. If open positions reach a floating loss of -$2,000 or more at any point, this results in a hard breach.')}
  <h3>Layering: hard breach</h3>
  <p>Opening more than three positions on the same instrument in the same direction simultaneously is not allowed. Adding positions to a losing trade, grid trading, or recovery-based entries may be treated as a violation. This is a hard breach during both evaluation phases.</p>
  <h3>News trading</h3>
  <p>News trading is allowed during challenge phases and the funded stage. Traders may open, close, and manage positions during high-impact news releases, economic announcements, central-bank speeches, and periods of increased market volatility. There are no timing restrictions around news events.</p>
  <p>Traders remain responsible for managing risk during volatile market conditions. Slippage, spreads, and rapid price movements may occur. Standard account rules, including applicable drawdown limits, continue to apply.</p>
  <h3>Weekend holding: prior approval required</h3>
  <p>Weekend holding is allowed in both challenge and funded phases, provided the trader obtains prior approval.</p>
  <ul><li>Before the market closes on Friday, email support or contact live support to inform the team that positions will remain open over the weekend.</li><li>Positions may remain open beyond Friday’s market close and may be managed when the market reopens, provided approval has been granted.</li><li>Failure to notify support before the Friday market close will result in a hard breach and account termination, according to the supplied policy.</li></ul>
  ${note('Important considerations','Markets may open with price gaps after the weekend. Slippage and increased volatility can occur at market open. The 10% maximum static drawdown rule continues to apply. Manage risk carefully when holding positions over the weekend.')}
  <h3>Tick scalping</h3>
  <p>Tick scalping refers to extremely fast trades intended to capture very small price movements, such as:</p>
  <ul><li>Opening and closing trades within 120 seconds.</li><li>High-frequency micro-scalping.</li></ul>
  <p>Up to 20% of total trades may be ignored. Trades beyond that allowance may be reviewed.</p>
  <h3>Challenge structure</h3>
  <p>Traders must successfully complete both phases to qualify for a funded account.</p>
  <ul><li><b>Phase 1: Performance evaluation.</b> Achieve an 8% profit target, follow all trading rules and respect the maximum drawdown rules. After completing Phase 1, the account enters a 24-hour review period. Once approved, the trader advances to Phase 2.</li><li><b>Phase 2: Verification.</b> Achieve a 5% profit target and continue following all trading rules. After Phase 2, the account undergoes another 24-hour review before funding.</li></ul>`},

 {id:'limitless-challenge-model',title:'The Absel Funding — Limitless Challenge Model',body:`
  <p>The following rules apply to the Limitless model’s live funded account.</p>
  <h3>Maximum floating loss: funded stage</h3>
  <p>During the Funded Stage, a maximum floating-loss rule is enforced. Open trades (floating P&amp;L) must not exceed a loss of 2% of the funded account balance at any moment. Two positions running at the same time will be considered as a single trade.</p>
  <p>If the floating loss reaches or goes beyond the stated threshold, it is a hard breach and the account will be immediately closed, even if the trade later recovers.</p>
  ${ex('Example: $100,000 funded account','2% maximum floating loss = $2,000. If open positions show a floating loss of -$2,000 or more at any point, this results in a hard breach.')}
  <h3>Layering: hard breach</h3>
  <p>Opening more than three positions on the same instrument in the same direction simultaneously is not allowed. Adding positions to a losing trade, grid trading, or recovery-based entries may be treated as a violation. This is a hard breach.</p>
  <h3>News trading</h3>
  <p>News trading is fully allowed during both challenge phases and the funded stage. Traders may open, close, and manage positions during:</p>
  <ul><li>High-impact news releases.</li><li>Economic announcements.</li><li>Central-bank speeches.</li><li>Periods of increased market volatility.</li></ul>
  <p>There are no timing restrictions around news events. Traders remain responsible for managing their own risk during volatile market conditions. Slippage, spreads, and rapid price movements may occur during news releases. Standard account rules, including the maximum drawdown rule, continue to apply.</p>
  <h3>Tick scalping</h3>
  <p>Tick scalping refers to extremely fast trades intended to capture micro-movements, including:</p>
  <ul><li>Opening and closing trades within 120 seconds.</li><li>High-frequency micro-scalping.</li></ul>
  <p>Up to 20% of total trades may be ignored. Trades beyond that allowance may be reviewed.</p>
  <h3>Challenge structure</h3>
  <p>The Limitless Challenge has one evaluation phase, a 10% profit target, no time limit, and no daily or maximum drawdown limit during the evaluation. Once funded, the live-account rules above apply.</p>`}
]},

{id:'drawdown-rules',icon:'rules',title:'Drawdown Rules',sub:'Daily and maximum drawdown limits',articles:[
 {id:'one-step-drawdown-rules',title:'The Absel Funding — One-Step Drawdown Rules',body:`
  <p>The following drawdown rules apply to The Absel Funding One-Step Challenge model, including the relevant funded stage.</p>

  ${dd([['Maximum drawdown','10%','Static · of initial account size'],['Daily drawdown','6%','Subject to official daily calculation']])}
  <ul><li><b>Maximum drawdown:</b> 10% of the initial account size (static). The 10% maximum static drawdown rule applies at all times, including when positions are held over the weekend.</li><li><b>Daily drawdown:</b> 6%.</li></ul>
  ${ex('Example: $100,000 account','Maximum loss allowance: $10,000. The account balance or equity must not fall below $90,000. A 6% daily loss allowance equals $6,000, subject to the firm’s official daily calculation and reset method.')}`},

 {id:'two-step-drawdown-rules',title:'The Absel Funding — Two-Step Drawdown Rules',body:`
  <p>The following drawdown rules apply to The Absel Funding Two-Step Challenge model, including the relevant funded stage.</p>

  ${dd([['Maximum drawdown','10%','Static · of initial account size'],['Daily drawdown','5%','Subject to official daily calculation']])}
  <ul><li><b>Maximum drawdown:</b> 10% of the initial account size (static). The 10% maximum static drawdown rule applies at all times, including when positions are held over the weekend.</li><li><b>Daily drawdown:</b> 5%.</li></ul>
  ${ex('Example: $100,000 account','Maximum loss allowance: $10,000, meaning balance or equity must not fall below $90,000. A 5% daily loss allowance equals $5,000, subject to the firm’s official daily calculation and reset method.')}`},

 {id:'limitless-drawdown-rules',title:'The Absel Funding — Limitless Drawdown Rules',body:`
  <p>The following drawdown rules apply to the Limitless model’s live funded account.</p>

  ${dd([['Maximum daily drawdown','5%','Live account · equity based'],['Maximum drawdown','10%','Live account · equity based']])}
  <h3>Maximum daily drawdown: 5%</h3>
  <p>If account equity falls below the permitted daily drawdown threshold at any time, the account will be considered breached and will be terminated.</p>
  ${ex('Example: $100,000 account','5% daily drawdown = $5,000.')}
  <h3>Maximum drawdown: 10%</h3>
  <p>If account equity falls below the permitted maximum drawdown threshold at any time, the account will be considered breached and will be terminated.</p>
  ${ex('Example: $100,000 account','10% maximum drawdown = $10,000.')}`}
]}
]
