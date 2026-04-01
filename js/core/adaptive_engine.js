import { getProgress } from "./progress_tracker.js"

function weightedPick(items){
  const total = items.reduce((s, i) => s + i.weight, 0)
  let r = Math.random() * total
  for(const item of items){
    if(r < item.weight) return item.value
    r -= item.weight
  }
  return items[0].value
}

export function pickWeakCategory(){
  const p = getProgress()
  const entries = Object.entries(p.heatmap || {})
  if(!entries.length) return "any"
  const weighted = entries.map(([tag, val]) => ({ value: tag, weight: Math.max(0.01, 1 - val) }))
  return weightedPick(weighted)
}

export function pickAdaptiveDifficulty(){
  const p = getProgress()
  const acc = p.total_answered ? p.correct / p.total_answered : 0.5
  if(acc < 0.5) return "easy"
  if(acc < 0.7) return Math.random() < 0.7 ? "medium" : "easy"
  if(acc < 0.85) return Math.random() < 0.7 ? "hard" : "medium"
  return Math.random() < 0.7 ? "insane" : "hard"
}

export function pickWeakType(){
  const p = getProgress()
  const mathErrors = Object.entries(p.errors || {}).filter(([k]) => k === "math" || k.includes("math")).length
  const nonMathErrors = Object.entries(p.errors || {}).filter(([k]) => k !== "math" && !k.includes("math")).length
  if(mathErrors > nonMathErrors){
    return Math.random() < 0.7 ? "math" : "mixed"
  }
  return Math.random() < 0.5 ? "nonmath" : "mixed"
}
