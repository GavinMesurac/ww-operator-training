
window.WWAdaptiveEngine = (function(){
  function chooseDifficulty(progress){
    if(progress.currentStreak >= 20) return "insane";
    if(progress.currentStreak >= 10) return "hard";
    if(progress.currentStreak >= 5) return "medium";
    return "easy";
  }
  async function nextQuestion(){
    const p = WWStorage.getProgress();
    const diff = chooseDifficulty(p);
    const weak = p.weakTags || [];
    const useMath = Math.random() < 0.45;
    if(useMath){
      return WWMath.generate({difficulty: diff});
    }
    await WWNonMath.init();
    // map weak tags to categories if possible
    let category = "any";
    const allCats = WWNonMath.list().map(x=>x.id);
    for(const tag of weak){
      if(allCats.includes(tag)){ category = tag; break; }
    }
    return WWNonMath.generate({category, difficulty: diff});
  }
  return {nextQuestion};
})();
