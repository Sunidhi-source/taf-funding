import {useEffect,useRef,useState,memo} from 'react'
import {createPortal} from 'react-dom'
import {Routes,Route,NavLink,Link,useLocation} from 'react-router-dom'
import {api} from './api.js'
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
    <div className="prices">{x.p.map((q,j)=><button key={j} className={sel[i]===j?'sel':''} onClick={()=>setSel(s=>s.map((v,k)=>k===i?j:v))}>${q[0]}<small>${q[1]}</small></button>)}</div>
    <button className="btn p" style={{width:'100%'}} onClick={()=>buy(i)}>Buy plan</button></div>)
}
function HomePage({openAuth}){
  const [slot,setSlot]=useState(null)
  useEffect(()=>setSlot(document.getElementById('planGrid')),[])
  return <><Raw h={home}/>{slot&&createPortal(<Plans openAuth={openAuth}/>,slot)}</>
}

function Contact(){
  const [m,setM]=useState({t:'',ok:false}),[busy,setBusy]=useState(false)
  const submit=async(e)=>{e.preventDefault();const f=e.target;setBusy(true);setM({t:'Sending…',ok:true})
    try{await api('/contact',Object.fromEntries(new FormData(f)));setM({t:"Message sent. We'll reply by email soon.",ok:true});f.reset()}
    catch(x){setM({t:x.message,ok:false})}setBusy(false)}
  return <><div className="pt"><div className="wrap"><h1>Contact <span className="red">us</span></h1>
    <p className="sub" style={{marginTop:12}}>Questions about plans, rules or payouts? Send a message and we'll reply by email.</p></div></div>
    <section style={{border:0}}><div className="wrap" style={{maxWidth:680}}><div className="card">
    <h3 style={{marginBottom:18}}>Send us a message</h3>
    <form onSubmit={submit}>
      <input name="name" placeholder="Full name" autoComplete="name" required/>
      <input name="email" type="email" placeholder="Email address" autoComplete="email" required/>
      <input name="phone" type="tel" placeholder="Phone number" autoComplete="tel"/>
      <textarea name="message" placeholder="Message" required/>
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
      <button className="btn p" disabled={busy} style={{padding:15,borderRadius:999,fontSize:'1rem'}}>Send message</button>
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
    <header><div className="wrap">{logo(46)}
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
    <footer><div className="wrap">{logo(38)}<small>© 2026 The Absel Funding. Trade. Grow. Earn.</small>
      <small>Trading involves risk. Challenge accounts are simulated and past performance is not a guarantee of future results.</small></div></footer>
    <AuthModal mode={mode} setMode={setMode} onDone={setUser}/>
  </>
}
