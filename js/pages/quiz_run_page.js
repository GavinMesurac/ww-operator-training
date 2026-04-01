import { createSession, saveSession, answerQuestion, nextQuestion, prevQuestion, scoreSession } from "../core/session_controller.js"
import { updateProgress } from "../core/progress_tracker.js"
import { generateQuestionSet } from "../generators/master_generator.js"
import { recordAnswered } from "../core/retention_manager.js"
import { logEvent } from "../core/analytics.js"
import { qs, setText, renderQuestion, showExplanation, markChoices, renderScoreBox } from "../ui/ui_helpers.js"

let session = null
let questionStart = 0

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
    if(session.completed_at){
      markChoices(qs("#choices"), q.correct_index, selected)
      showExplanation(qs("#explanation"), q.explanation)
    } else {
      const buttons = [...qs("#choices").querySelectorAll(".choice-btn")]
      buttons.forEach((btn, idx) => {
        if(idx === selected) btn.classList.add("selected")
      })
    }
  }
  refreshHeader()
}
function classifyBasicError(question, selected){
  if(selected === question.correct_index) return null
  return question.type === "math" ? "calculation_error" : "knowledge_gap"
}
function selectAnswer(idx){
  const q = currentQuestion()
  if(!q || session.completed_at) return

  const firstAnswer = session.answers[q.id] === undefined
  answerQuestion(session, q.id, idx)

  const buttons = [...qs("#choices").querySelectorAll(".choice-btn")]
  buttons.forEach(btn => btn.classList.remove("selected"))
  if(buttons[idx]) buttons[idx].classList.add("selected")

  if(firstAnswer){
    recordAnswered(1)
    const timeSec = Math.round((Date.now() - questionStart) / 1000)
    const correct = idx === q.correct_index
    updateProgress({ question: q, correct, time_sec: timeSec, error_type: classifyBasicError(q, idx) })
    logEvent("quiz_answer", { correct, category: q.category || "unknown" })
  } else {
    saveSession(session)
  }
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
function finalizeQuiz(){
  scoreSession(session)
  session.completed_at = Date.now()
  saveSession(session)
  renderScoreBox(qs("#scoreBox"), `Quiz complete. Score: ${session.score.correct}/${session.questions.length} (${session.score.percent}%)`)
  renderCurrent()
  buildReview()
}
window.addEventListener("DOMContentLoaded", () => {
  const setup = JSON.parse(sessionStorage.getItem("ww_quiz_setup") || '{"count":"25","difficulty":""}')
  session = createSession("quiz", setup)
  session.questions = generateQuestionSet({ count: parseInt(setup.count, 10), difficulty: setup.difficulty || undefined, type: "mixed", language: "practice" })
  saveSession(session)
  renderCurrent()
  qs("#nextBtn")?.addEventListener("click", () => { nextQuestion(session); renderCurrent() })
  qs("#prevBtn")?.addEventListener("click", () => { prevQuestion(session); renderCurrent() })
  qs("#finishBtn")?.addEventListener("click", finalizeQuiz)
})
