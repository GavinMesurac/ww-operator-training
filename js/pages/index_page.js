import { getSettings, markOnboardingSeen } from "../core/settings_manager.js"
import { runBootChecks } from "../core/app_boot.js"

function buildModal(){
  const modal = document.createElement("div")
  modal.id = "onboardModal"
  modal.style.cssText = "position:fixed;inset:0;background:#0008;display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px"
  modal.innerHTML = `
    <div style="background:#fff;color:#111;padding:24px;max-width:520px;border-radius:16px">
      <h2 style="margin-top:0">Welcome to WW Operator Training</h2>
      <p>Everything is free to use. Profiles are optional and only used to save progress and improve adaptive teaching.</p>
      <p>Start with Practice or open Tests to build a quiz or exam.</p>
      <button id="closeOnboardBtn" style="padding:10px 14px;border-radius:10px;border:1px solid #ccc;cursor:pointer">Start</button>
    </div>`
  document.body.appendChild(modal)
  modal.querySelector("#closeOnboardBtn").addEventListener("click", () => {
    markOnboardingSeen()
    modal.remove()
  })
}
window.addEventListener("DOMContentLoaded", () => {
  const warnings = runBootChecks()
  const el = document.querySelector("#deployWarnings")
  if(el) el.textContent = warnings.length ? warnings.join(" ") : "No major client-side deployment issues detected."
  if(!getSettings().onboarding_seen) buildModal()
})
