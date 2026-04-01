export function flashCorrect(el){
  if(!el) return
  el.classList.add("flash-correct")
  setTimeout(()=>el.classList.remove("flash-correct"), 500)
}

export function flashWrong(el){
  if(!el) return
  el.classList.add("flash-wrong")
  setTimeout(()=>el.classList.remove("flash-wrong"), 500)
}

export function updateStreakDisplay(el, streak){
  if(el) el.textContent = `🔥 Streak: ${streak}`
}
