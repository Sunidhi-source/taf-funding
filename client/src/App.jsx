import {useEffect,useRef,useState,memo} from 'react'
import {createPortal} from 'react-dom'
import {Routes,Route,NavLink,Link,Navigate,useLocation,useParams} from 'react-router-dom'
import {api} from './api.js'
import {check,formatPhone,cleanPhone} from './validate.js'
import {useFx} from './fx.js'
import home from './pages/home.html?raw'
import {RULES,ICONS} from './rulesData.js'
import {CONTACT} from './contactInfo.js'
import affiliate from './pages/affiliate.html?raw'

const CHECKOUT=import.meta.env.VITE_CRM_CHECKOUT_URL
const Raw=memo(({h})=><div dangerouslySetInnerHTML={{__html:h}}/>)
const SZ=['5K','10K','25K','50K','78K','100K']
const FEE='Refunded after 3rd payout'
const PLANS=[
 {n:'1-Step',t:'Funding fast',p:[42,69,149,249,339,399],r:[['Profit target','8%'],['Max daily DD','6%'],['Max overall DD','10%'],['Profit split','70 / 80 / 90%'],['Platform','MT5'],['News trading','Allowed'],['Payouts','Every Friday'],['Challenge fee',FEE]]},
 {n:'2-Step',t:'Industry standard',p:[35,59,129,219,270,349],r:[['Phase 1 target','8%'],['Phase 2 target','5%'],['Max daily DD','6%'],['Max overall DD','10%'],['Time limit','None'],['Platform','MT5'],['News trading','Allowed'],['Payouts','Every Friday'],['Challenge fee',FEE]]},
 {n:'Limitless',t:'High freedom',p:[49,99,179,289,349,459],r:[['Profit target','10%'],['Evaluation drawdown','None'],['Daily DD (live)','5%'],['Overall DD (live)','10%'],['Time limit','None'],['Platform','MT5'],['Payouts','Every 14 days'],['Challenge fee','Non-refundable']]}]

/* decorative parallax backdrop; hidden until fx.js activates it */
const FxBg=memo(()=><div id="fx-bg" aria-hidden="true" hidden>
  <div className="fx-scene"><img src="/track-wide.jpg" alt="" decoding="async" loading="lazy"/></div>
  <div className="fx-shade"/><div className="fx-glow"/>
  <div className="fx-rings">
    <div className="fx-ring r1"><svg className="fx-spin" viewBox="0 0 1000 1000" fill="none" stroke="#cfcfd4"><circle cx="500" cy="500" r="486" strokeOpacity=".1"/><circle className="fx-tick" cx="500" cy="500" r="466" strokeWidth="12" strokeOpacity=".16" strokeDasharray="1.5 22.9"/><circle className="fx-tick" cx="500" cy="500" r="462" strokeWidth="20" strokeOpacity=".22" strokeDasharray="3 238.9"/></svg></div>
    <div className="fx-ring r2"><svg className="fx-spin" viewBox="0 0 1000 1000" fill="none"><circle cx="500" cy="500" r="400" stroke="#cfcfd4" strokeOpacity=".09"/><circle cx="500" cy="500" r="400" stroke="#e50914" strokeOpacity=".24" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="700 1813"/></svg></div>
    <div className="fx-ring r3"><svg className="fx-spin" viewBox="0 0 1000 1000" fill="none"><circle cx="500" cy="500" r="320" stroke="#cfcfd4" strokeOpacity=".1" strokeDasharray="1 11"/></svg></div>
    <div className="fx-ring r4"><svg className="fx-spin" viewBox="0 0 1000 1000" fill="none" stroke="#cfcfd4"><circle cx="500" cy="500" r="240" strokeOpacity=".07"/><circle cx="500" cy="500" r="240" strokeOpacity=".14" strokeWidth="3" strokeDasharray="300 1208"/></svg></div>
  </div>
  <div className="fx-streaks"><i/><i/><i/></div>
  <canvas className="fx-dust"/>
</div>)

