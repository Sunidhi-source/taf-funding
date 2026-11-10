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

{id:'one-step',icon:'one',title:'One-Step Challenge',sub:'8% profit target',articles:[
 {id:'phase-1',title:'Phase 1: Verification',body:`
  <p>The One-Step Challenge evaluates trading discipline, consistency, and risk management before capital allocation.</p>
  <h3>Trading objectives</h3>
  <ul><li>Achieve an 8% profit target.</li><li>Follow all trading rules.</li><li>Respect the applicable drawdown rules.</li></ul>
  <p>After achieving the profit target, the account enters a 24-hour trading-behaviour review. Once approved, the trader proceeds to the funded stage.</p>
  <h3>Stage-up review</h3>
  <p>A 24-hour review applies to all stage upgrades.</p>`},
 {id:'drawdown',title:'Drawdown limits',body:`
  <ul><li><b>Maximum drawdown:</b> 10% of the initial account size (static).</li><li><b>Daily drawdown:</b> 6%.</li></ul>
  ${ex('Example: $100,000 account','Maximum loss allowance: $10,000. The account balance or equity must not fall below $90,000. A 6% daily loss allowance equals $6,000, subject to the firm’s official daily calculation and reset method.')}`},
 {id:'single-trade-risk',title:'Single-trade risk',body:`
  <p>A trader may risk up to 10% of the maximum drawdown allowance in one trade.</p>
  ${ex('Example','For a $100,000 account, the 10% maximum drawdown allowance is $10,000. The maximum risk per trade under this rule is $1,000.')}`}
]},

{id:'two-step',icon:'two',title:'Two-Step Challenge',sub:'Two evaluation phases',articles:[
 {id:'phases',title:'Phase 1 and Phase 2',body:`
  <p>The Two-Step Challenge consists of two evaluation phases. Traders must successfully complete both phases to qualify for a funded account. Each phase assesses trading discipline, consistency, and risk management.</p>
  <h3>Phase 1: Performance evaluation</h3>
  <ul><li>Achieve an 8% profit target.</li><li>Follow all trading rules.</li><li>Respect the maximum drawdown rules.</li></ul>
  <p>After completing Phase 1, the account enters a 24-hour review period. Once approved, the trader advances to Phase 2.</p>
  <h3>Phase 2: Verification</h3>
  <ul><li>Achieve a 5% profit target.</li><li>Continue following all trading rules.</li></ul>
  <p>After Phase 2 is completed, the account undergoes another 24-hour review before funding. A 24-hour review applies to every stage upgrade.</p>`},
 {id:'drawdown',title:'Drawdown limits',body:`
  <ul><li><b>Maximum drawdown:</b> 10% of the initial account size (static).</li><li><b>Daily drawdown:</b> 5%.</li></ul>
  ${ex('Example: $100,000 account','Maximum loss allowance: $10,000, meaning balance or equity must not fall below $90,000. A 5% daily loss allowance equals $5,000, subject to the firm’s official daily calculation and reset method.')}`},
 {id:'single-trade-risk',title:'Single-trade risk',body:`
  <p>A trader may risk up to 10% of the total maximum drawdown allowance in one trade. Exceeding this limit may be treated as a violation.</p>
  ${ex('Example','For a $100,000 account with a $10,000 maximum drawdown allowance, the maximum risk per trade is $1,000.')}`}
]},

