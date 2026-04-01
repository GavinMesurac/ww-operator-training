import { buildRecommendations, buildStudyPlan } from "../core/recommendation_engine.js"

window.addEventListener("DOMContentLoaded", () => {
  const recs = buildRecommendations(5)
  const plan = buildStudyPlan()

  const recList = document.querySelector("#recList")
  recList.innerHTML = ""
  recs.forEach(rec => {
    const li = document.createElement("li")
    li.textContent = rec.message
    recList.appendChild(li)
  })

  const planList = document.querySelector("#planList")
  planList.innerHTML = ""
  plan.forEach(item => {
    const li = document.createElement("li")
    li.textContent = `${item.step}. ${item.action}`
    planList.appendChild(li)
  })
})