function Plans({openAuth}){
  const [m,setM]=useState(0),[z,setZ]=useState(2)
  const x=PLANS[m],price=x.p[z]
  const buy=()=>CHECKOUT?location.href=`${CHECKOUT}?plan=${encodeURIComponent(x.n+' Challenge')}&size=${SZ[z]}&price=${price}`:openAuth('signup')
  return <>
    <div className="tabs">
      <div className="pills" role="group" aria-label="Challenge type">{PLANS.map((q,i)=><button key={i} aria-pressed={m===i} className={m===i?'on':''} onClick={()=>setM(i)}>{q.n}</button>)}</div>
      <div className="pills" role="group" aria-label="Account size">{SZ.map((q,i)=><button key={i} aria-pressed={z===i} className={z===i?'on':''} onClick={()=>setZ(i)}>${q}</button>)}</div>
    </div>
    <div className="card pcard">
      <div className="phead"><b>{x.n} Challenge</b><div className="pprice">${price}</div><span>{x.t}</span></div>
      <dl>{x.r.map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      <button className="buy" onClick={buy}>Buy plan <i className="ar">&rarr;</i></button>
    </div></>
}
function HomePage({openAuth}){
  const [slot,setSlot]=useState(null)
  useEffect(()=>setSlot(document.getElementById('planGrid')),[])
  return <><Raw h={home}/>{slot&&createPortal(<Plans openAuth={openAuth}/>,slot)}</>
}

const Ico=({d})=><svg className="i" viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{__html:d}}/>
const Chev=()=><svg className="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
const by='By The Absel Funding'
function RulesHub(){
  const {cat,art}=useParams()
  const c=RULES.find(x=>x.id===cat)
  if(cat&&!c)return <Navigate to="/trading-rules" replace/>
  const a=c&&art&&c.articles.find(x=>x.id===art)
  if(art&&!a)return <Navigate to={'/trading-rules/'+c.id} replace/>
  const to=(x,y)=>'/trading-rules/'+x.id+(y?'/'+y.id:'')
  if(a){const nx=c.articles[c.articles.indexOf(a)+1]
    return <section className="hc"><div className="wrap hc-narrow">
      <div className="crumbs" role="navigation" aria-label="Breadcrumb"><Link to="/trading-rules">Trading rules</Link><i>›</i><Link to={to(c)}>{c.title}</Link></div>
      <article className="hc-art"><div className="hc-arthead"><span className="ic"><Ico d={ICONS[c.icon]}/></span><div><h1>{a.title}</h1><p>{by} · {c.title}</p></div></div>
        <div className="hc-body" dangerouslySetInnerHTML={{__html:a.body}}/></article>
      <div className="hc-foot">{nx?<Link className="hc-next" to={to(c,nx)}><small>Next article</small><b>{nx.title}</b></Link>:<span/>}
        <Link className="btn" to={to(c)}>&larr; Back to {c.title}</Link></div>
      <p className="hc-help">Still need help? <Link to="/contact-us">Contact our support team</Link>.</p></div></section>}
  if(c)return <section className="hc"><div className="wrap hc-narrow">
      <div className="crumbs" role="navigation" aria-label="Breadcrumb"><Link to="/trading-rules">Trading rules</Link></div>
      <div className="hc-cathead"><span className="ic big"><Ico d={ICONS[c.icon]}/></span><div><h1>{c.title}</h1><p>{c.sub}</p></div><em>{c.articles.length} article{c.articles.length>1?'s':''}</em></div>
      <div className="hc-list">{c.articles.map(x=><Link key={x.id} className="hc-row" to={to(c,x)}><span>{x.title}</span><Chev/></Link>)}</div>
      <p className="hc-help">Can’t find what you need? <Link to="/contact-us">Contact our support team</Link>.</p></div></section>
  return <>
    <section className="hc-hero"><div className="wrap hc-herogrid">
      <div><h1><span className="t1">Know the rules</span><span className="red">before you trade</span></h1>
        <p className="sub">Our guidelines keep every evaluation fair, transparent and focused on performance. Browse the topics below, or reach out if you need a hand.</p>
        <Link className="btn p" to="/contact-us">Contact us <i className="ar">&rarr;</i></Link></div>
      <img className="side-img" src="/car-rear.jpg" alt="" loading="lazy"/></div></section>
    <section className="hc"><div className="wrap">
      <div className="hc-banner"><h2>Hi there, what do you need help with today?</h2></div>
      <div className="hc-grid">{RULES.map(x=><Link key={x.id} className="card hc-card" to={to(x)}>
        <span className="ic"><Ico d={ICONS[x.icon]}/></span><h3>{x.title}</h3><p>{x.sub}</p>
        <div className="meta"><img src="/favicon-v2.png" alt="" width="20" height="20"/><span>{by}</span><i>•</i><span>{x.articles.length} article{x.articles.length>1?'s':''}</span></div></Link>)}</div></div></section></>
}