{id:'general-rules',icon:'rules',title:'General Trading Rules',sub:'Breaches and behaviour',articles:[
 {id:'hard-breach-layering',title:'Hard breach and layering',body:`
  <h3>Hard breach: account violation</h3>
  <p>A hard breach is a serious violation and results in immediate account termination.</p>
  <h3>Layering</h3>
  <p>Opening more than three positions on the same instrument in the same direction at the same time is not allowed. Adding positions to a losing trade, grid trading, or recovery-based entries may be treated as a violation.</p>`},
 {id:'soft-breach',title:'Soft breach and toxic trading behaviour',body:`
  <h3>Soft breach: trading behaviour</h3>
  <p>A soft breach may lead to review, restrictions, or further action. Repeated violations may result in restrictions or account termination.</p>
  <h3>Toxic trading behaviour</h3>
  <ul><li>Ignoring risk management.</li><li>Reckless trading behaviour.</li><li>Trading without a clear strategy.</li><li>Emotion-driven trading.</li></ul>`},
 {id:'excessive-risk',title:'Excessive risk-taking and over-leveraging',body:`
  <ul><li>Using disproportionately large position sizes.</li><li>Repeatedly using maximum lot sizes.</li><li>Taking trades that can damage the account quickly.</li><li>Relying excessively on leverage.</li></ul>`},
 {id:'martingale',title:'Martingale trading',body:`
  <p>Martingale trading means increasing position size after losses in an attempt to recover drawdown. Examples include doubling lot size after a loss, re-entering with a larger lot size after a losing trade, or progressively increasing risk after losses.</p>
  <p>Martingale behaviour is identified as a soft breach during the challenge phase. Traders are expected to maintain consistent risk per trade.</p>`},
 {id:'news-trading',title:'News trading',body:`
  <p>News trading is allowed during challenge phases and the funded stage. Traders may open, close, and manage positions during high-impact news releases, economic announcements, central-bank speeches, and periods of increased volatility. There are no timing restrictions around news events.</p>
  <p>Traders remain responsible for managing risk during volatile market conditions. Slippage, spreads, and rapid price movements may occur. Standard account rules, including applicable drawdown limits, continue to apply.</p>`},
 {id:'tick-scalping',title:'Tick scalping',body:`
  <p>Tick scalping refers to extremely fast trades intended to capture micro-movements, including trades opened and closed within 120 seconds and high-frequency micro-scalping.</p>
  <p>Up to 20% of total trades may be ignored. Trades beyond this allowance may be reviewed.</p>`},
 {id:'overtrading-gambling',title:'Overtrading and gambling behaviour',body:`
  <h3>Overtrading</h3>
  <ul><li>Placing too many trades in a short period.</li><li>Entering repeatedly without confirmation.</li><li>Emotion-driven execution or trading to recover losses.</li></ul>
  <h3>Gambling behaviour</h3>
  <ul><li>Random entries without analysis.</li><li>Revenge trading.</li><li>Emotional trading.</li><li>Overtrading to recover losses.</li></ul>`},
 {id:'reverse-one-sided',title:'Reverse trading and one-sided bias',body:`
  <h3>Reverse trading</h3>
  <p>Examples include intentionally losing trades, offsetting trades across accounts, or manipulating exposure. Trades placed within 15 minutes to neutralize exposure may be flagged.</p>
  <h3>One-sided bias trading</h3>
  <p>Repeatedly trading in only one direction without clear justification may trigger a review.</p>`},
 {id:'hedging',title:'Hedging (Two-Step Challenge)',body:`
  <p>Improper hedging may include opening opposite trades on the same instrument or locking positions to remove market exposure. Such activity may be reviewed under the applicable trading rules.</p>`}
]},

{id:'limitless',icon:'inf',title:'Limitless Challenge',sub:'Evaluation rules',articles:[
 {id:'challenge-structure',title:'Challenge structure',body:`
  <p>The Limitless Challenge is designed for traders who want maximum freedom during evaluation. It has one evaluation phase, no time limit, and no challenge-stage daily or maximum drawdown limit.</p>
  ${note('Trade freely. Prove your consistency.','The Limitless Challenge gives you the freedom to pursue a 10% profit target at your own pace, without challenge-stage drawdown limits or time pressure. Focus on your strategy and demonstrate consistent performance.')}
  <h3>Challenge structure</h3>
  <ul><li><b>Evaluation phases:</b> One phase only.</li><li><b>Profit target:</b> 10%.</li><li><b>Time limit:</b> No time limit to pass the challenge.</li><li><b>Challenge drawdown:</b> No daily drawdown limit and no maximum drawdown limit during evaluation.</li></ul>
  <p>The Limitless Challenge removes challenge-stage drawdown restrictions. Once funded, however, the live account is governed by the live-account rules.</p>`}
]},

