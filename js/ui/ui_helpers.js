export function qs(sel){ return document.querySelector(sel) }
export function setText(selOrEl, value){
  const el = typeof selOrEl === "string" ? qs(selOrEl) : selOrEl
  if(el) el.textContent = value
}
export function renderChoices(container, choices, onSelect){
  if(!container) return
  container.innerHTML = ""
  choices.forEach((choice, idx) => {
    const btn = document.createElement("button")
    btn.className = "choice-btn"
    btn.textContent = choice
    btn.addEventListener("click", () => onSelect(idx))
    container.appendChild(btn)
  })
}
export function renderQuestion(target, question){
  setText(target.questionEl, question.question)
  renderChoices(target.choicesEl, question.choices, target.onSelect)
  if(target.metaEl){
    target.metaEl.textContent = ""
    target.metaEl.classList.add("hidden")
  }
  if(target.explanationEl){
    target.explanationEl.textContent = ""
    target.explanationEl.classList.add("hidden")
  }
}
export function showExplanation(el, text){
  if(!el) return
  el.textContent = text
  el.classList.remove("hidden")
}
export function markChoices(container, correctIndex, selectedIndex){
  if(!container) return
  const buttons = [...container.querySelectorAll(".choice-btn")]
  buttons.forEach((btn, idx) => {
    btn.disabled = true
    if(idx === correctIndex) btn.classList.add("correct")
    if(idx === selectedIndex && idx !== correctIndex) btn.classList.add("wrong")
    if(idx === selectedIndex) btn.classList.add("selected")
  })
}
export function renderScoreBox(el, text){
  if(!el) return
  el.textContent = text
  el.classList.remove("hidden")
}
