import { getActiveUser } from "./user_manager.js"
import { Storage } from "./storage.js"
import { getProgress } from "./progress_tracker.js"

const KEY = "ww_cloud_sim"

function loadCloud(){
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : { users: {} }
}

function saveCloud(data){
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function buildSyncPayload(){
  return {
    user: getActiveUser(),
    progress: getProgress(),
    session: Storage.loadSession(),
    synced_at: Date.now()
  }
}

export function pushToCloudSim(){
  const user = getActiveUser()
  if(!user) return { ok: false, message: "No active user." }
  const cloud = loadCloud()
  cloud.users[user.id] = buildSyncPayload()
  saveCloud(cloud)
  return { ok: true, message: `Pushed local data for ${user.name}.` }
}

export function pullFromCloudSim(){
  const user = getActiveUser()
  if(!user) return { ok: false, message: "No active user." }
  const cloud = loadCloud()
  const payload = cloud.users[user.id]
  if(!payload) return { ok: false, message: "No cloud data found for this user." }
  if(payload.progress) Storage.saveProgress(payload.progress)
  if(payload.session) Storage.saveSession(payload.session)
  return { ok: true, message: `Pulled cloud data for ${user.name}.` }
}

export function inspectCloudSim(){
  return loadCloud()
}
