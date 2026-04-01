const KEY = "ww_app_settings"

function defaults(){
  return {
    onboarding_seen: false,
    sound_effects: false,
    reduced_motion: false,
    dev_mode: true,
    preferred_mode: "practice",
    updated_at: Date.now()
  }
}

export function getSettings(){
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : defaults()
}

export function saveSettings(settings){
  settings.updated_at = Date.now()
  localStorage.setItem(KEY, JSON.stringify(settings))
  return settings
}

export function updateSetting(key, value){
  const s = getSettings()
  s[key] = value
  return saveSettings(s)
}

export function markOnboardingSeen(){
  return updateSetting("onboarding_seen", true)
}
