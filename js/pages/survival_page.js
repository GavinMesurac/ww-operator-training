import { generateQuestion } from "../generators/master_generator.js"
import { canUse, featureMessage } from "../core/subscription_manager.js"
import { updateProgress } from "../core/progress_tracker.js"
import { recordAnswered } from "../core/retention_manager.js"
import { logEvent } from "../core/analytics.js"
import { qs, renderQuestion, showExplanation, markChoices, setText } from "../ui/ui_helpers.js"

let currentQuestion = null
let streak = 0
let startTime = 0

function difficultyForStreak(){
  if(streak >= 20) return "insane"
  if(streak >= 10) return "hard"
  if(streak >= 5) return "medium"
  return "easy"
}

function nextSurvival(){
  if(!canUse("pro_survival")){
    alert(featureMessage("pro_survival"))
    return
  }
  currentQuestion = generateQuestion({
    type: "mixed",
    language: "practice",
    difficulty: difficultyForStreak()
  })
  startTime = Date.now()
  setText("#streakText", String(streak))
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
  if(correct) streak++
  else streak = 0
  setText("#streakText", String(streak))
  markChoices(qs("#choices"), currentQuestion.correct_index, idx)
  recordAnswered(1)
  showExplanation(qs("#explanation"), correct ? "Correct. Streak continues." : `Wrong. Streak reset. ${currentQuestion.explanation}`)
  updateProgress({
    question: currentQuestion,
    correct,
    time_sec: Math.round((Date.now() - startTime) / 1000),
    error_type: correct ? null : (currentQuestion.type === "math" ? "calculation_error" : "knowledge_gap")
  })
  logEvent("survival_answer", { correct, category: currentQuestion.category || "unknown" })
}

window.addEventListener("DOMContentLoaded", () => {
  qs("#nextSurvivalBtn")?.addEventListener("click", nextSurvival)
})
