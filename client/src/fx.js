/* FX layer: parallax backdrop, scroll reveals, spotlight, plan-card micro-interactions.
   Pure DOM + CSS variables. Remove the useFx() call in App.jsx and the "FX LAYER" CSS block
   and the site looks exactly as before. */
import {useLayoutEffect} from 'react'

const INNER=['/trading-rules','/affiliate-program','/contact-us']
const SPOT='.card,.feat>div'
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v))
const root=()=>document.documentElement

/* shared mutable state, filled per route by scanRoute() */
const S={sy:0,hero:null,heroCar:null,steps:[],final:null,about:null,kick:()=>{}}

/* ---------- global (mounted once) ---------- */
function initGlobal(){
  const bg=document.getElementById('fx-bg')
  if(!bg||!('IntersectionObserver' in window)) return
  const html=root()
  const reduce=matchMedia('(prefers-reduced-motion: reduce)')
  const fine=matchMedia('(hover:hover) and (pointer:fine)')
  const off=[]
  const on=(t,e,f,o)=>{t.addEventListener(e,f,o);off.push(()=>t.removeEventListener(e,f,o))}

  bg.hidden=false
  html.classList.add('fx-ready')

  /* scroll -> CSS vars (one passive listener, rAF throttled) */
  let ticking=false
  const frame=()=>{
    ticking=false
    const sy=window.scrollY,vh=innerHeight
    S.sy=sy
    html.classList.toggle('fx-scrolled',sy>20)
    if(reduce.matches) return
    const max=Math.max(1,html.scrollHeight-vh)
    bg.style.setProperty('--sy',sy.toFixed(1))
    bg.style.setProperty('--p',clamp(sy/max).toFixed(4))
    if(S.heroCar){
      const h=(S.hero&&S.hero.offsetHeight)||500
      S.heroCar.style.setProperty('--hp',clamp(sy/h).toFixed(3))
    }
    for(const st of S.steps){                       /* "road" fill + node highlight */
      const r=st.el.getBoundingClientRect()
      const sp=clamp((vh*.65-r.top)/Math.max(1,r.height))
      st.el.style.setProperty('--sp',sp.toFixed(3))
      const y=sp*r.height
      st.li.forEach(li=>li.classList.toggle('fx-hit',y>=li.offsetTop+20))
    }
    if(S.final){
      const r=S.final.getBoundingClientRect()
      S.final.style.setProperty('--fp',clamp((vh-r.top)/(vh*.85)).toFixed(3))
    }
    if(S.about){
      const r=S.about.getBoundingClientRect()
      S.about.style.setProperty('--ap',clamp(((r.top+r.height/2)-vh/2)/(vh/2),-1,1).toFixed(3))
    }
  }
  const kick=()=>{if(!ticking){ticking=true;requestAnimationFrame(frame)}}
  S.kick=kick
  on(window,'scroll',kick,{passive:true})
  on(window,'resize',kick,{passive:true})
  kick()

  /* pause CSS + canvas animation when tab hidden */
  const vis=()=>html.classList.toggle('fx-paused',document.hidden)
  on(document,'visibilitychange',vis)

  /* cursor spotlight (desktop, fine pointer only) */
  let ev=null,sraf=0
  const spot=()=>{
    sraf=0
    if(!ev) return
    const t=ev.target.closest&&ev.target.closest(SPOT)
    if(t){const r=t.getBoundingClientRect()
      t.style.setProperty('--mx',(ev.clientX-r.left).toFixed(0)+'px')
      t.style.setProperty('--my',(ev.clientY-r.top).toFixed(0)+'px')}
    ev=null
  }
  on(document,'pointermove',e=>{
    if(e.pointerType==='touch'||!fine.matches||reduce.matches) return
    ev=e;if(!sraf)sraf=requestAnimationFrame(spot)
  },{passive:true})

  /* embers + dust */
  const stopDust=startDust(bg.querySelector('.fx-dust'),reduce)
  off.push(stopDust)

  return()=>{
    off.forEach(f=>f())
    cancelAnimationFrame(sraf)
    html.classList.remove('fx-ready','fx-scrolled','fx-paused')
    bg.hidden=true
  }
}

