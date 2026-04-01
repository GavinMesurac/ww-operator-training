import { createSession, saveSession, nextQuestion, prevQuestion, toggleMark } from "../core/session_controller.js"
import { generateQuestion } from "../generators/master_generator.js"
import { recordAnswered } from "../core/retention_manager.js"
import { logEvent } from "../core/analytics.js"
import { qs, setText, renderScoreBox } from "../ui/ui_helpers.js"

let session = null
let timerId = null

function currentQuestion(){
  return (!session || !session.questions.length) ? null : session.questions[session.current_index]
}
function assignPilotFlags(questions, pilotCount = 10){
  const picks = new Set()
  while(picks.size < Math.min(pilotCount, questions.length)) picks.add(Math.floor(Math.random() * questions.length))
  return questions.map((q, idx) => ({ ...q, pilot: picks.has(idx) }))
}
function getRemainingSeconds(){
  const elapsed = Math.floor((Date.now() - session.started_at) / 1000)
  return Math.max(0, session.settings.time_limit_sec - elapsed)
}
function tick(){
  const remain = getRemainingSeconds()
  const h = String(Math.floor(remain / 3600)).padStart(2, "0")
  const m = String(Math.floor((remain % 3600) / 60)).padStart(2, "0")
  const s = String(remain % 60).padStart(2, "0")
  setText("#timerText", `${h}:${m}:${s}`)
  if(remain <= 0) submitExam(true)
}
function unansweredCount(){
  return session.questions.filter(q => session.answers[q.id] === undefined).length
}
function refreshHeader(){
  if(session) setText("#progressText", `Question ${session.current_index + 1} of ${session.questions.length}`)
  const q = currentQuestion()
  if(qs("#flagStatus")) qs("#flagStatus").textContent = q && session.marked.includes(q.id) ? "Flagged for review" : "Not flagged"
}
function renderCurrent(){
  const q = currentQuestion()
  if(!q) return
  qs("#questionText").textContent = q.question
  const choices = qs("#choices")
  choices.innerHTML = ""
  q.choices.forEach((choice, idx) => {
    const btn = document.createElement("button")
    btn.className = "exam-choice"
    btn.textContent = choice
    const selected = session.answers[q.id]
    if(session.completed_at){
      btn.disabled = true
      if(idx === q.correct_index) btn.classList.add("correct")
      if(idx === selected && idx !== q.correct_index) btn.classList.add("wrong")
    } else {
      if(selected === idx) btn.style.outline = "3px solid #7f8c8d"
      btn.addEventListener("click", () => selectAnswer(idx))
    }
    choices.appendChild(btn)
  })
  const exp = qs("#explanation")
  const selected = session.answers[q.id]
  if(session.completed_at && selected !== undefined){
    exp.textContent = q.explanation
    exp.classList.remove("hidden")
  } else {
    exp.textContent = ""
    exp.classList.add("hidden")
  }
  refreshHeader()
}
function selectAnswer(idx){
  const q = currentQuestion()
  if(!q || session.completed_at) return
  const firstAnswer = session.answers[q.id] === undefined
  session.answers[q.id] = idx
  saveSession(session)
  if(firstAnswer){
    recordAnswered(1)
    logEvent("exam_answer_recorded", { category: q.category || "unknown" })
  }
  renderCurrent()
}
function buildReview(){
  const review = qs("#reviewList")
  review.innerHTML = ""
  session.questions.forEach((q, i) => {
    const chosen = session.answers[q.id]
    const card = document.createElement("div")
    card.className = "card half"
    card.innerHTML = `<h3>${i + 1}. ${q.question}${q.pilot ? " <span class='small'>(pilot)</span>" : ""}</h3><div class="small"><b>Your answer:</b> ${chosen !== undefined ? q.choices[chosen] : "No answer"}</div><div class="small"><b>Correct answer:</b> ${q.choices[q.correct_index]}</div><div class="small"><b>Explanation:</b> ${q.explanation}</div>`
    review.appendChild(card)
  })
  qs("#reviewCard").classList.remove("hidden")
}
function finalizeExam(){
  clearInterval(timerId)
  let gradedCorrect = 0, gradedTotal = 0
  session.questions.forEach(q => {
    if(!q.pilot){
      gradedTotal++
      const chosen = session.answers[q.id]
      const correct = chosen === q.correct_index
      if(correct) gradedCorrect++
      logEvent("exam_answer_graded", { category: q.category || "unknown", correct })
    }
  })
  session.score.correct = gradedCorrect
  session.score.incorrect = gradedTotal - gradedCorrect
  session.score.percent = Math.round((gradedCorrect / gradedTotal) * 100)
  session.completed_at = Date.now()
  saveSession(session)
  renderScoreBox(qs("#scoreBox"), `Exam complete. Score: ${gradedCorrect}/${gradedTotal} (${session.score.percent}%)`)
  renderCurrent()
  buildReview()
}
function submitExam(force = false){
  if(!session || session.completed_at) return
  const unanswered = unansweredCount()
  const warningBox = qs("#submitWarningBox")
  if(force){
    warningBox.textContent = unanswered > 0 ? `Time expired. You had ${unanswered} unanswered question${unanswered === 1 ? "" : "s"}. Submitting now.` : "Time expired. Submitting now."
    warningBox.classList.remove("hidden")
    finalizeExam()
    return
  }
  const msg = unanswered > 0 ? `Are you sure you want to submit? You have ${unanswered} unanswered question${unanswered === 1 ? "" : "s"}.` : "Are you sure you want to submit this exam?"
  warningBox.textContent = msg
  warningBox.classList.remove("hidden")
  if(window.confirm(msg)) finalizeExam()
}
window.addEventListener("DOMContentLoaded", () => {
  const setup = JSON.parse(sessionStorage.getItem("ww_exam_setup") || '{"count":"110","difficulty":""}')
  session = createSession("exam", { ...setup, time_limit_sec: 7200 })
  const generated = []
  const count = 110
  for(let i = 0; i < count; i++){
    const cfg = { type: "mixed", language: "exam" }
    if(setup.difficulty) cfg.difficulty = setup.difficulty
    generated.push(generateQuestion(cfg))
  }
  session.questions = assignPilotFlags(generated, 10)
  saveSession(session)
  timerId = setInterval(tick, 1000)
  tick()
  renderCurrent()
  qs("#nextBtn")?.addEventListener("click", () => { nextQuestion(session); renderCurrent() })
  qs("#prevBtn")?.addEventListener("click", () => { prevQuestion(session); renderCurrent() })
  qs("#markBtn")?.addEventListener("click", () => { const q = currentQuestion(); if(q){ toggleMark(session, q.id); refreshHeader() } })
  qs("#submitBtn")?.addEventListener("click", () => submitExam(false))
})