const CI={
  email:{l:'Email us',d:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',h:v=>'mailto:'+v},
  address:{l:'Visit us',d:'<path d="M12 21s7-6.200 7-11a7 7 0 0 0-14 0c0 4.800 7 11 7 11z"/><circle cx="12" cy="10" r="2.500"/>'},
  phone:{l:'Call us',d:'<path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',h:v=>'tel:'+v.replace(/[^\d+]/g,'')},
  whatsapp:{l:'WhatsApp',d:'<path d="M4 20l1.300-4A8 8 0 1 1 8 18.700z"/><path d="M9 9c0 3 3 6 6 6l1-1.500-2-1-1 .8c-.8-.4-1.600-1.200-2-2l.8-1-1-2z"/>',h:v=>'https://wa.me/'+v.replace(/\D/g,'')}
}
function ContactCards(){
  return <div className="ct-cards">{Object.keys(CI).filter(k=>CONTACT[k]).map(k=>{const i=CI[k],v=CONTACT[k],T=i.h?'a':'div'
    return <T key={k} className="card ct-card" {...(i.h?{href:i.h(v),...(k==='whatsapp'?{target:'_blank',rel:'noopener noreferrer'}:{})}:{})}>
      <span className="ic"><svg className="i" viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{__html:i.d}}/></span><small>{i.l}</small><b>{v}</b></T>})}</div>
}

function Field({id,label,hint,error,children}){
  return <div className={'field'+(error?' bad':'')}>{children}
    {error?<div className="e" id={id+'-e'}>{error}</div>:hint&&<div className="h">{hint}</div>}</div>
}
function Contact(){
  const [v,setV]=useState({name:'',email:'',phone:'',message:'',website:''})
  const [err,setErr]=useState({}),[m,setM]=useState({t:'',ok:false}),[busy,setBusy]=useState(false)
  const set=(k)=>(e)=>{let val=e.target.value
    if(k==='phone')val=val.replace(/[^\d+\-()\s]/g,'')
    setV(o=>({...o,[k]:val}));if(err[k])setErr(o=>({...o,[k]:check[k](val)}))}
  const blur=(k)=>()=>{let val=v[k]
    if(k==='phone'&&val&&!check.phone(val)){val=formatPhone(val);setV(o=>({...o,phone:val}))}
    if(k==='name')setV(o=>({...o,name:val.trim().replace(/\s+/g,' ')}))
    if(k==='email')setV(o=>({...o,email:val.trim()}))
    setErr(o=>({...o,[k]:val||k!=='website'?check[k](val):''}))}
  const submit=async(e)=>{e.preventDefault()
    const errs={};['name','email','phone','message'].forEach(k=>{const x=check[k](v[k]);if(x)errs[k]=x})
    setErr(errs);setM({t:'',ok:false})
    const bad=Object.keys(errs)[0]
    if(bad){e.target.elements[bad]?.focus();return}
    setBusy(true);setM({t:'Sending…',ok:true})
    try{await api('/contact',{name:v.name.trim(),email:v.email.trim().toLowerCase(),phone:cleanPhone(v.phone),message:v.message.trim(),website:v.website})
      setM({t:"Message sent. We'll reply by email soon.",ok:true});setV({name:'',email:'',phone:'',message:'',website:''});setErr({})}
    catch(x){if(x.errors)setErr(x.errors);setM({t:x.message,ok:false})}
    setBusy(false)}
  return <><div className="pt ctr"><div className="wrap"><h1><span className="t1">Contact</span><span className="red">us</span></h1>
    <p className="sub">We’re more than just a prop firm. Questions about plans, rules or payouts? Reach out and our team will get back to you.</p></div></div>
    <section style={{border:0,paddingTop:36}}><div className="wrap"><ContactCards/>
    <div className="ct-form"><div className="card">
    <h3 style={{marginBottom:18}}>Send us a message</h3>
    <form onSubmit={submit} noValidate>
      <Field id="name" error={err.name}><input name="name" value={v.name} onChange={set('name')} onBlur={blur('name')} placeholder="Full name" autoComplete="name" maxLength={80} aria-invalid={!!err.name} aria-describedby="name-e"/></Field>
      <Field id="email" error={err.email}><input name="email" type="email" inputMode="email" value={v.email} onChange={set('email')} onBlur={blur('email')} placeholder="Email address" autoComplete="email" maxLength={254} aria-invalid={!!err.email} aria-describedby="email-e"/></Field>
      <Field id="phone" error={err.phone} hint="Include your country code, e.g. +91 98765 43210"><input name="phone" type="tel" inputMode="tel" value={v.phone} onChange={set('phone')} onBlur={blur('phone')} placeholder="Phone number" autoComplete="tel" maxLength={22} aria-invalid={!!err.phone} aria-describedby="phone-e"/></Field>
      <Field id="message" error={err.message}><textarea name="message" value={v.message} onChange={set('message')} onBlur={blur('message')} placeholder="Message" maxLength={2000} aria-invalid={!!err.message} aria-describedby="message-e"/></Field>
      <input className="hp" name="website" value={v.website} onChange={set('website')} tabIndex={-1} autoComplete="off" aria-hidden="true"/>
      <button className="btn p" disabled={busy} style={{padding:15,borderRadius:999,fontSize:'1rem'}}>{busy?'Sending…':'Send message'}</button>
      <div className={'msg '+(m.ok?'ok':'err')} role="status">{m.t}</div>
    </form></div></div></div></section></>
}

