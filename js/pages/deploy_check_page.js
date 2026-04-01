import { runBootChecks } from "../core/app_boot.js"

window.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector("#deployWarnings")
  if(!el) return
  const warnings = runBootChecks()
  el.textContent = warnings.length ? warnings.join(" ") : "No major client-side deployment issues detected. Static hosting should work."
})