/* ---------- particle canvas ---------- */
function startDust(cv,reduce){
  if(!cv||!cv.getContext) return()=>{}
  const ctx=cv.getContext('2d')
  let w=0,h=0,parts=[],raf=0,last=0,alive=true,speed=1
  const mk=(init)=>{
    const ember=Math.random()<.45,z=.3+Math.random()*.7   /* z = depth, deeper = slower */
    return{ember,z,seed:Math.random()*6.28,
      x:Math.random()*w,y:init?Math.random()*h:h+10,
      r:(ember?1.1:.7)+Math.random()*1.3*z,
      vx:(3+Math.random()*10)*z,vy:-(8+Math.random()*22)*z,
      a:.18+.5*z}}
  const size=()=>{
    const dpr=Math.min(devicePixelRatio||1,1.5)
    w=innerWidth;h=innerHeight
    cv.width=w*dpr;cv.height=h*dpr
    ctx.setTransform(dpr,0,0,dpr,0,0)
    speed=parseFloat(getComputedStyle(cv.parentNode).getPropertyValue('--fx-speed'))||1
    parts=Array.from({length:w<=900?14:42},()=>mk(true))
  }
  const draw=(t)=>{
    raf=0
    if(!alive||document.hidden||reduce.matches) return
    const dt=Math.min(.05,(t-last)/1000||.016);last=t
    ctx.clearRect(0,0,w,h)
    const off=S.sy*.12
    for(const p of parts){
      p.x+=p.vx*dt*speed;p.y+=p.vy*dt*speed
      if(p.y<-12||p.x>w+12){Object.assign(p,mk(false));p.x=Math.random()*w}
      /* different rate than the backdrop image: depth parallax */
      let y=(p.y+off*p.z)%(h+24);if(y<0)y+=h+24
      y-=12
      const fl=p.ember?.7+.3*Math.sin(t/400+p.seed):1
      if(p.ember){
        ctx.fillStyle='rgba(255,45,45,1)'
        ctx.globalAlpha=p.a*fl*.16;ctx.beginPath();ctx.arc(p.x,y,p.r*4,0,6.283);ctx.fill()
        ctx.globalAlpha=p.a*fl
      }else{ctx.fillStyle='rgba(225,225,230,1)';ctx.globalAlpha=p.a*.7}
      ctx.beginPath();ctx.arc(p.x,y,p.r,0,6.283);ctx.fill()
    }
    raf=requestAnimationFrame(draw)
  }
  const run=()=>{if(!raf&&alive&&!document.hidden&&!reduce.matches){last=performance.now();raf=requestAnimationFrame(draw)}}
  const stop=()=>{cancelAnimationFrame(raf);raf=0}
  const onVis=()=>document.hidden?stop():run()
  const onRM=()=>{if(reduce.matches){stop();ctx.clearRect(0,0,w,h)}else run()}
  let rs=0
  const onResize=()=>{cancelAnimationFrame(rs);rs=requestAnimationFrame(size)}
  size();run()
  document.addEventListener('visibilitychange',onVis)
  addEventListener('resize',onResize,{passive:true})
  reduce.addEventListener?.('change',onRM)
  return()=>{alive=false;stop();cancelAnimationFrame(rs)
    document.removeEventListener('visibilitychange',onVis)
    removeEventListener('resize',onResize)
    reduce.removeEventListener?.('change',onRM)}
}

