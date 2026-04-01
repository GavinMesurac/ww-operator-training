import { ensureDefaultUser, getActiveUser, listUsers, createUser, setActiveUser } from "../core/user_manager.js"
import { getEvents, clearEvents } from "../core/analytics.js"
import { pushToCloudSim, pullFromCloudSim, inspectCloudSim } from "../core/cloud_sync.js"
import { listAchievements, ACHIEVEMENT_LABELS } from "../core/achievements.js"

function renderProfiles(){
  ensureDefaultUser()
  const active = getActiveUser()
  document.querySelector("#activeUserBox").textContent = active ? `${active.name} (${active.id})` : "Guest mode active. Create a profile to save progress."
  const list = document.querySelector("#userList")
  list.innerHTML = ""
  listUsers().forEach(user => {
    const card = document.createElement("div")
    card.className = "card half"
    const isActive = active && active.id === user.id
    card.innerHTML = `<h3>${user.name}</h3><div class="small">ID: ${user.id}</div><div class="small">Created: ${new Date(user.created_at).toLocaleString()}</div><div class="small">Last active: ${new Date(user.last_active_at).toLocaleString()}</div><div class="row" style="margin-top:10px"><button class="btn ${isActive ? "good" : ""}" data-user="${user.id}">${isActive ? "Active" : "Switch To This Profile"}</button></div>`
    list.appendChild(card)
  })
  list.querySelectorAll("[data-user]").forEach(btn => {
    if(btn.textContent !== "Active"){
      btn.addEventListener("click", () => {
        setActiveUser(btn.dataset.user)
        location.reload()
      })
    }
  })
}
function renderAnalytics(){
  const events = getEvents()
  const counts = {}
  events.forEach(e => counts[e.type] = (counts[e.type] || 0) + 1)
  const ul = document.querySelector("#eventCounts")
  ul.innerHTML = ""
  if(!Object.keys(counts).length) ul.innerHTML = "<li>No analytics yet.</li>"
  Object.entries(counts).forEach(([k,v]) => {
    const li = document.createElement("li")
    li.textContent = `${k}: ${v}`
    ul.appendChild(li)
  })
  document.querySelector("#events").textContent = JSON.stringify(events.slice(-25), null, 2)
}
function renderAchievements(){
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
}
window.addEventListener("DOMContentLoaded", () => {
  renderProfiles()
  renderAnalytics()
  renderAchievements()
  document.querySelector("#createUserBtn").addEventListener("click", () => {
    const name = document.querySelector("#newUserName").value.trim()
    createUser(name || "Operator")
    location.reload()
  })
  document.querySelector("#clearBtn").addEventListener("click", () => { clearEvents(); renderAnalytics() })
  document.querySelector("#pushBtn").addEventListener("click", () => { const res = pushToCloudSim(); document.querySelector("#syncStatus").textContent = res.message })
  document.querySelector("#pullBtn").addEventListener("click", () => { const res = pullFromCloudSim(); document.querySelector("#syncStatus").textContent = res.message })
  document.querySelector("#inspectBtn").addEventListener("click", () => { document.querySelector("#cloudPreview").textContent = JSON.stringify(inspectCloudSim(), null, 2); document.querySelector("#syncStatus").textContent = "Cloud sim data loaded." })
})
