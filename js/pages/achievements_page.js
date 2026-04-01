import { listAchievements, ACHIEVEMENT_LABELS } from "../core/achievements.js"

window.addEventListener("DOMContentLoaded", () => {
  const ul = document.querySelector("#achList")
  ul.innerHTML = ""
  const items = listAchievements()
  if(!items.length){
    ul.innerHTML = "<li>No achievements unlocked yet.</li>"
    return
  }
  items.forEach(id => {
    const li = document.createElement("li")
    li.textContent = ACHIEVEMENT_LABELS[id] || id
    ul.appendChild(li)
  })
})