{id:'limitless-live',icon:'live',title:'Limitless Live Account Rules',sub:'After you are funded',articles:[
 {id:'live-drawdown',title:'Drawdown limits',body:`
  <p>After passing the Limitless Challenge, the trader’s live funded account is subject to the following requirements.</p>
  <ul><li><b>Daily drawdown:</b> 5%.</li><li><b>Maximum drawdown:</b> 10%.</li></ul>
  ${note('Important distinction','There are no daily or maximum drawdown limits during the Limitless evaluation. Once the account is live and funded, a 5% daily drawdown limit and a 10% maximum drawdown limit apply.')}`},
 {id:'single-trade-floating-risk',title:'Single-trade and floating risk',body:`
  <ul><li>A trader may not risk more than 2% in a single trade.</li><li>Total open floating risk must not exceed 3% at any time.</li></ul>
  <p>These limits apply to the live funded account. Traders should account for combined exposure across open positions.</p>`},
 {id:'live-tick-scalping',title:'Tick scalping: not allowed',body:`
  <p>Tick scalping is not allowed on the live account. Each trade must be held for at least 120 seconds before it is closed.</p>`},
 {id:'weekend-holding',title:'Weekend holding',body:`
  <p>Positions may not be held over the weekend unless permission has been obtained in advance. If you wish to hold a position over the weekend, contact the support team or email The Absel Funding to request approval.</p>`},
 {id:'inactivity',title:'Inactivity policy',body:`
  <p>A live account with no trading activity for 30 consecutive days will be closed. Traders should maintain activity to keep their accounts active.</p>`},
 {id:'live-martingale',title:'Martingale: not allowed',body:`
  <p>Martingale trading is prohibited on the live account. Position size must not be increased on the same instrument after a losing trade as a recovery method.</p>
  ${ex('Example: same instrument','If you lose a trade using 1.00 lot on EUR/USD, you must not increase the next EUR/USD position to 1.50 lots as an attempt to recover the loss.')}
  <p>This restriction applies to the same trading pair. You may trade a different pair; for example, a loss on EUR/USD does not automatically prevent you from opening a trade on GBP/USD. All other risk limits still apply.</p>`}
]},

{id:'payouts',icon:'pay',title:'Payouts & Consistency Rule',sub:'Profit split and payouts',articles:[
 {id:'profit-split',title:'Profit split',body:`
  <div class="scroll"><table><tr><th>Payout</th><th>Trader profit share</th></tr><tr><td>1st payout</td><td>70%</td></tr><tr><td>2nd payout</td><td>80%</td></tr><tr><td>3rd payout and onwards</td><td>90%</td></tr></table></div>`},
 {id:'payout-frequency',title:'Payout frequency',body:`
  <p>Payouts are available every 25 days. Traders who purchase the applicable add-on may qualify for a 14-day payout cycle.</p>
  <p>All payout requests remain subject to successful KYC verification, account review, and the applicable payout terms.</p>`},
 {id:'consistency-rule',title:'20% consistency rule explained',body:`
  <p>The 20% consistency rule is designed to encourage steady performance rather than having a trader generate most of their total profit in one unusually large trading day.</p>
  <p>Under this rule, the trader’s most profitable day must not account for more than 20% of the total profit being assessed for payout.</p>
  ${ex('Example: how the 20% rule works','Suppose your total profit is $5,000. Twenty percent of $5,000 is $1,000. Your best profitable day should therefore be no more than $1,000. If your best day made $1,500, it represents 30% of your total profit, so you would need to generate additional profit on other days until the best day is no more than 20% of the total.')}
  <p>The official calculation period and the treatment of losses follow the final payout terms.</p>
  ${note('Keep your trading steady','Aim for repeatable performance, control your risk, and avoid relying on one unusually profitable day to meet your payout objective.')}`},
 {id:'consistency-addon',title:'Consistency rule add-on',body:`
  <p>The 20% consistency rule can be removed by purchasing the applicable add-on, subject to the add-on terms.</p>`}
]}
]