/* ---------- per-route: tag + observe reveals, collect parallax targets ---------- */
function scanRoute(pathname){
  const html=root()
  const bg=document.getElementById('fx-bg')
  if(!bg||!html.classList.contains('fx-ready')) return
  bg.classList.toggle('is-inner',INNER.includes(pathname))

  const io=new IntersectionObserver(es=>{
    for(const e of es) if(e.isIntersecting){e.target.classList.add('fx-in');io.unobserve(e.target)}
  },{threshold:.15,rootMargin:'0px 0px -8% 0px'})
  const cleanups=[()=>io.disconnect()]

  const seen=new WeakSet()
  const tag=(el,variant,delay)=>{
    if(!el||seen.has(el)||el.classList.contains('fx-in')||el.closest('.hero')||el.closest('#planGrid')) return
    seen.add(el)
    el.classList.add('fx-r')
    if(variant) el.dataset.fx=variant
    if(delay) el.style.setProperty('--fx-d',delay+'ms')
    io.observe(el)
  }
  /* stagger by sibling index within the same parent, capped */
  const group=(sel,variant,step=80,cap=6)=>{
    const idx=new Map()
    document.querySelectorAll(sel).forEach(el=>{
      const p=el.parentNode,i=idx.get(p)||0;idx.set(p,i+1)
      tag(el,variant,Math.min(i,cap)*step)
    })
  }
  const q=s=>document.querySelectorAll(s)

  /* headings: animate each line span; if the h2 has loose text, animate the whole h2 */
  q('main h2,.final h2').forEach(h=>{
    const loose=[...h.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())
    if(loose) tag(h,'head',0)
    else h.querySelectorAll(':scope>span').forEach(s=>tag(s,'head',s.classList.contains('red')?80:0))
  })
  q('main .pt h1').forEach(h=>tag(h,'up',0))
  q('main .eyebrow,main p.sub,.final p').forEach(el=>tag(el,'up',0))
  group('main .card:not(.about),main .feat>div,main .strip>div,main .steps>li,main details','pop')
  q('main .about').forEach(el=>tag(el,'pop',0))
  q('.about p,.about>.btn').forEach((el,i)=>tag(el,'up',120+i*90))
  q('.final .btn').forEach(el=>tag(el,'up',160))
  q('.plan-grid,.certs').forEach(el=>tag(el,'up',0))
  group('main .cmp tr','row',70,10)
  q('footer>.wrap').forEach((el,i)=>tag(el,'up',i*120))

  /* images: slide in from the side they sit on */
  q('main .side-img,main .mid-img').forEach(img=>{
    const wrap=img.closest('.wrap')||img.parentNode
    const r=img.getBoundingClientRect(),wr=wrap.getBoundingClientRect()
    const off=(r.left+r.width/2)-(wr.left+wr.width/2)
    tag(img,off>wr.width*.15?'right':off<-wr.width*.15?'left':'up',0)
  })

  /* scroll-linked targets */
  S.hero=document.querySelector('.hero')
  S.heroCar=document.querySelector('.hero-car')
  S.steps=[...q('.steps')].map(el=>{
    if(!el.querySelector(':scope>.fx-car')){const c=document.createElement('i');c.className='fx-car';c.setAttribute('aria-hidden','true');el.appendChild(c)}
    return{el,li:[...el.querySelectorAll(':scope>li')]}})
  S.final=document.querySelector('.final')
  S.about=document.querySelector('#about')
  S.kick()

  cleanups.push(...certNav())

  /* plan card: sliding pill indicator, content swap, price count */
  const grid=document.getElementById('planGrid')
  if(grid) cleanups.push(watchPlan(grid))

  return()=>{
    cleanups.forEach(f=>f())
    S.hero=S.heroCar=S.final=S.about=null;S.steps=[]
  }
}


