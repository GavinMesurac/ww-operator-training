import { getGoalProgress, setDailyGoal, recordAnswered } from "../core/retention_manager.js"

function render(){
  const s = getGoalProgress()
  document.querySelector("#todayAnswered").textContent = String(s.today_answered)
  document.querySelector("#dailyGoal").textContent = String(s.daily_goal)
  document.querySelector("#dailyStreak").textContent = String(s.daily_streak)
  document.querySelector("#bestDailyStreak").textContent = String(s.best_daily_streak)
  document.querySelector("#goalText").textContent = `${s.today_answered} / ${s.daily_goal}`
  document.querySelector("#goalBar").style.width = `${s.goal_percent}%`
  document.querySelector("#goalInput").value = s.daily_goal

  const ul = document.querySelector("#milestoneList")
  ul.innerHTML = ""
  if(!(s.milestones_hit || []).length){
    ul.innerHTML = "<li>No milestones yet.</li>"
  } else {
    s.milestones_hit.slice().reverse().forEach(m => {
      const li = document.createElement("li")
      li.textContent = m
      ul.appendChild(li)
    })
  }
}

window.addEventListener("DOMContentLoaded", () => {
  render()
  document.querySelector("#saveGoalBtn").addEventListener("click", () => {
    setDailyGoal(document.querySelector("#goalInput").value)
    render()
  })
  document.querySelector("#addOneBtn").addEventListener("click", () => {
    recordAnswered(1)
    render()
  })
})
