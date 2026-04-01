export const EXAM_BLUEPRINT = {
  math: 0.35,
  activated_sludge: 0.18,
  clarifiers: 0.10,
  disinfection: 0.08,
  sludge_handling: 0.08,
  laboratory: 0.07,
  safety: 0.05,
  collection_systems: 0.04,
  equipment: 0.03,
  regulatory: 0.02
}

function weightedPick(items){
  const total = items.reduce((s, i) => s + i.weight, 0)
  let r = Math.random() * total
  for(const item of items){
    if(r < item.weight) return item.value
    r -= item.weight
  }
  return items[0].value
}

export function buildExamQuestionConfig(){
  const picked = weightedPick(Object.entries(EXAM_BLUEPRINT).map(([value, weight]) => ({ value, weight })))
  if(picked === "math"){
    return { type: "math", family: "any", language: "exam" }
  }
  return { type: "nonmath", category: picked, language: "exam" }
}
