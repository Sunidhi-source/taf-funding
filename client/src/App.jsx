import {useEffect,useRef,useState,memo} from 'react'
import {createPortal} from 'react-dom'
import {Routes,Route,NavLink,Link,useLocation} from 'react-router-dom'
import {api} from './api.js'
import {check,formatPhone,cleanPhone} from './validate.js'
import home from './pages/home.html?raw'
import rules from './pages/rules.html?raw'
import affiliate from './pages/affiliate.html?raw'

const CHECKOUT=import.meta.env.VITE_CRM_CHECKOUT_URL
const Raw=memo(({h})=><div dangerouslySetInnerHTML={{__html:h}}/>)
const PLANS=[
 {n:'1-Step Plan',d:'One step to get funded',p:[['2K',49],['6K',99],['15K',149],['25K',299],['50K',499]]},
 {n:'2-Step Plan',d:'Two steps for bigger capital',hot:1,p:[['6K',79],['15K',129],['25K',179],['50K',249],['100K',399]]}]

function Plans({openAuth}){
  const [sel,setSel]=useState([2,2])
  const buy=(i)=>{const q=PLANS[i].p[sel[i]]
    CHECKOUT?location.href=`${CHECKOUT}?plan=${encodeURIComponent(PLANS[i].n)}&size=${q[0]}&price=${q[1]}`:openAuth('signup')}
  return PLANS.map((x,i)=><div key={i} className={'card '+(x.hot?'hot':'')}>
    {x.hot&&<span className="tag">Most popular</span>}
    <h3>{x.n}</h3><p className="sub">{x.d}</p>
    <div className="prices">{x.p.map((q,j)=><button key={j} aria-pressed={sel[i]===j} className={sel[i]===j?'sel':''} onClick={()=>setSel(s=>s.map((v,k)=>k===i?j:v))}>${q[0]}<small>${q[1]}</small></button>)}</div>
    <button className="buy" onClick={()=>buy(i)}>Buy plan <i className="ar">&rarr;</i></button></div>)
}
function HomePage({openAuth}){
  const [slot,setSlot]=useState(null)
  useEffect(()=>setSlot(document.getElementById('planGrid')),[])
  return <><Raw h={home}/>{slot&&createPortal(<Plans openAuth={openAuth}/>,slot)}</>
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
  return <><div className="pt"><div className="wrap"><h1><span className="t1">Contact</span><span className="red">us</span></h1>
    <p className="sub" style={{marginTop:12}}>Questions about plans, rules or payouts? Send a message and we'll reply by email.</p></div></div>
    <section style={{border:0}}><div className="wrap" style={{maxWidth:680}}><div className="card">
    <h3 style={{marginBottom:18}}>Send us a message</h3>
    <form onSubmit={submit} noValidate>
      <Field id="name" error={err.name}><input name="name" value={v.name} onChange={set('name')} onBlur={blur('name')} placeholder="Full name" autoComplete="name" maxLength={80} aria-invalid={!!err.name} aria-describedby="name-e"/></Field>
      <Field id="email" error={err.email}><input name="email" type="email" inputMode="email" value={v.email} onChange={set('email')} onBlur={blur('email')} placeholder="Email address" autoComplete="email" maxLength={254} aria-invalid={!!err.email} aria-describedby="email-e"/></Field>
      <Field id="phone" error={err.phone} hint="Include your country code, e.g. +91 98765 43210"><input name="phone" type="tel" inputMode="tel" value={v.phone} onChange={set('phone')} onBlur={blur('phone')} placeholder="Phone number" autoComplete="tel" maxLength={22} aria-invalid={!!err.phone} aria-describedby="phone-e"/></Field>
      <Field id="message" error={err.message}><textarea name="message" value={v.message} onChange={set('message')} onBlur={blur('message')} placeholder="Message" maxLength={2000} aria-invalid={!!err.message} aria-describedby="message-e"/></Field>
      <input className="hp" name="website" value={v.website} onChange={set('website')} tabIndex={-1} autoComplete="off" aria-hidden="true"/>
      <button className="btn p" disabled={busy} style={{padding:15,borderRadius:999,fontSize:'1rem'}}>{busy?'Sending…':'Send message'}</button>
      <div className={'msg '+(m.ok?'ok':'err')} role="status">{m.t}</div>
    </form></div></div></section></>
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
  const logout=()=>{localStorage.removeItem('taf_token');localStorage.removeItem('taf_user');setUser(null)}
  const logo=(h)=><Link className="logo" to="/"><img src="/logo.webp" alt="TAF – The Absel Funding" height={h} style={{height:h}}/></Link>
  return <>
    <header><div className="wrap">{logo(54)}
      <nav className={open?'open':''} aria-label="Main">
        <NavLink end to="/">Home</NavLink><NavLink to="/trading-rules">Trading Rules</NavLink>
        <NavLink to="/affiliate-program">Affiliate Program</NavLink><NavLink to="/contact-us">Contact Us</NavLink></nav>
      <div className="acts">{user?<><span className="sub" style={{alignSelf:'center'}}>Hi, {user.name.split(' ')[0]}</span><button className="btn" onClick={logout}>Log out</button></>
        :<><button className="btn" data-auth="login">Login</button><button className="btn p" data-auth="signup">Sign up</button></>}</div>
      <button className="menu" aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(!open)}>☰</button></div></header>
    <main><Routes>
      <Route path="/" element={<HomePage openAuth={setMode}/>}/>
      <Route path="/trading-rules" element={<Raw h={rules}/>}/>
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
    <AuthModal mode={mode} setMode={setMode} onDone={setUser}/>
  </>
}
