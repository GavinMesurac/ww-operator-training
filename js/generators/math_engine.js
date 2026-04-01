// math_engine.js

function pick(arr){
  return arr[Math.floor(Math.random() * arr.length)]
}

function rand(min, max, dp = 0){
  const n = min + Math.random() * (max - min)
  const p = 10 ** dp
  return Math.round(n * p) / p
}

function round(n, dp = 2){
  const p = 10 ** dp
  return Math.round(n * p) / p
}

function shuffle(arr){
  const a = arr.slice()
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function mcq(meta){
  return {
    id: "q_" + Math.random().toString(36).slice(2, 10),
    type: "math",
    category: meta.category,
    difficulty: meta.difficulty,
    question: meta.question,
    choices: meta.choices,
    correct_index: meta.correct_index,
    explanation: meta.explanation,
    tags: ["math", meta.category].concat(meta.tags || []),
    unit: meta.unit || null,
    solve_for: meta.solve_for || null
  }
}

function numericChoices(answer, unit, wrongFns = []){
  const correct = `${round(answer, 2)} ${unit}`.trim()
  const wrongs = []
  wrongFns.forEach(fn => {
    try{
      const v = fn()
      if(Number.isFinite(v)) wrongs.push(`${round(v, 2)} ${unit}`.trim())
    }catch(e){}
  })
  const multipliers = [0.9, 1.1, 1.25, 0.75, 1.5, 0.6, 1.4]
  while(wrongs.length < 3){
    const m = pick(multipliers)
    const v = answer * m + (Math.random() - 0.5) * Math.abs(answer) * 0.03
    wrongs.push(`${round(v, 2)} ${unit}`.trim())
  }
  const choices = shuffle([correct, wrongs[0], wrongs[1], wrongs[2]])
  return { choices, correct_index: choices.indexOf(correct) }
}

function pickDifficulty(target){
  return target || pick(["easy", "medium", "medium", "hard", "easy", "hard", "insane"])
}

function detentionTime(difficulty){
  const volumeMG = rand(0.3, 8.0, 3)
  const flowMGD = rand(0.5, 20.0, 3)
  const flowGPM = round(flowMGD * 1000000 / 1440, 1)
  const hours = volumeMG / flowMGD * 24

  if(difficulty === "easy"){
    const q = `A clarifier has a volume of ${volumeMG} MG and a flow of ${flowMGD} MGD. What is the detention time in hr?`
    const c = numericChoices(hours, "hr", [
      () => volumeMG / flowMGD,
      () => hours * 60,
      () => volumeMG * flowMGD
    ])
    return mcq({
      category: "detention_time",
      difficulty,
      question: q,
      choices: c.choices,
      correct_index: c.correct_index,
      explanation: `Detention time = Volume ÷ Flow. ${volumeMG} ÷ ${flowMGD} = ${round(volumeMG / flowMGD, 4)} days. Multiply by 24 = ${round(hours, 2)} hr.`,
      tags: ["detention_time"],
      unit: "hr",
      solve_for: "time"
    })
  }

  const q = `A clarifier has a volume of ${volumeMG} MG and a flow of ${flowGPM} gpm. What is the detention time in hr?`
  const c = numericChoices(hours, "hr", [
    () => volumeMG / flowGPM * 24,
    () => volumeMG / flowMGD,
    () => hours / 24
  ])
  return mcq({
    category: "detention_time",
    difficulty,
    question: q,
    choices: c.choices,
    correct_index: c.correct_index,
    explanation: `Convert ${flowGPM} gpm to MGD: ${flowGPM} × 1440 ÷ 1,000,000 = ${round(flowMGD, 3)} MGD. Then detention time = ${volumeMG} ÷ ${round(flowMGD, 3)} = ${round(volumeMG / flowMGD, 4)} days = ${round(hours, 2)} hr.`,
    tags: ["detention_time", "unit_conversion"],
    unit: "hr",
    solve_for: "time"
  })
}

function poundsFormula(difficulty){
  const mgL = rand(20, 320, 1)
  const flowMGD = rand(0.4, 18, 3)
  const loading = mgL * flowMGD * 8.34
  const flowGPM = round(flowMGD * 1000000 / 1440, 1)

  if(difficulty === "easy"){
    const q = `A wastewater stream has a concentration of ${mgL} mg/L and a flow of ${flowMGD} MGD. What is the loading in lb/day?`
    const c = numericChoices(loading, "lb/day", [
      () => mgL * flowMGD,
      () => loading / 24,
      () => mgL + flowMGD
    ])
    return mcq({
      category: "pounds_formula",
      difficulty,
      question: q,
      choices: c.choices,
      correct_index: c.correct_index,
      explanation: `lb/day = mg/L × MGD × 8.34 = ${mgL} × ${flowMGD} × 8.34 = ${round(loading, 1)} lb/day.`,
      tags: ["pounds_formula"],
      unit: "lb/day",
      solve_for: "loading"
    })
  }

  const q = `A wastewater stream has a concentration of ${mgL} mg/L and a flow of ${flowGPM} gpm. What is the loading in lb/day?`
  const c = numericChoices(loading, "lb/day", [
    () => mgL * flowGPM,
    () => loading / 8.34,
    () => loading / 24
  ])
  return mcq({
    category: "pounds_formula",
    difficulty,
    question: q,
    choices: c.choices,
    correct_index: c.correct_index,
    explanation: `Convert ${flowGPM} gpm to MGD: ${flowGPM} × 1440 ÷ 1,000,000 = ${round(flowMGD, 3)} MGD. Then lb/day = ${mgL} × ${round(flowMGD, 3)} × 8.34 = ${round(loading, 1)} lb/day.`,
    tags: ["pounds_formula", "unit_conversion"],
    unit: "lb/day",
    solve_for: "loading"
  })
}

function dose(difficulty){
  const flowMGD = rand(0.5, 18, 3)
  const feedLbDay = rand(10, 900, 1)
  const doseMgL = feedLbDay / (flowMGD * 8.34)
  const q = `A plant feeds ${feedLbDay} lb/day of chemical at a flow of ${flowMGD} MGD. What is the dose in mg/L?`
  const c = numericChoices(doseMgL, "mg/L", [
    () => feedLbDay / flowMGD,
    () => doseMgL * 24,
    () => feedLbDay * flowMGD
  ])
  return mcq({
    category: "dose",
    difficulty,
    question: q,
    choices: c.choices,
    correct_index: c.correct_index,
    explanation: `Dose = lb/day ÷ (MGD × 8.34) = ${feedLbDay} ÷ (${flowMGD} × 8.34) = ${round(doseMgL, 2)} mg/L.`,
    tags: ["dose"],
    unit: "mg/L",
    solve_for: "dose"
  })
}

function svi(difficulty){
  const settleVolume = rand(60, 350, 0)
  const mlss = rand(1500, 4500, 0)
  const sviVal = settleVolume * 1000 / mlss
  const q = `The 30-minute settled sludge volume is ${settleVolume} mL/L and the MLSS is ${mlss} mg/L. What is the SVI in mL/g?`
  const c = numericChoices(sviVal, "mL/g", [
    () => settleVolume / mlss,
    () => sviVal * 10,
    () => mlss / settleVolume
  ])
  return mcq({
    category: "svi",
    difficulty,
    question: q,
    choices: c.choices,
    correct_index: c.correct_index,
    explanation: `SVI = (settled sludge volume × 1000) ÷ MLSS = (${settleVolume} × 1000) ÷ ${mlss} = ${round(sviVal, 0)} mL/g.`,
    tags: ["svi"],
    unit: "mL/g",
    solve_for: "SVI"
  })
}

const registry = {
  detention_time: detentionTime,
  pounds_formula: poundsFormula,
  dose: dose,
  svi: svi
}

export function listMathFamilies(){
  return [
    { id: "any", title: "Any" },
    { id: "detention_time", title: "Detention Time" },
    { id: "pounds_formula", title: "Pounds Formula" },
    { id: "dose", title: "Dose" },
    { id: "svi", title: "SVI" }
  ]
}

export function generateMathQuestion(config = {}){
  const family = config.family && config.family !== "any"
    ? config.family
    : pick(["detention_time", "pounds_formula", "dose", "svi", "detention_time", "pounds_formula"])
  const difficulty = pickDifficulty(config.difficulty)
  return registry[family](difficulty)
}
