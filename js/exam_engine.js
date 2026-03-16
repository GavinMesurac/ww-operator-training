
window.WWExamEngine = (function(){
  async function buildExam(){
    const questions = [];
    await WWNonMath.init();
    for(let i=0;i<40;i++) questions.push(WWMath.generate({}));
    for(let i=0;i<70;i++) questions.push(await WWNonMath.generate({}));
    const pilot = new Set();
    while(pilot.size < 10) pilot.add(Math.floor(Math.random()*110));
    return questions.map((q,idx) => Object.assign({}, q, {pilot: pilot.has(idx)}));
  }
  return {buildExam};
})();
