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

const FLOAT=`<h3>Floating loss rule</h3>
  <p>To manage risk, your floating loss must stay within the limits below:</p>
  <ul><li><b>Single trade:</b> The floating loss on any one trade must not exceed 1% of your account capital.</li><li><b>Multiple open trades:</b> If you have more than one trade open, the combined floating loss across those trades must not exceed 2% of your account capital.</li></ul>
  <p>Exceeding either applicable limit will result in an account breach.</p>`
const WEEKEND=`<h3>Yes — Weekend Holding Is Allowed (With Prior Approval)</h3>
  <ul><li>Traders are permitted to hold positions over the weekend in both challenge and funded phases, but prior approval is required.</li><li>To hold trades over the weekend, traders must email support / contact us for live support before the market closes on Friday informing the team that positions will remain open.</li><li>Failure to notify support before the Friday market close will result in a hard breach and account termination.</li><li>You may keep trades open beyond the market close on Friday and continue managing them when the market reopens, provided approval has been granted.</li></ul>`
const SPLIT=`<ul><li><b>1-Step &amp; 2-Step Accounts:</b> First payout 80%, Second payout 85%, Third payout and thereafter 90% lifetime.</li><li><b>Limitless Account:</b> First payout 60%, Second payout 70%, Third payout and thereafter 90% lifetime.</li></ul>`
const FREQ=`<ul><li><b>1-Step &amp; 2-Step Accounts:</b> Payouts are available every 12 days.</li><li><b>Limitless Account:</b> Payouts are available every 18 days. (12 days with the applicable add-on)</li></ul>`

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
  ${FLOAT}
  <h3>Layering: hard breach</h3>
  <p>Opening more than three positions on the same instrument in the same direction simultaneously is not allowed. Adding positions to a losing trade, grid trading, or recovery-based entries may be treated as a violation. This is a hard breach during both evaluation phases.</p>
  <h3>News trading</h3>
  <p>News trading is allowed during challenge phases and the funded stage. Traders may open, close, and manage positions during high-impact news releases, economic announcements, central-bank speeches, and periods of increased market volatility. There are no timing restrictions around news events.</p>
  <p>Traders remain responsible for managing risk during volatile market conditions. Slippage, spreads, and rapid price movements may occur. Standard account rules, including applicable drawdown limits, continue to apply.</p>
  <h3>Tick scalping</h3>
  <p>Tick scalping refers to extremely fast trades intended to capture very small price movements, such as:</p>
  <ul><li>Opening and closing trades within 120 seconds.</li><li>High-frequency micro-scalping.</li></ul>
  <h3>Challenge structure</h3>
  <ul><li>Achieve a 9% profit target.</li><li>Follow all trading rules and respect the applicable drawdown rules.</li><li>After achieving the profit target, the account enters a 24-hour trading-behaviour review. Once approved, the trader proceeds to the funded stage.</li></ul>
  <h3>Minimum trading days</h3>
  <p>The minimum trading days are 6 days.</p>`},

 {id:'two-step-challenge-model',title:'The Absel Funding — Two-Step Challenge Model',body:`
  <p>The following rules apply to The Absel Funding Two-Step Challenge model, including the relevant funded stage, unless a rule is expressly limited to a particular phase.</p>
  ${FLOAT}
  <h3>Layering: hard breach</h3>
  <p>Opening more than three positions on the same instrument in the same direction simultaneously is not allowed. Adding positions to a losing trade, grid trading, or recovery-based entries may be treated as a violation. This is a hard breach during both evaluation phases.</p>
  <h3>News trading</h3>
  <p>News trading is allowed during challenge phases and the funded stage. Traders may open, close, and manage positions during high-impact news releases, economic announcements, central-bank speeches, and periods of increased market volatility. There are no timing restrictions around news events.</p>
  <p>Traders remain responsible for managing risk during volatile market conditions. Slippage, spreads, and rapid price movements may occur. Standard account rules, including applicable drawdown limits, continue to apply.</p>
  <h3>Tick scalping</h3>
  <p>Tick scalping refers to extremely fast trades intended to capture very small price movements, such as:</p>
  <ul><li>Opening and closing trades within 120 seconds.</li><li>High-frequency micro-scalping.</li></ul>
  <h3>Challenge structure</h3>
  <p>Traders must successfully complete both phases to qualify for a funded account.</p>
  <ul><li><b>Phase 1: Performance evaluation.</b> Achieve an 8% profit target, follow all trading rules and respect the maximum drawdown rules. After completing Phase 1, the account enters a 24-hour review period. Once approved, the trader advances to Phase 2.</li><li><b>Phase 2: Verification.</b> Achieve a 5% profit target and continue following all trading rules. After Phase 2, the account undergoes another 24-hour review before funding.</li></ul>
  <h3>Minimum trading days</h3>
  <p>The minimum trading days are 6 days.</p>`},

 {id:'limitless-challenge-model',title:'The Absel Funding — Limitless Challenge Model',body:`
  <p>The following rules apply to the Limitless model’s live funded account.</p>
  ${FLOAT}
  <h3>Layering: hard breach</h3>
  <p>Opening more than three positions on the same instrument in the same direction simultaneously is not allowed. Adding positions to a losing trade, grid trading, or recovery-based entries may be treated as a violation. This is a hard breach.</p>
  <h3>News trading</h3>
  <p>News trading is fully allowed during both challenge phases and the funded stage. Traders may open, close, and manage positions during:</p>
  <ul><li>High-impact news releases.</li><li>Economic announcements.</li><li>Central-bank speeches.</li><li>Periods of increased market volatility.</li></ul>
  <p>There are no timing restrictions around news events. Traders remain responsible for managing their own risk during volatile market conditions. Slippage, spreads, and rapid price movements may occur during news releases. Standard account rules continue to apply.</p>
  <h3>Minimum Trading Days Policy</h3>
  <p>A trading day will only count towards your minimum trading days requirement if you achieve at least 0.3% profit of your initial account balance on that trading day.</p>
  <p>If your profit is below 0.3%, that day will not be counted as a valid trading day.</p>
  <div class="note ex"><b>Example</b><p>For a $10,000 trading account:</p><ul><li>0.3% profit = $30</li><li>Profit of $30 or more in a day = 1 valid trading day</li><li>Profit of $20 in a day = Not counted</li><li>Profit of $0 or a loss = Not counted</li></ul></div>
  ${note('Important','You must generate at least 0.3% profit in a single trading day for it to qualify towards your minimum trading days requirement.')}
  <p>Minimum trading days are 10 days (with add-on 6 days).</p>
  <h3>Tick scalping</h3>
  <p>Tick scalping refers to extremely fast trades intended to capture micro-movements, including:</p>
  <ul><li>Opening and closing trades within 120 seconds.</li><li>High-frequency micro-scalping.</li></ul>
  <h3>Consistency rule</h3>
  <p>The 20% Consistency Rule ensures that traders generate profits consistently rather than relying on one exceptionally profitable trade or one highly profitable trading day.</p>
  <p><b>Rule:</b> No single trade and no single trading day can contribute more than 20% of your total requested payout.</p>
  <h4>1. Understanding the 20% Rule</h4>
  <p>Suppose you want to request a payout of $1,000.</p>
  <p>20% of $1,000 = $200.</p>
  <p>This means:</p>
  <ul><li>Your profit from any single trade must not exceed $200.</li><li>Your total profit from any single trading day must not exceed $200.</li><li>You must distribute your profits across multiple trades and trading days.</li></ul>
  <h3>Big loss / big win rule</h3>
  <p>Before requesting a payout, your biggest winning trade must be greater than your biggest losing trade. In other words, your largest single-trade profit must exceed the amount of your largest single-trade loss.</p>
  ${ex('Example','If your biggest loss on a single trade is $200, you must record a winning trade of more than $200 on a single trade before requesting a payout. A $200 winning trade would not be enough; the winning amount must be greater than $200.')}
  ${note('Important','These rules are a simplified guide for clarity. Where a rule depends on account type, add-on selection or the firm’s official terms, the applicable account agreement and dashboard conditions take precedence.')}
  <h3>Challenge structure</h3>
  <p>The Limitless Challenge has one evaluation phase, a 10% profit target, no time limit, and no daily or maximum drawdown limit during the evaluation. Once funded, the live-account rules above apply.</p>`},
]},

{id:'weekend-holding',icon:'live',title:'Weekend Holding',sub:'Holding positions over the weekend',articles:[
 {id:'weekend-holding',title:'Weekend Holding',body:`
  ${WEEKEND}
  ${note('Important considerations','Markets may open with price gaps after the weekend. Slippage and increased volatility can occur at market open. The maximum static drawdown rule (8% on One-Step, 10% on Two-Step) continues to apply. Manage risk carefully when holding positions over the weekend.')}`}
]},

{id:'drawdown-rules',icon:'rules',title:'Drawdown Rules',sub:'Daily and maximum drawdown limits',articles:[
 {id:'one-step-drawdown-rules',title:'The Absel Funding — One-Step Drawdown Rules',body:`
  <p>The following drawdown rules apply to The Absel Funding One-Step Challenge model, including the relevant funded stage.</p>

  ${dd([['Maximum drawdown','8%','Static · of initial account size'],['Daily drawdown','4%','Subject to official daily calculation']])}
  <ul><li><b>Maximum drawdown:</b> 8% of the initial account size (static). The 8% maximum static drawdown rule applies at all times, including when positions are held over the weekend.</li><li><b>Daily drawdown:</b> 4%.</li></ul>
  ${ex('Example: $100,000 account','Maximum loss allowance: $8,000. The account balance or equity must not fall below $92,000. A 4% daily loss allowance equals $4,000, subject to the firm’s official daily calculation and reset method.')}`},

 {id:'two-step-drawdown-rules',title:'The Absel Funding — Two-Step Drawdown Rules',body:`
  <p>The following drawdown rules apply to The Absel Funding Two-Step Challenge model, including the relevant funded stage.</p>

  ${dd([['Maximum drawdown','10%','Static · of initial account size'],['Daily drawdown','6%','Subject to official daily calculation']])}
  <ul><li><b>Maximum drawdown:</b> 10% of the initial account size (static). The 10% maximum static drawdown rule applies at all times, including when positions are held over the weekend.</li><li><b>Daily drawdown:</b> 6%.</li></ul>
  ${ex('Example: $100,000 account','Maximum loss allowance: $10,000, meaning balance or equity must not fall below $90,000. A 6% daily loss allowance equals $6,000, subject to the firm’s official daily calculation and reset method.')}`},

 {id:'limitless-drawdown-rules',title:'The Absel Funding — Limitless Drawdown Rules',body:`
  <p>The following drawdown rules apply to the Limitless model’s challenge phase account.</p>

  ${dd([['Maximum drawdown','None','Account is breached only if it reaches 0'],['Maximum daily drawdown','None','No daily drawdown']])}
  <h3>Maximum drawdown: None</h3>
  <p>There is no maximum drawdown limit. The account is breached only if it reaches 0.</p>
  <h3>Maximum daily drawdown: None</h3>
  <p>There is no daily drawdown limit.</p>
  <h3>Live phase</h3>
  <p>The following drawdown rules apply to the Limitless model’s live phase account.</p>
  ${dd([['Maximum drawdown','10%','Maximum drawdown limit in the live phase'],['Maximum daily drawdown','5%','Maximum daily drawdown limit in the live phase']])}
  <h3>Maximum drawdown: 10%</h3>
  <p>The maximum drawdown limit in the live phase is 10%.</p>
  <h3>Maximum daily drawdown: 5%</h3>
  <p>The maximum daily drawdown limit in the live phase is 5%.</p>
  ${note('In short','There is no drawdown limit in the challenge phase, but drawdown limits apply in the live phase.')}`}
]},

{id:'withdrawals',icon:'pay',title:'Withdrawals',sub:'Payouts, requirements and timing',articles:[
 {id:'minimum-withdrawal-amount',title:'Minimum withdrawal amount',body:`
  <p>To ensure efficient processing and reduce transaction costs, The Absel Funding applies a minimum withdrawal requirement.</p>
  <h3>Minimum withdrawal amount</h3>
  <ul><li>Minimum withdrawal: 1% of the initial account size.</li><li>Withdrawal requests below this amount cannot be processed.</li><li>Profits and eligible balances may be combined to meet the minimum requirement.</li><li>Giveaway accounts: withdrawals are limited to 2% only.</li></ul>
  ${note('Please note','The minimum withdrawal requirement is based on the initial account size. A request below the applicable threshold will not be processed.')}
  <h3>Why is there a minimum withdrawal requirement?</h3>
  <p>The minimum withdrawal requirement is intended to:</p>
  <ul><li>Reduce administrative and processing overhead.</li><li>Minimize transaction and network fees.</li><li>Ensure a smoother payout experience for all traders.</li></ul>
  <p>Larger, less frequent withdrawals help keep payout operations efficient and reliable.</p>`},

 {id:'withdrawal-methods-and-profit-splits',title:'Withdrawal methods and profit splits',body:`
  <h3>Withdrawal methods</h3>
  <p>Available payout methods may include:</p>
  <ul><li>Cryptocurrency (USDT and other supported crypto assets).</li><li>UPI transfers.</li><li>Bank transfers.</li><li>E-wallet payments, where available.</li></ul>
  <p>Payment options may vary depending on the trader’s location, availability, and selected payout method.</p>
  <h3>Profit split</h3>
  ${SPLIT}
  <h3>Payout frequency</h3>
  ${FREQ}
  <p>Traders who consistently sustain the 90% level over multiple payouts may be considered for our upcoming Career Program. Top performers may be invited to trade from our physical office trading desk. The Career Program is coming soon and will be accessible through the platform.</p>`},

 {id:'requirements-before-withdrawing',title:'Requirements before withdrawing',body:`
  <p>Before submitting a withdrawal request, make sure all the following conditions are met:</p>
  <ul><li>Your profit meets the minimum withdrawal requirement of 1% of the initial account size.</li><li>You have completed the minimum trading days on the funded account.</li><li>Your KYC verification is completed and approved.</li><li>Your account balance is above the starting balance.</li><li>Your biggest winning trade is greater than your biggest losing trade.</li></ul>
  ${note('Important withdrawal rule','Once a withdrawal request is submitted, no further trading activity is allowed on the account. Placing any trade after requesting a payout will be treated as a hard breach, and the account may be terminated.')}`},

 {id:'withdrawal-processing-time',title:'How long does a withdrawal take?',body:`
  <h3>Processing time</h3>
  <p>Approved withdrawal requests are processed on weekdays (Monday to Friday) only. Once processed, the time required for funds to arrive depends on the selected payout method, such as crypto, UPI, bank transfer, or e-wallet.</p>
  <p>Most payouts are completed within 24–48 hours after processing.</p>
  <h3>Possible delays</h3>
  <p>In some cases, withdrawals may take longer due to:</p>
  <ul><li>Weekends.</li><li>Public holidays.</li><li>Banking hours or payment-provider schedules.</li><li>Additional compliance or security checks.</li></ul>
  <p>These delays may be outside The Absel Funding’s direct control.</p>
  <h3>When does the processing time start?</h3>
  <p>Withdrawal processing begins once all of the following conditions are satisfied:</p>
  <ul><li>A withdrawal request has been submitted.</li><li>KYC verification is fully approved.</li><li>The trader has completed at least 5 trading days on the funded account.</li><li>The account meets the minimum withdrawal requirement (1% of the initial balance).</li><li>The account passes all risk and compliance checks.</li><li>No trades are placed after the withdrawal request; doing so is a hard breach.</li></ul>`}
]},

{id:'refund-policy',icon:'pay',title:'Refund Policy',sub:'Challenge fee refunds',articles:[
 {id:'one-step-refund-policy',title:'The Absel Funding — One-Step Challenge Model',body:`
  <p>Your challenge fee is refunded after your third payout.</p>
  <h3>Fee refund</h3>
  <ul><li>Fee refund after the third payout.</li></ul>`},

 {id:'two-step-refund-policy',title:'The Absel Funding — Two-Step Challenge Model',body:`
  <p>Your challenge fee is refunded after your third payout.</p>
  <h3>Fee refund</h3>
  <ul><li>Fee refund after the third payout.</li></ul>`},

 {id:'limitless-refund-policy',title:'The Absel Funding — Limitless Challenge Model',body:`
  <p>Your challenge fee is refunded after your second payout if you have selected the add-on.</p>
  <h3>Fee refund</h3>
  <ul><li>Fee refund after the second payout (if you have selected the add-on).</li></ul>`}
]},

{id:'account-security-and-access-rules',icon:'live',title:'Account Security & Access Rules',sub:'IP policy and inactivity',articles:[
 {id:'ip-address-policy',title:'IP address policy',body:`
  <p>There are no IP-address location restrictions for traders. Traders may access their accounts from different locations, devices, or networks without violating account rules.</p>
  <h3>Account access & security</h3>
  <p>Although there are no IP-region restrictions, traders remain responsible for maintaining account security. The following practices are prohibited:</p>
  <ul><li>Account sharing.</li><li>Unauthorized third-party access.</li><li>Selling or transferring account access.</li><li>Using compromised or stolen identities.</li></ul>
  <p>If suspicious account activity is detected, the Risk Management Team may request identity verification to protect the account.</p>
  <h3>Important notes</h3>
  <ul><li>Traders may travel and trade freely without notifying Support.</li><li>Logging in from different networks or locations is allowed.</li><li>Using different devices is allowed.</li><li>Basic account-security monitoring still applies.</li></ul>
  <p>This approach is designed to give traders flexibility while maintaining account safety.</p>`},

 {id:'inactivity-policy',title:'Inactivity policy',body:`
  <p>To ensure active participation and proper account usage, The Absel Funding enforces an inactivity rule across all account stages.</p>
  <h3>Inactivity rule</h3>
  <p>If a trading account remains inactive for 14 consecutive days, it will be treated as a hard breach and the account will be terminated.</p>
  <p>This rule applies to:</p>
  <ul><li>Phase 1 accounts.</li><li>Phase 2 accounts.</li><li>Funded accounts.</li></ul>
  <h3>What counts as inactivity?</h3>
  <p>An account is considered inactive if:</p>
  <ul><li>No trades are placed.</li><li>No trading activity occurs.</li><li>The account remains idle for 14 continuous days.</li></ul>
  <h3>How to avoid an inactivity breach</h3>
  <ul><li>Place at least one trade within every 14-day period.</li><li>Maintain regular trading activity.</li></ul>
  ${note('Important','Failure to meet this requirement will result in account termination due to inactivity.')}`}
]}
]
