const KEY = "ww_event_log"

function load(){
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : []
}

function save(data){
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function logEvent(type, payload = {}){
  const data = load()
  data.push({ type, payload, ts: Date.now() })
  if(data.length > 5000) data.shift()
  save(data)
}

export function getEvents(){
  return load()
}

export function clearEvents(){
  localStorage.removeItem(KEY)
}
