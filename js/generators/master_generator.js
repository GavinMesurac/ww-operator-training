// Separate math and non-math generators are intentionally kept independent.
// master_generator.js

import { generateMathQuestion } from "./math_engine.js"
import { generateNonMathQuestion } from "./nonmath_engine.js"
import { buildDNA, isTooSimilar } from "../core/dna_engine.js"

function pick(arr){
  return arr[Math.floor(Math.random() * arr.length)]
}

function inferType(config){
  if(config.type && config.type !== "mixed") return config.type
  return Math.random() < 0.4 ? "math" : "nonmath"
}

function attachDNA(question){
  question.dna = buildDNA(question)
  return question
}

export function generateQuestion(config = {}){
  const history = config.history || []
  const type = inferType(config)

  for(let i = 0; i < 25; i++){
    let q
    if(type === "math"){
      q = generateMathQuestion(config)
    } else {
      q = generateNonMathQuestion(config)
    }
    q = attachDNA(q)
    if(!isTooSimilar(q.dna, history)){
      return q
    }
  }

  const fallback = type === "math"
    ? generateMathQuestion(config)
    : generateNonMathQuestion(config)
  return attachDNA(fallback)
}

export function generateQuestionSet(config = {}){
  const count = config.count || 25
  const out = []
  for(let i = 0; i < count; i++){
    out.push(generateQuestion({
      ...config,
      history: out.map(q => q.dna)
    }))
  }
  return out
}
