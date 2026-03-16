
window.WWQuizEngine = (function(){
  async function buildSet(opts){
    const count = opts.count || 25;
    const mode = opts.mode || "mixed";
    const questions = [];
    const mathCount = mode==="math" ? count : mode==="nonmath" ? 0 : Math.round(count*0.4);
    const nonmathCount = count - mathCount;
    for(let i=0;i<mathCount;i++) questions.push(WWMath.generate({family:opts.mathFamily, difficulty:opts.difficulty}));
    await WWNonMath.init();
    for(let i=0;i<nonmathCount;i++) questions.push(await WWNonMath.generate({category:opts.nonmathCategory, difficulty:opts.difficulty}));
    for(let i=questions.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [questions[i],questions[j]]=[questions[j],questions[i]];
    }
    return questions;
  }
  return {buildSet};
})();
