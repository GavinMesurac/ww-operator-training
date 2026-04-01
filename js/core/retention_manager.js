const KEY = "ww_retention_state"

function todayString(){
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`
}

function defaultState(){
  return {
    daily_goal: 10,
    today_answered: 0,
    today_date: todayString(),
    daily_streak: 0,
    best_daily_streak: 0,
    milestones_hit: []
  }
}

export function getRetentionState(){
  const raw = localStorage.getItem(KEY)
  const state = raw ? JSON.parse(raw) : defaultState()
  const today = todayString()
  if(state.today_date !== today){
    const prev = new Date(state.today_date)
    const now = new Date(today)
    const diffDays = Math.round((now - prev) / 86400000)
    if(diffDays === 1 && state.today_answered >= state.daily_goal){
      state.daily_streak += 1
    } else if(diffDays > 1){
      state.daily_streak = 0
    }
    state.today_answered = 0
    state.today_date = today
    state.best_daily_streak = Math.max(state.best_daily_streak, state.daily_streak)
    saveRetentionState(state)
  }
  return state
}

export function saveRetentionState(state){
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function recordAnswered(count = 1){
  const state = getRetentionState()
  state.today_answered += count
  if(state.today_answered >= state.daily_goal){
    const id = `goal_${state.today_date}`
    if(!state.milestones_hit.includes(id)) state.milestones_hit.push(id)
  }
  saveRetentionState(state)
  return state
}

export function setDailyGoal(goal){
  const state = getRetentionState()
  state.daily_goal = Math.max(1, parseInt(goal || 10, 10))
  saveRetentionState(state)
  return state
}

export function getGoalProgress(){
  const s = getRetentionState()
  const goal_percent = Math.min(100, Math.round((s.today_answered / s.daily_goal) * 100))
  return { ...s, goal_percent }
}
