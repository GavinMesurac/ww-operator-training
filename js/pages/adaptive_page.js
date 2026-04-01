import { generateQuestion } from "../generators/master_generator.js"
import { pickWeakCategory, pickWeakType, pickAdaptiveDifficulty } from "../core/adaptive_engine.js"
import { canUse, featureMessage } from "../core/subscription_manager.js"
import { updateProgress } from "../core/progress_tracker.js"
import { recordAnswered } from "../core/retention_manager.js"
import { logEvent } from "../core/analytics.js"
import { qs, renderQuestion, showExplanation, markChoices } from "../ui/ui_helpers.js"

let currentQuestion = null
let startTime = 0

function nextAdaptive(){
  if(!canUse("pro_adaptive")){
    alert(featureMessage("pro_adaptive"))
    return
  }
  const category = pickWeakCategory()
  const type = pickWeakType()
  const difficulty = pickAdaptiveDifficulty()

  currentQuestion = generateQuestion({ type, category, difficulty, language: "practice" })
  startTime = Date.now()
  qs("#targetText").textContent = `Targeting: ${category} (${type}) | Difficulty: ${difficulty}`

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
  markChoices(qs("#choices"), currentQuestion.correct_index, idx)
  recordAnswered(1)
  showExplanation(qs("#explanation"), currentQuestion.explanation)
  updateProgress({
    question: currentQuestion,
    correct,
    time_sec: Math.round((Date.now() - startTime) / 1000),
    error_type: correct ? null : (currentQuestion.type === "math" ? "calculation_error" : "knowledge_gap")
  })
  logEvent("adaptive_answer", { correct, category: currentQuestion.category || "unknown" })
}

window.addEventListener("DOMContentLoaded", () => {
  qs("#nextAdaptiveBtn")?.addEventListener("click", nextAdaptive)
})
