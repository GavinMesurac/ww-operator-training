import { getProgress } from "../core/progress_tracker.js"
import { exportProgress, importProgress } from "../core/backup_manager.js"
import { qs } from "../ui/ui_helpers.js"

function renderProgress(){
  const p = getProgress()
  qs("#answeredText").textContent = String(p.total_answered)
  qs("#correctText").textContent = String(p.correct)
  qs("#incorrectText").textContent = String(p.incorrect)
  qs("#bestStreakText").textContent = String(p.best_streak)

  const heat = qs("#heatmapList")
  heat.innerHTML = ""
  const heatEntries = Object.entries(p.heatmap || {}).sort((a,b)=>a[1]-b[1])
  if(!heatEntries.length) heat.innerHTML = "<li>No heatmap data yet.</li>"
  heatEntries.forEach(([tag,val]) => {
    const li = document.createElement("li")
    li.textContent = `${tag}: ${val.toFixed(2)}`
    heat.appendChild(li)
  })

  const errorList = qs("#errorList")
  errorList.innerHTML = ""
  const flat = []
  Object.entries(p.errors || {}).forEach(([tag,obj]) => Object.entries(obj || {}).forEach(([etype,count]) => flat.push({tag,etype,count})))
  if(!flat.length) errorList.innerHTML = "<li>No error breakdown yet.</li>"
  flat.sort((a,b)=>b.count-a.count).forEach(item => {
    const li = document.createElement("li")
    li.textContent = `${item.tag} → ${item.etype}: ${item.count}`
    errorList.appendChild(li)
  })

  const body = qs("#historyBody")
  body.innerHTML = ""
  const hist = (p.history || []).slice(-50).reverse()
  if(!hist.length){
    const tr = document.createElement("tr")
    tr.innerHTML = `<td colspan="4">No history yet.</td>`
    body.appendChild(tr)
  }
  hist.forEach((h, idx) => {
    const tr = document.createElement("tr")
    tr.innerHTML = `<td>${idx + 1}</td><td>${h.correct ? "Correct" : "Wrong"}</td><td>${h.time_sec ?? "-"} sec</td><td>${(h.tags || []).join(", ")}</td>`
    body.appendChild(tr)
  })
}

window.addEventListener("DOMContentLoaded", () => {
  renderProgress()
  qs("#exportBtn")?.addEventListener("click", exportProgress)
  qs("#importFile")?.addEventListener("change", e => {
    if(e.target.files.length) importProgress(e.target.files[0])
  })
})
