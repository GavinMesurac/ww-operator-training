import { getActiveUserId } from "./user_manager.js"
function progressKey(){ const id = getActiveUserId(); return id ? `ww_progress_${id}` : "ww_progress_guest" }
function sessionKey(){ const id = getActiveUserId(); return id ? `ww_session_${id}` : "ww_session_guest" }
function settingsKey(){ return "ww_app_settings" }
export const Storage = {
  saveProgress(progress){ localStorage.setItem(progressKey(), JSON.stringify(progress)) },
  loadProgress(){ const raw = localStorage.getItem(progressKey()); return raw ? JSON.parse(raw) : null },
  saveSession(session){ localStorage.setItem(sessionKey(), JSON.stringify(session)) },
  loadSession(){ const raw = localStorage.getItem(sessionKey()); return raw ? JSON.parse(raw) : null },
  clearSession(){ localStorage.removeItem(sessionKey()) },
  saveSettings(settings){ localStorage.setItem(settingsKey(), JSON.stringify(settings)) },
  loadSettings(){ const raw = localStorage.getItem(settingsKey()); return raw ? JSON.parse(raw) : null }
}