/* ---------- certificate marquee: prev/next arrows nudge the running track ---------- */
function certNav(){
  const marq=document.querySelector('.cert-marq'),track=marq&&marq.querySelector('.cert-track')
  if(!track||marq.nextElementSibling?.classList.contains('fx-certnav')) return []
  const bar=document.createElement('div')
  bar.className='fx-certnav'
  bar.innerHTML='<button type="button" aria-label="Previous certificates">&larr;</button><button type="button" aria-label="Next certificates">&rarr;</button>'
  marq.after(bar)
  let raf=0
  const nudge=dir=>{
    const step=268                                   /* one certificate + gap */
    const anim=track.getAnimations().find(a=>a.animationName==='marq')
    cancelAnimationFrame(raf)
    if(!anim){marq.scrollBy({left:dir*step,behavior:'smooth'});return}  /* reduced motion: animation is off */
    const dur=anim.effect.getComputedTiming().duration
    const dist=track.scrollWidth/2+9,ms=dir*step/dist*dur
    const t0=performance.now(),start=anim.currentTime%dur
    const run=t=>{
      const k=clamp((t-t0)/450),e=1-Math.pow(1-k,3)
      anim.currentTime=(((start+ms*e)%dur)+dur)%dur
      if(k<1)raf=requestAnimationFrame(run)
    }
    raf=requestAnimationFrame(run)
  }
  const [p,n]=bar.children
  p.onclick=()=>nudge(-1);n.onclick=()=>nudge(1)
  return[()=>{cancelAnimationFrame(raf);bar.remove()}]
}

/* ---------- plan grid (React portal content changes under us) ---------- */
function watchPlan(grid){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)')
  let shown=null,lastName=null,craf=0,expect=null,sraf=0

  const place=pills=>{
    const b=pills.querySelector('button.on');if(!b) return
    pills.style.setProperty('--ix',b.offsetLeft+'px')
    pills.style.setProperty('--iy',b.offsetTop+'px')
    pills.style.setProperty('--iw',b.offsetWidth+'px')
    pills.style.setProperty('--ih',b.offsetHeight+'px')
    if(!pills.hasAttribute('data-fx-ind')){void pills.offsetWidth;pills.setAttribute('data-fx-ind','')}
  }
  const lastText=el=>{let n=el.lastChild;while(n&&n.nodeType!==3)n=n.lastChild;return n}
  const swap=card=>{card.classList.remove('fx-swap');void card.offsetWidth;card.classList.add('fx-swap')}
  const count=(node,from,to)=>{
    cancelAnimationFrame(craf)
    if(reduce.matches||from===to){node.data=String(to);expect=null;shown=to;return}
    const t0=performance.now(),D=420
    const step=t=>{
      const k=clamp((t-t0)/D),e=1-Math.pow(1-k,3)
      const v=k>=1?to:Math.round(from+(to-from)*e)
      expect=String(v);node.data=expect;shown=v
      if(k<1)craf=requestAnimationFrame(step)
    }
    craf=requestAnimationFrame(step)
  }
  const sync=()=>{
    grid.querySelectorAll('.pills').forEach(place)
    const card=grid.querySelector('.pcard');if(!card) return
    const pe=card.querySelector('.pprice'),nm=card.querySelector('.phead b')
    const node=pe&&lastText(pe)
    if(!node) return
    if(expect!==null&&node.data===expect) return          /* our own write */
    const val=parseInt(node.data,10),name=nm&&nm.textContent
    if(shown===null){shown=val;lastName=name;return}
    if(name!==lastName){lastName=name;swap(card)}
    if(!isNaN(val)&&val!==shown) count(node,shown,val)
  }
  const mo=new MutationObserver(sync)
  mo.observe(grid,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class']})
  const rs=()=>{cancelAnimationFrame(sraf);sraf=requestAnimationFrame(()=>grid.querySelectorAll('.pills').forEach(place))}
  addEventListener('resize',rs,{passive:true})
  document.fonts&&document.fonts.ready.then(rs)
  sync()
  return()=>{mo.disconnect();removeEventListener('resize',rs);cancelAnimationFrame(craf);cancelAnimationFrame(sraf)}
}

/* ---------- hook ---------- */
export function useFx(pathname){
  /* layout effects: tags land before first paint, so hidden states never flash */
  useLayoutEffect(()=>{try{return initGlobal()}catch(e){root().classList.remove('fx-ready')}},[])
  useLayoutEffect(()=>{try{return scanRoute(pathname)}catch(e){root().classList.remove('fx-ready')}},[pathname])
}
