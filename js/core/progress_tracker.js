import { Storage } from "./storage.js"
import { checkAchievements } from "./achievements.js"

function defaultProgress(){
  return {
    total_answered: 0,
    correct: 0,
    incorrect: 0,
    streak: 0,
    best_streak: 0,
    heatmap: {},
    errors: {},
    history: []
  }
}

export function getProgress(){
  return Storage.loadProgress() || defaultProgress()
}

export function saveProgress(progress){
  Storage.saveProgress(progress)
}

export function updateProgress({ question, correct, time_sec = 0, error_type = null }){
  const p = getProgress()
  p.total_answered++

  if(correct){
    p.correct++
    p.streak++
    p.best_streak = Math.max(p.best_streak, p.streak)
  } else {
    p.incorrect++
    p.streak = 0
  }

  ;(question.tags || []).forEach(tag => {
    if(!(tag in p.heatmap)) p.heatmap[tag] = 0.5
    p.heatmap[tag] += correct ? 0.05 : -0.10
    p.heatmap[tag] = Math.max(0, Math.min(1, p.heatmap[tag]))
  })

  if(!correct && error_type){
    ;(question.tags || []).forEach(tag => {
      if(!p.errors[tag]) p.errors[tag] = {}
      p.errors[tag][error_type] = (p.errors[tag][error_type] || 0) + 1
    })
  }

  p.history.push({
    correct,
    time_sec,
    tags: question.tags || [],
    category: question.category || "unknown",
    ts: Date.now()
  })
  if(p.history.length > 500) p.history = p.history.slice(-500)

  saveProgress(p)

  try{
    const retention = JSON.parse(localStorage.getItem("ww_retention_state") || "{}")
    checkAchievements(p, retention)
  }catch(e){}

  return p
}
