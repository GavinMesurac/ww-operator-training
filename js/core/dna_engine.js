export function buildDNA(question){
  return {
    type: question.type,
    category: question.category,
    difficulty: question.difficulty,
    unit: question.unit || null,
    solve_for: question.solve_for || null
  }
}

export function isTooSimilar(newDNA, history = []){
  return history.some(old => (
    old.type === newDNA.type &&
    old.category === newDNA.category &&
    old.unit === newDNA.unit &&
    old.solve_for === newDNA.solve_for
  ))
}
