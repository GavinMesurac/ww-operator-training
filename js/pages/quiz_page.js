import { createSession, loadSession, saveSession, answerQuestion, nextQuestion, prevQuestion, scoreSession } from "../core/session_controller.js"
import { updateProgress } from "../core/progress_tracker.js"
import { generateQuestionSet } from "../generators/master_generator.js"
import { canUse, featureMessage } from "../core/subscription_manager.js"
import { recordAnswered } from "../core/retention_manager.js"
import { logEvent } from "../core/analytics.js"
import { qs, setText, renderQuestion, showExplanation, markChoices, renderScoreBox } from "../ui/ui_helpers.js"

let session = null
let questionStart = 0

function buildQuizConfig(){
  let count = parseInt(qs("#countSel")?.value || "10", 10)
  if(count > 10 && !canUse("pro_quiz_lengths")){
    alert(featureMessage("pro_quiz_lengths"))
    count = 10
    if(qs("#countSel")) qs("#countSel").value = "10"
  }
  return { count, allow_backtrack: true, show_explanations: true }
}

function getGenerationConfig(count){
  return {
    count,
    type: qs("#modeSel")?.value || "mixed",
    family: qs("#mathSel")?.value || "any",
    category: qs("#nonMathSel")?.value || "any",
    language: "practice"
  }
}

function currentQuestion(){
  return (!session || !session.questions.length) ? null : session.questions[session.current_index]
}

function refreshHeader(){
  if(session) setText("#progressText", `Question ${session.current_index + 1} of ${session.questions.length}`)
}

function renderCurrent(){
  const q = currentQuestion()
  if(!q) return
  questionStart = Date.now()
  renderQuestion({
    questionEl: qs("#questionText"),
    choicesEl: qs("#choices"),
    explanationEl: qs("#explanation"),
    metaEl: qs("#meta"),
    onSelect: selectAnswer
  }, q)
  const selected = session.answers[q.id]
  if(selected !== undefined){
    markChoices(qs("#choices"), q.correct_index, selected)
    showExplanation(qs("#explanation"), q.explanation)
  }
  refreshHeader()
}

function classifyBasicError(question, selected){
  if(selected === question.correct_index) return null
  return question.type === "math" ? "calculation_error" : "knowledge_gap"
}

function selectAnswer(idx){
  const q = currentQuestion()
  if(!q) return
  answerQuestion(session, q.id, idx)
  markChoices(qs("#choices"), q.correct_index, idx)
  showExplanation(qs("#explanation"), q.explanation)
  recordAnswered(1)
  const correct = idx === q.correct_index
  const timeSec = Math.round((Date.now() - questionStart) / 1000)
  updateProgress({ question: q, correct, time_sec: timeSec, error_type: classifyBasicError(q, idx) })
  logEvent("quiz_answer", { correct, category: q.category || "unknown" })
  saveSession(session)
}

function startQuiz(){
  session = createSession("quiz", buildQuizConfig())
  session.questions = generateQuestionSet(getGenerationConfig(session.settings.count))
  saveSession(session)
  qs("#reviewCard").classList.add("hidden")
  renderCurrent()
}

function buildReview(){
  const review = qs("#reviewList")
  review.innerHTML = ""
  session.questions.forEach((q, i) => {
    const chosen = session.answers[q.id]
    const card = document.createElement("div")
    card.className = "card half"
    card.innerHTML = `<h3>${i + 1}. ${q.question}</h3><div class="small"><b>Your answer:</b> ${chosen !== undefined ? q.choices[chosen] : "No answer"}</div><div class="small"><b>Correct answer:</b> ${q.choices[q.correct_index]}</div><div class="small"><b>Explanation:</b> ${q.explanation}</div>`
    review.appendChild(card)
  })
  qs("#reviewCard").classList.remove("hidden")
}

window.addEventListener("DOMContentLoaded", () => {
  session = loadSession()
  qs("#startQuizBtn")?.addEventListener("click", startQuiz)
  qs("#nextBtn")?.addEventListener("click", () => { if(session){ nextQuestion(session); renderCurrent() } })
  qs("#prevBtn")?.addEventListener("click", () => { if(session){ prevQuestion(session); renderCurrent() } })
  qs("#finishBtn")?.addEventListener("click", () => {
    if(!session) return
    scoreSession(session)
    renderScoreBox(qs("#scoreBox"), `Quiz complete. Score: ${session.score.correct}/${session.questions.length} (${session.score.percent}%)`)
    buildReview()
  })
})
