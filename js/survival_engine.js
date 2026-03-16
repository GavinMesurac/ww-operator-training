
window.WWSurvivalEngine = (function(){
  function difficultyForStreak(streak){
    if(streak >= 20) return "insane";
    if(streak >= 10) return "hard";
    if(streak >= 5) return "medium";
    return "easy";
  }
  async function nextQuestion(streak){
    const difficulty = difficultyForStreak(streak || 0);
    const useMath = Math.random() < 0.5;
    if(useMath) return WWMath.generate({difficulty});
    await WWNonMath.init();
    return WWNonMath.generate({difficulty});
  }
  return {nextQuestion};
})();
