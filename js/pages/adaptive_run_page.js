import { generateQuestion } from "../generators/master_generator.js"
import { pickWeakCategory, pickWeakType, pickAdaptiveDifficulty } from "../core/adaptive_engine.js"
import { updateProgress } from "../core/progress_tracker.js"
import { recordAnswered } from "../core/retention_manager.js"
import { logEvent } from "../core/analytics.js"
import { qs, renderQuestion, showExplanation, markChoices } from "../ui/ui_helpers.js"

let currentQuestion = null
let startTime = 0
let remaining = 25
let forcedDifficulty = ""
function nextAdaptive(){
  if(remaining <= 0){
    qs("#targetText").textContent = "Adaptive session complete."
    return
  }
  const category = pickWeakCategory()
  const type = pickWeakType()
  const difficulty = forcedDifficulty || pickAdaptiveDifficulty()
  currentQuestion = generateQuestion({ type, category, difficulty, language: "practice" })
  startTime = Date.now()
  remaining--
  qs("#targetText").textContent = `Targeting: ${category} (${type}) | Difficulty: ${difficulty} | Remaining: ${remaining + 1}`
  renderQuestion({ questionEl: qs("#questionText"), choicesEl: qs("#choices"), explanationEl: qs("#explanation"), metaEl: qs("#meta"), onSelect: selectAnswer }, currentQuestion)
}
function selectAnswer(idx){
  if(!currentQuestion) return
  const correct = idx === currentQuestion.correct_index
  markChoices(qs("#choices"), currentQuestion.correct_index, idx)
  recordAnswered(1)
  showExplanation(qs("#explanation"), currentQuestion.explanation)
  updateProgress({ question: currentQuestion, correct, time_sec: Math.round((Date.now() - startTime)/1000), error_type: correct ? null : (currentQuestion.type === "math" ? "calculation_error" : "knowledge_gap") })
  logEvent("adaptive_answer", { correct, category: currentQuestion.category || "unknown" })
}
window.addEventListener("DOMContentLoaded", () => {
  const setup = JSON.parse(sessionStorage.getItem("ww_adaptive_setup") || '{"count":"25","difficulty":""}')
  remaining = parseInt(setup.count, 10)
  forcedDifficulty = setup.difficulty || ""
  qs("#nextAdaptiveBtn")?.addEventListener("click", nextAdaptive)
  nextAdaptive()
})
