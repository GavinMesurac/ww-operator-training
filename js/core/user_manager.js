const USERS_KEY = "ww_users"
const ACTIVE_USER_KEY = "ww_active_user"

function loadUsersRaw(){
  const raw = localStorage.getItem(USERS_KEY)
  return raw ? JSON.parse(raw) : {}
}

function saveUsersRaw(users){
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function listUsers(){
  return Object.values(loadUsersRaw()).sort((a,b)=>b.last_active_at-a.last_active_at)
}

export function getActiveUserId(){
  return localStorage.getItem(ACTIVE_USER_KEY)
}

export function getActiveUser(){
  const id = getActiveUserId()
  if(!id) return null
  return loadUsersRaw()[id] || null
}

export function setActiveUser(id){
  localStorage.setItem(ACTIVE_USER_KEY, id)
  touchActiveUser(id)
}

export function createUser(name="Main User"){
  const users = loadUsersRaw()
  const id = "user_" + Math.random().toString(36).slice(2,10)
  users[id] = {
    id,
    name,
    created_at: Date.now(),
    last_active_at: Date.now()
  }
  saveUsersRaw(users)
  setActiveUser(id)
  return users[id]
}

export function touchActiveUser(id = null){
  const userId = id || getActiveUserId()
  if(!userId) return
  const users = loadUsersRaw()
  if(users[userId]){
    users[userId].last_active_at = Date.now()
    saveUsersRaw(users)
  }
}

export function ensureDefaultUser(){
  let active = getActiveUser()
  if(active) return active
  const users = listUsers()
  if(users.length){
    setActiveUser(users[0].id)
    return users[0]
  }
  return createUser("Main User")
}
