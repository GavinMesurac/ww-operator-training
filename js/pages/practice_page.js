import { recordAnswered } from "../core/retention_manager.js"
import { generateQuestion } from "../generators/master_generator.js"
import { listNonMathCategories } from "../generators/nonmath_engine.js"
import { updateProgress } from "../core/progress_tracker.js"
import { logEvent } from "../core/analytics.js"
import { flashCorrect, flashWrong, updateStreakDisplay } from "../ui/ux_enhancements.js"
import { qs, renderQuestion, showExplanation, markChoices } from "../ui/ui_helpers.js"

let streak = 0
let currentQuestion = null
let startTime = 0

function getConfig(){
  return {
    type: qs("#modeSel")?.value || "mixed",
    family: qs("#mathSel")?.value || "any",
    category: qs("#nonMathSel")?.value || "any",
    language: "practice"
  }
}
function classifyBasicError(question, selected){
  if(selected === question.correct_index) return null
  return question.type === "math" ? "calculation_error" : "knowledge_gap"
}
function loadQuestion(){
  currentQuestion = generateQuestion(getConfig())
  startTime = Date.now()
  renderQuestion({
    questionEl: qs("#questionText"),
    choicesEl: qs("#choices"),
    explanationEl: qs("#explanation"),
    metaEl: qs("#meta"),
    onSelect: selectAnswer
  }, currentQuestion)
}
function selectAnswer(idx){
  if(!currentQuestion) return
  const correct = idx === currentQuestion.correct_index
  const el = qs("#questionText")
  if(correct){ flashCorrect(el); streak++ } else { flashWrong(el); streak = 0 }
  updateStreakDisplay(qs("#streakBox"), streak)
  markChoices(qs("#choices"), currentQuestion.correct_index, idx)
  recordAnswered(1)
  showExplanation(qs("#explanation"), currentQuestion.explanation)
  const timeSec = Math.round((Date.now() - startTime) / 1000)
  updateProgress({ question: currentQuestion, correct, time_sec: timeSec, error_type: classifyBasicError(currentQuestion, idx) })
  logEvent("practice_answer", { correct, category: currentQuestion.category || "unknown" })
}
window.addEventListener("DOMContentLoaded", () => {
  const nonMathSel = qs("#nonMathSel")
  if(nonMathSel){
    nonMathSel.innerHTML = listNonMathCategories().map(c => `<option value="${c.id}">${c.title}</option>`).join("")
  }
  qs("#generateBtn")?.addEventListener("click", loadQuestion)
  loadQuestion()
})
