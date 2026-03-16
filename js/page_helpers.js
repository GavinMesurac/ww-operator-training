
window.WWPage = (function(){
  function updateProgressKPI(){
    const p = WWStorage.getProgress();
    const acc = p.answered ? Math.round((p.correct/p.answered)*100) : 0;
    document.querySelectorAll("[data-kpi='answered']").forEach(el=>el.textContent = p.answered);
    document.querySelectorAll("[data-kpi='accuracy']").forEach(el=>el.textContent = `${acc}%`);
    document.querySelectorAll("[data-kpi='bestStreak']").forEach(el=>el.textContent = p.bestStreak);
  }
  function fillSelect(selectEl, items){
    selectEl.innerHTML = "";
    items.forEach(item=>{
      const opt = document.createElement("option");
      opt.value = item.id; opt.textContent = item.title;
      selectEl.appendChild(opt);
    });
  }
  function renderQuestion(target, q, onChoose){
    target.stem.textContent = q.question;
    target.explanation.textContent = "";
    target.explanation.classList.add("hidden");
    target.choices.innerHTML = "";
    q.choices.forEach((choice, idx) => {
      const div = document.createElement("div");
      div.className = "choice";
      div.textContent = choice;
      div.onclick = () => onChoose(idx, div);
      target.choices.appendChild(div);
    });
    if(target.meta){
      target.meta.textContent = `${q.type} • ${q.category} • ${q.difficulty}`;
    }
  }
  return {updateProgressKPI, fillSelect, renderQuestion};
})();
