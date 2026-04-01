const KEY = "ww_achievements"

function load(){
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : { unlocked: [] }
}

function save(data){
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function listAchievements(){
  return load().unlocked
}

export function unlock(id){
  const data = load()
  if(!data.unlocked.includes(id)){
    data.unlocked.push(id)
    save(data)
    return true
  }
  return false
}

export function checkAchievements(progress, retention){
  const ids = []
  if((progress.correct || 0) >= 50) ids.push("50_correct")
  if((progress.best_streak || 0) >= 10) ids.push("streak_10")
  if((progress.total_answered || 0) >= 200) ids.push("200_answered")
  if((retention.daily_streak || 0) >= 3) ids.push("daily_3")
  return ids.filter(unlock)
}

export const ACHIEVEMENT_LABELS = {
  "50_correct": "50 Correct Answers",
  "streak_10": "10 Answer Streak",
  "200_answered": "200 Questions Answered",
  "daily_3": "3-Day Daily Streak"
}
