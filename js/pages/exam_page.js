import { createSession, saveSession, nextQuestion, prevQuestion, toggleMark } from "../core/session_controller.js"
import { generateQuestion } from "../generators/master_generator.js"
import { buildExamQuestionConfig } from "../core/exam_blueprint.js"
import { canUse, featureMessage } from "../core/subscription_manager.js"
import { recordAnswered } from "../core/retention_manager.js"
import { logEvent } from "../core/analytics.js"
import { qs, setText, renderQuestion, renderScoreBox } from "../ui/ui_helpers.js"

let session = null
let timerId = null

function buildExamConfig(){
  return { count:110, time_limit_sec:7200, allow_backtrack:true, show_explanations:false, graded_count:100, pilot_count:10 }
}

function currentQuestion(){
  return (!session || !session.questions.length) ? null : session.questions[session.current_index]
}

function assignPilotFlags(questions, pilotCount = 10){
  const picks = new Set()
  while(picks.size < pilotCount) picks.add(Math.floor(Math.random() * questions.length))
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
  if(remain <= 0) submitExam()
}

function refreshHeader(){
  if(session) setText("#progressText", `Question ${session.current_index + 1} of ${session.questions.length}`)
}

function renderCurrent(){
  const q = currentQuestion()
  if(!q) return
  renderQuestion({
    questionEl: qs("#questionText"),
    choicesEl: qs("#choices"),
    explanationEl: qs("#explanation"),
    metaEl: qs("#meta"),
    onSelect: selectAnswer
  }, q)
  const currentChoice = session.answers[q.id]
  if(currentChoice !== undefined){
    const buttons = [...qs("#choices").querySelectorAll(".choice-btn")]
    buttons.forEach((btn, idx) => { if(idx === currentChoice) btn.classList.add("correct") })
  }
  refreshHeader()
}

function selectAnswer(idx){
  const q = currentQuestion()
  if(!q) return
  session.answers[q.id] = idx
  saveSession(session)
  recordAnswered(1)
  logEvent("exam_answer", { correct: idx === q.correct_index, category: q.category || "unknown" })
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

function submitExam(){
  if(!session) return
  clearInterval(timerId)
  let gradedCorrect = 0, gradedTotal = 0
  session.questions.forEach(q => {
    if(!q.pilot){
      gradedTotal++
      if(session.answers[q.id] === q.correct_index) gradedCorrect++
    }
  })
  session.score.correct = gradedCorrect
  session.score.incorrect = gradedTotal - gradedCorrect
  session.score.percent = Math.round((gradedCorrect / gradedTotal) * 100)
  session.completed_at = Date.now()
  saveSession(session)
  renderScoreBox(qs("#scoreBox"), `Exam complete. Score: ${gradedCorrect}/${gradedTotal} (${session.score.percent}%)`)
  buildReview()
}

function startExam(){
  if(!canUse("pro_full_exams")){
    alert(featureMessage("pro_full_exams"))
    return
  }
  session = createSession("exam", buildExamConfig())
  const generated = []
  for(let i = 0; i < 110; i++){
    generated.push(generateQuestion(buildExamQuestionConfig()))
  }
  session.questions = assignPilotFlags(generated, 10)
  saveSession(session)
  qs("#reviewCard").classList.add("hidden")
  clearInterval(timerId)
  timerId = setInterval(tick, 1000)
  tick()
  renderCurrent()
}

window.addEventListener("DOMContentLoaded", () => {
  qs("#startExamBtn")?.addEventListener("click", startExam)
  qs("#nextBtn")?.addEventListener("click", () => { if(session){ nextQuestion(session); renderCurrent() } })
  qs("#prevBtn")?.addEventListener("click", () => { if(session){ prevQuestion(session); renderCurrent() } })
  qs("#markBtn")?.addEventListener("click", () => { const q = currentQuestion(); if(q) toggleMark(session, q.id) })
  qs("#submitBtn")?.addEventListener("click", submitExam)
})