function AuthModal({mode,setMode,onDone}){
  const ref=useRef(),[msg,setMsg]=useState('')
  useEffect(()=>{const d=ref.current;mode&&!d.open?d.showModal():!mode&&d.open&&d.close();setMsg('')},[mode])
  const submit=async(e)=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target))
    if(mode==='signup'){const r=new URLSearchParams(location.search).get('ref');if(r)d.ref=r}
    try{const r=await api('/auth/'+mode,d);if(r.token)localStorage.setItem('taf_token',r.token);localStorage.setItem('taf_user',JSON.stringify(r.user));onDone(r.user);setMode(null);if(r.redirect)location.href=r.redirect}
    catch(x){setMsg(x.message)}}
  return <dialog ref={ref} onClose={()=>setMode(null)} onClick={e=>e.target===ref.current&&setMode(null)}>
    <button className="x" aria-label="Close" onClick={()=>setMode(null)}>×</button>
    <div className="tabs">{['login','signup'].map(t=><button key={t} className={'btn '+(mode===t?'p':'')} onClick={()=>setMode(t)}>{t==='login'?'Login':'Sign up'}</button>)}</div>
    <form onSubmit={submit} key={mode}>
      {mode==='signup'&&<input name="name" placeholder="Full name" autoComplete="name" required/>}
      <input name="email" type="email" placeholder="Email address" autoComplete="email" required/>
      <input name="password" type="password" placeholder="Password (min 8 characters)" minLength={8} autoComplete={mode==='signup'?'new-password':'current-password'} required/>
      <button className="btn p" style={{padding:14,borderRadius:999}}>{mode==='signup'?'Create account':'Log in'}</button>
      <div className="msg err" role="status">{msg}</div>
    </form></dialog>
}

