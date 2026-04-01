import { getSettings, saveSettings, updateSetting } from "../core/settings_manager.js"

function render(){
  const s = getSettings()
  document.querySelector("#soundToggle").checked = !!s.sound_effects
  document.querySelector("#motionToggle").checked = !!s.reduced_motion
  document.querySelector("#devToggle").checked = !!s.dev_mode
  document.querySelector("#preferredMode").value = s.preferred_mode || "practice"
}

window.addEventListener("DOMContentLoaded", () => {
  render()
  document.querySelector("#saveSettingsBtn").addEventListener("click", () => {
    const s = getSettings()
    s.sound_effects = document.querySelector("#soundToggle").checked
    s.reduced_motion = document.querySelector("#motionToggle").checked
    s.dev_mode = document.querySelector("#devToggle").checked
    s.preferred_mode = document.querySelector("#preferredMode").value
    saveSettings(s)
    document.querySelector("#settingsStatus").textContent = "Settings saved."
  })
  document.querySelector("#resetOnboardingBtn").addEventListener("click", () => {
    updateSetting("onboarding_seen", false)
    document.querySelector("#settingsStatus").textContent = "Onboarding reset."
  })
})
