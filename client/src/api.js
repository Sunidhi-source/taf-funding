export const getToken=()=>localStorage.getItem('taf_token')
export async function api(path,body){
  const t=getToken()
  const r=await fetch('/api'+path,{method:body?'POST':'GET',headers:{'Content-Type':'application/json',...(t&&{Authorization:'Bearer '+t})},body:body&&JSON.stringify(body)})
  const j=await r.json().catch(()=>({}))
  if(!r.ok)throw new Error(j.message||'Request failed')
  return j
}
