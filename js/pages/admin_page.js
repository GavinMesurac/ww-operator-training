import { generateQuestion, generateQuestionSet } from "../generators/master_generator.js"
import { canUse, featureMessage } from "../core/subscription_manager.js"

let lastPayload = null

function cfg(countOverride = null){
  return {
    type: document.querySelector("#typeSel").value,
    family: document.querySelector("#mathSel").value,
    category: document.querySelector("#catSel").value,
    difficulty: document.querySelector("#diffSel").value || undefined,
    language: document.querySelector("#langSel").value,
    count: countOverride ?? parseInt(document.querySelector("#countInput").value || "25", 10)
  }
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#oneBtn").addEventListener("click", () => {
    lastPayload = generateQuestion(cfg(1))
    document.querySelector("#preview").textContent = JSON.stringify(lastPayload, null, 2)
    document.querySelector("#statusBox").textContent = "Generated 1 question."
  })

  document.querySelector("#bulkBtn").addEventListener("click", () => {
    if(!canUse("pro_admin_export")){
      document.querySelector("#statusBox").textContent = featureMessage("pro_admin_export")
      return
    }
    const count = Math.max(1, Math.min(500, parseInt(document.querySelector("#countInput").value || "25", 10)))
    lastPayload = generateQuestionSet(cfg(count))
    document.querySelector("#preview").textContent = JSON.stringify(lastPayload.slice(0, 5), null, 2)
    document.querySelector("#statusBox").textContent = `Generated ${count} questions. Showing first 5.`
  })

  document.querySelector("#downloadBtn").addEventListener("click", () => {
    if(!canUse("pro_admin_export")){
      document.querySelector("#statusBox").textContent = featureMessage("pro_admin_export")
      return
    }
    if(!lastPayload){
      document.querySelector("#statusBox").textContent = "Generate something first."
      return
    }
    const blob = new Blob([JSON.stringify(lastPayload, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "ww_generated_questions.json"
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  })
})
