import { getEvents, clearEvents } from "../core/analytics.js"

function render(){
  const events = getEvents()
  const counts = {}
  events.forEach(e => counts[e.type] = (counts[e.type] || 0) + 1)

  const ul = document.querySelector("#eventCounts")
  ul.innerHTML = ""
  Object.entries(counts).forEach(([k,v]) => {
    const li = document.createElement("li")
    li.textContent = `${k}: ${v}`
    ul.appendChild(li)
  })

  document.querySelector("#events").textContent = JSON.stringify(events.slice(-50), null, 2)
}

window.addEventListener("DOMContentLoaded", () => {
  render()
  document.querySelector("#clearBtn").addEventListener("click", () => {
    clearEvents()
    render()
  })
})
