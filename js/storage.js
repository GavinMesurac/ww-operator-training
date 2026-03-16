
window.WWStorage = (function(){
  function loadJSON(key, fallback){
    try{
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch(e){ return fallback; }
  }
  function saveJSON(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  }
  function getProgress(){
    return loadJSON("ww_progress", {
      answered:0, correct:0, wrong:0, bestStreak:0, currentStreak:0,
      byTag:{}, weakTags:[], examHistory:[]
    });
  }
  function updateProgress(question, isCorrect, responseMs){
    const p = getProgress();
    p.answered += 1;
    if(isCorrect){ p.correct += 1; p.currentStreak += 1; }
    else { p.wrong += 1; p.currentStreak = 0; }
    p.bestStreak = Math.max(p.bestStreak, p.currentStreak);
    (question.tags || []).forEach(tag => {
      if(!p.byTag[tag]) p.byTag[tag] = {seen:0, wrong:0, slow:0};
      p.byTag[tag].seen += 1;
      if(!isCorrect) p.byTag[tag].wrong += 1;
      if(responseMs > 30000) p.byTag[tag].slow += 1;
    });
    p.weakTags = Object.entries(p.byTag)
      .map(([tag,v]) => ({tag, score:(v.wrong*2 + v.slow)/Math.max(1,v.seen)}))
      .sort((a,b)=>b.score-a.score)
      .slice(0,15)
      .map(x=>x.tag);
    saveJSON("ww_progress", p);
    return p;
  }
  return {loadJSON, saveJSON, getProgress, updateProgress};
})();
