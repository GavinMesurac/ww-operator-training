import { getProgress } from "./progress_tracker.js"

export function buildRecommendations(limit = 5){
  const p = getProgress()
  const entries = Object.entries(p.heatmap || {}).sort((a,b)=>a[1]-b[1]).slice(0, limit)
  if(!entries.length){
    return [{
      tag: "mixed_review",
      score: 0.5,
      top_error: null,
      message: "No strong weak areas yet. Keep doing mixed review and practice quizzes."
    }]
  }
  return entries.map(([tag, score]) => {
    const errors = p.errors?.[tag] || {}
    const top = Object.entries(errors).sort((a,b)=>b[1]-a[1])[0]
    return {
      tag,
      score,
      top_error: top ? top[0] : null,
      message: top
        ? `Focus on ${tag}. Biggest issue: ${top[0].replaceAll("_"," ")}.`
        : `Focus on ${tag}. This is currently one of your weakest areas.`
    }
  })
}

export function buildStudyPlan(){
  const recs = buildRecommendations(3)
  return [
    { step: 1, action: `Study ${recs[0].tag.replaceAll("_"," ")}` },
    { step: 2, action: `Run Adaptive mode on ${recs[0].tag.replaceAll("_"," ")}` },
    { step: 3, action: `Take a quiz on ${recs[1] ? recs[1].tag.replaceAll("_"," ") : "mixed review"}` },
    { step: 4, action: "Finish with a mixed quiz or exam simulation" }
  ]
}
