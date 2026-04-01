import { NONMATH_QUESTION_BANK } from "../../data/book/nonmath_question_bank.js"

function pick(arr){ return arr[Math.floor(Math.random() * arr.length)] }
function shuffle(arr){
  const a = arr.slice()
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function normalize(question){
  const q = JSON.parse(JSON.stringify(question))
  return {
    id: q.id || ("q_" + Math.random().toString(36).slice(2, 10)),
    type: "nonmath",
    category: q.category,
    difficulty: q.difficulty || "medium",
    question: q.question,
    choices: q.choices,
    correct_index: q.correct_index,
    explanation: q.explanation,
    tags: ["nonmath", q.category],
    unit: null,
    solve_for: null
  }
}

export function listNonMathCategories(){
  return [
    { id:"any", title:"Any" },
    { id:"intro", title:"Introduction to Wastewater Treatment" },
    { id:"characteristics", title:"Wastewater Characteristics" },
    { id:"preliminary", title:"Preliminary Treatment" },
    { id:"primary", title:"Primary Treatment" },
    { id:"biology", title:"Biological Treatment Fundamentals" },
    { id:"ponds", title:"Treatment Ponds" },
    { id:"fixed_film", title:"Fixed-Film Treatment" },
    { id:"activated_sludge", title:"Activated Sludge" },
    { id:"nutrient_removal", title:"Nutrient Removal" },
    { id:"disinfection", title:"Disinfection" }
  ]
}

export function generateNonMathQuestion(config = {}){
  let pool = NONMATH_QUESTION_BANK
  if(config.category && config.category !== "any"){
    const exact = pool.filter(q => q.category === config.category)
    if(exact.length) pool = exact
  }
  if(config.difficulty){
    const diffPool = pool.filter(q => q.difficulty === config.difficulty)
    if(diffPool.length) pool = diffPool
  }

  const question = normalize(pick(pool))

  // Slightly shuffle answer order while preserving correctness
  const indexed = question.choices.map((c, i) => ({ c, correct: i === question.correct_index }))
  const shuffled = shuffle(indexed)
  question.choices = shuffled.map(x => x.c)
  question.correct_index = shuffled.findIndex(x => x.correct)
  return question
}
