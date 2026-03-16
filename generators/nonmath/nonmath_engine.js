
window.WWNonMath = (function(){
  let libs = null;
  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
  function shuffle(arr){ const a=arr.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }
  function weighted(items){ const total=items.reduce((s,x)=>s+x.w,0); let r=Math.random()*total; for(const item of items){ r-=item.w; if(r<=0) return item.v; } return items[items.length-1].v; }
  async function init(){
    if(libs) return libs;
    const files = ["activated_sludge","microbiology","clarifiers","aeration","filtration","disinfection","sludge","laboratory","collection","equipment","safety","regulatory"];
    libs = {};
    for(const f of files){
      const res = await fetch(`data/truth_libraries/${f}.json`);
      libs[f] = await res.json();
    }
    return libs;
  }
  function list(){
    return [
      ["any","Any"],["activated_sludge","Activated Sludge"],["microbiology","Microbiology"],["clarifiers","Clarifiers"],
      ["aeration","Aeration"],["filtration","Filtration"],["disinfection","Disinfection"],["sludge","Sludge Handling"],
      ["laboratory","Laboratory"],["collection","Collection System"],["equipment","Equipment"],["safety","Safety"],["regulatory","Regulatory"]
    ].map(([id,title])=>({id,title}));
  }
  function qobj(category, difficulty, question, choices, correct_index, explanation, tags){
    return {
      id:"q_"+Math.random().toString(36).slice(2,10),
      type:"nonmath", category, difficulty, question, choices, correct_index, explanation,
      tags:["nonmath", category].concat(tags || [])
    };
  }
  function keyword(truth){
    const lower = truth.toLowerCase();
    const known = ["filamentous bacteria","zoogleal bacteria","free-swimming bacteria","stalked ciliates","rotifers","nematodes","return activated sludge","waste activated sludge","rising sludge","sludge blanket","chlorine residual","dechlorination","anaerobic digestion","composite sample","grab sample","infiltration","inflow","lift stations","cavitation","lockout/tagout","hydrogen sulfide","npdes permits","backwashing","head loss","bulking sludge"];
    for(const k of known){ if(lower.includes(k)) return k; }
    return truth.split(" ").slice(0,4).join(" ");
  }
  function conceptChoices(correct){
    const close = ["Low dissolved oxygen","Hydraulic overloading","Instrument calibration problem","Poor maintenance","Operator error"];
    const far = ["Pump cavitation","High alkalinity","Electrical short","Mechanical failure"];
    const choices = [correct];
    for(const c of close){ if(!choices.includes(c) && choices.length<3) choices.push(c); }
    for(const f of far){ if(!choices.includes(f) && choices.length<4) choices.push(f); }
    return shuffle(choices);
  }
  function genDefinition(entry, category){
    const term = keyword(entry.truth);
    const question = `Which statement best defines ${term}?`;
    const correct = entry.truth;
    const choices = shuffle([correct, "It is always a mechanical failure condition.", "It is used only for electrical motor testing.", "It is a laboratory error caused only by bad glassware."]);
    return qobj(category, "easy", question, choices, choices.indexOf(correct), entry.truth, entry.tags);
  }
  function genCause(entry, category){
    const t = entry.truth;
    let question = "Which statement is most accurate?";
    let correct = t;
    if(t.toLowerCase().includes("caused by")){
      const parts = t.split(/caused by/i);
      question = `${parts[0].trim()} is most likely caused by what?`;
      correct = parts[1].trim().replace(/\.$/,"");
    } else if(t.toLowerCase().includes("promotes")){
      const parts = t.split(/promotes/i);
      question = `What condition most likely promotes ${parts[1].trim().replace(/\.$/,"")}?`;
      correct = parts[0].trim();
    } else if(t.toLowerCase().includes("indicate")){
      question = `What does the following most likely indicate? "${t.replace(/\.$/,"")}"`;
      correct = keyword(t);
    }
    const choices = conceptChoices(correct);
    return qobj(category, Math.random()<0.7 ? "medium" : "hard", question, choices, choices.indexOf(correct), t, entry.tags);
  }
  function genScenario(entry, category){
    let question = `A plant scenario best matches the following statement: "${entry.truth}". Which answer is most likely correct?`;
    let correct = entry.truth;
    if(category==="microbiology"){
      if(entry.truth.toLowerCase().includes("filamentous")){
        question = "Long strands extend outside sludge floc under the microscope and settling is poor. What is the most likely problem?";
        correct = "Filamentous bulking";
      } else if(entry.truth.toLowerCase().includes("rotifers")){
        question = "Rotifers are observed in large numbers under the microscope. What does this most likely indicate?";
        correct = "Older sludge / low F/M conditions";
      }
    } else if(category==="clarifiers"){
      question = "A clarifier shows a rising sludge blanket and floating solids. What is the most likely cause?";
      correct = "Denitrification";
    } else if(category==="safety"){
      question = "An operator smells a strong rotten egg odor near a confined space opening. What hazard is most likely present?";
      correct = "Hydrogen sulfide gas";
    }
    const choices = conceptChoices(correct);
    return qobj(category, "hard", question, choices, choices.indexOf(correct), entry.truth, (entry.tags||[]).concat(["scenario"]));
  }
  function genOperational(entry, category){
    let question = `Based on the statement "${entry.truth.replace(/\.$/,"")}", what is the best first operator response?`;
    let correct = "Increase monitoring and verify the condition";
    if(category==="clarifiers") correct = "Check blanket depth and solids removal conditions";
    else if(category==="disinfection") correct = "Verify chlorine feed, residual, and contact time";
    else if(category==="safety") correct = "Follow emergency procedures and protect personnel first";
    else if(category==="laboratory") correct = "Verify calibration and sample handling";
    const choices = shuffle([correct,"Ignore it if effluent still looks clear","Increase chemical feed without checking data","Bypass the process immediately"]);
    return qobj(category, "hard", question, choices, choices.indexOf(correct), entry.truth, (entry.tags||[]).concat(["operational_decision"]));
  }
  async function generate(options={}){
    await init();
    const category = options.category && options.category !== "any" ? options.category : pick(Object.keys(libs));
    const lib = libs[category];
    const entry = pick(lib.truths);
    const style = weighted([{v:"definition",w:15},{v:"cause",w:35},{v:"scenario",w:25},{v:"operational",w:25}]);
    if(style==="definition") return genDefinition(entry, category);
    if(style==="scenario") return genScenario(entry, category);
    if(style==="operational") return genOperational(entry, category);
    return genCause(entry, category);
  }
  return {init, generate, list};
})();