export default function App(){
  const [mode,setMode]=useState(null),[user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem('taf_user'))}catch{return null}}),[open,setOpen]=useState(false),loc=useLocation()
  useEffect(()=>{setOpen(false);if(loc.hash==='#plans')document.getElementById('plans')?.scrollIntoView();else scrollTo(0,0)},[loc.pathname,loc.hash])
  useEffect(()=>{const h=(e)=>{const a=e.target.closest('[data-auth]'),g=e.target.closest('[data-go]')
    if(a)setMode(a.dataset.auth);if(g){e.preventDefault();document.getElementById(g.dataset.go)?.scrollIntoView()}}
    document.addEventListener('click',h);return()=>document.removeEventListener('click',h)},[])
  useFx(loc.pathname)
  const logout=()=>{localStorage.removeItem('taf_token');localStorage.removeItem('taf_user');setUser(null)}
  const logo=(h)=><Link className="logo" to="/"><img src="/logo-v2.webp" alt="TAF – The Absel Funding" width={Math.round(h*3.3)} height={h} style={{height:h}}/></Link>
  return <>
    <FxBg/>
    <header><div className="wrap">{logo(54)}
      <nav className={open?'open':''} aria-label="Main">
        <NavLink end to="/">Home</NavLink><NavLink to="/trading-rules">Trading Rules</NavLink>
        <NavLink to="/affiliate-program">Affiliate Program</NavLink><NavLink to="/contact-us">Contact Us</NavLink></nav>
      <div className="acts">{user?<><span className="sub" style={{alignSelf:'center'}}>Hi, {user.name.split(' ')[0]}</span><button className="btn" onClick={logout}>Log out</button></>
        :<><button className="btn" data-auth="login">Login</button><button className="btn p" data-auth="signup">Sign up</button></>}</div>
      <button className="menu" aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(!open)}>☰</button></div></header>
    <main><Routes>
      <Route path="/" element={<HomePage openAuth={setMode}/>}/>
      <Route path="/trading-rules" element={<RulesHub/>}/><Route path="/trading-rules/:cat" element={<RulesHub/>}/><Route path="/trading-rules/:cat/:art" element={<RulesHub/>}/>
      <Route path="/affiliate-program" element={<Raw h={affiliate}/>}/>
      <Route path="/contact-us" element={<Contact/>}/>
      <Route path="*" element={<HomePage openAuth={setMode}/>}/>
    </Routes></main>
    <footer><div className="wrap foot">{logo(48)}
      <nav aria-label="Footer"><Link to="/">Home</Link><Link to="/trading-rules">Trading Rules</Link><Link to="/affiliate-program">Affiliate Program</Link><Link to="/contact-us">Contact Us</Link></nav>
      <div className="social" aria-label="Social links">
        <a href="#" aria-label="Discord"><svg viewBox="0 0 24 24"><path d="M19.3 5.4A17 17 0 0 0 15 4l-.5 1a15 15 0 0 0-5 0L9 4a17 17 0 0 0-4.300 1.400C2.500 9 1.900 12.500 2.200 16a17 17 0 0 0 5.200 2.600l1.100-1.800a11 11 0 0 1-1.700-.8l.4-.3a12 12 0 0 0 10.200 0l.4.300c-.5.300-1.100.600-1.700.8l1.100 1.800A17 17 0 0 0 21.800 16c.4-4.100-.7-7.600-2.500-10.600zM9.300 13.800c-1 0-1.800-.9-1.800-2s.8-2 1.800-2 1.800.9 1.800 2-.8 2-1.800 2zm5.400 0c-1 0-1.800-.9-1.800-2s.8-2 1.800-2 1.800.9 1.800 2-.8 2-1.800 2z"/></svg></a>
        <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M21.600 7.200a2.500 2.500 0 0 0-1.800-1.800C18.200 5 12 5 12 5s-6.200 0-7.800.4A2.500 2.500 0 0 0 2.400 7.200C2 8.800 2 12 2 12s0 3.200.4 4.800a2.500 2.500 0 0 0 1.800 1.800C5.800 19 12 19 12 19s6.200 0 7.800-.4a2.500 2.500 0 0 0 1.800-1.800c.4-1.600.4-4.800.4-4.800s0-3.200-.4-4.800zM10 15V9l5.200 3z"/></svg></a>
        <a href="#" aria-label="X"><svg viewBox="0 0 24 24"><path d="M17.800 3h3l-6.600 7.500L22 21h-6.100l-4.800-6.200L5.600 21h-3l7-8L2 3h6.200l4.300 5.700zm-1 16.200h1.700L7.300 4.700H5.500z"/></svg></a>
        <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 7.400A4.600 4.600 0 1 0 12 16.600 4.600 4.600 0 0 0 12 7.400zm0 7.600a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5-8.800a1.100 1.100 0 1 0 0 2.200 1.100 1.100 0 0 0 0-2.200zM12 4c2.700 0 3 0 4.100.1 3.300.1 4.800 1.700 4.900 4.900.1 1.100.1 1.400.1 4.100s0 3-.1 4.100c-.1 3.200-1.600 4.800-4.900 4.900-1.100.1-1.400.1-4.100.1s-3 0-4.100-.1c-3.300-.1-4.800-1.700-4.900-4.900C3 15 3 14.700 3 12s0-3 .1-4.100C3.200 4.700 4.800 3.200 8 3.100 9 3 9.300 3 12 3zm0-1.800c-2.700 0-3.100 0-4.100.1C3.700 2.500 1.600 4.700 1.400 7.900 1.300 9 1.300 9.300 1.300 12s0 3 .1 4.100c.2 4.200 2.400 6.400 6.500 6.600 1 .1 1.400.1 4.100.1s3.100 0 4.100-.1c4.200-.2 6.400-2.400 6.500-6.600.1-1.100.1-1.400.1-4.100s0-3-.1-4.100c-.2-4.200-2.400-6.400-6.500-6.600C15.100 1.300 14.700 1.300 12 1.300z"/></svg></a>
      </div>
      <button className="btn" data-auth="signup">Start challenge <i className="ar">&rarr;</i></button></div>
      <div className="wrap legal"><span>© 2026 The Absel Funding. All rights reserved.</span><span>Trading involves risk. Challenge accounts are simulated and past performance is not a guarantee of future results.</span><span>Trade. Grow. Earn.<span className="slash">//</span></span></div></footer>
    {loc.pathname!=='/contact-us'&&<Link className="fx-fab" to="/contact-us" aria-label="Contact support"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg></Link>}
    <AuthModal mode={mode} setMode={setMode} onDone={setUser}/>
  </>
}
