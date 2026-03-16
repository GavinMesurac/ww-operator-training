
window.WWMath = (function(){
  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
  function rand(min,max,dp=0){ const n=min+Math.random()*(max-min); const p=10**dp; return Math.round(n*p)/p; }
  function round(n,dp=2){ const p=10**dp; return Math.round(n*p)/p; }
  function shuffle(arr){ const a=arr.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }
  function weighted(items){
    const total = items.reduce((s,x)=>s+x.w,0); let r = Math.random()*total;
    for(const item of items){ r -= item.w; if(r<=0) return item.v; }
    return items[items.length-1].v;
  }
  function diff(target){
    return target || weighted([{v:"easy",w:35},{v:"medium",w:35},{v:"hard",w:20},{v:"insane",w:10}]);
  }
  function sys(){ return Math.random()<0.5 ? "US" : "METRIC"; }
  function mcq(meta){
    return {
      id:"q_"+Math.random().toString(36).slice(2,10),
      type:"math",
      category:meta.category,
      difficulty:meta.difficulty,
      question:meta.question,
      choices:meta.choices,
      correct_index:meta.correct_index,
      explanation:meta.explanation,
      tags:["math", meta.category].concat(meta.tags || [])
    };
  }
  function numChoices(answer, unit, wrongFns){
    const correct = `${round(answer,2)} ${unit}`.trim();
    const wrongs = [];
    (wrongFns||[]).forEach(fn => {
      let v;
      try{ v = fn(); } catch(e){ v = null; }
      if(Number.isFinite(v)) wrongs.push(`${round(v,2)} ${unit}`.trim());
    });
    const mults=[0.9,1.1,1.25,0.75,1.5,0.6,1.4];
    while(wrongs.length<3){
      const m = pick(mults);
      const v = answer*m + (Math.random()-0.5)*Math.abs(answer)*0.03;
      wrongs.push(`${round(v,2)} ${unit}`.trim());
    }
    const choices = shuffle([correct, wrongs[0], wrongs[1], wrongs[2]]);
    return {choices, correct_index:choices.indexOf(correct)};
  }
  const C = {
    GPM_TO_MGD:1440/1000000, MGD_TO_GPM:1000000/1440, CFS_TO_MGD:0.646317, FT3_TO_GAL:7.48052,
    LPS_TO_M3D:86.4
  };
  const structures = ["aeration basin","primary clarifier","secondary clarifier","equalization tank","anaerobic digester","lagoon","holding tank","reactor"];

  function detention(target){
    const difficulty = diff(target), system = sys(), structure = pick(structures);
    if(system==="US"){
      const V = rand(0.2,8.0,3), Q = rand(0.5,25,3);
      const hrs = V/Q*24;
      if(difficulty==="easy"){
        const q = `A ${structure} has a volume of ${V} MG and a flow of ${Q} MGD. What is the detention time in hr?`;
        const c = numChoices(hrs,"hr",[()=>V/Q,()=>V*Q*24,()=>hrs*60]);
        return mcq({category:"detention_time",difficulty,question:q,choices:c.choices,correct_index:c.correct_index,
          explanation:`Detention time = V ÷ Q. ${V} ÷ ${Q} = ${round(V/Q,4)} days. Multiply by 24 = ${round(hrs,2)} hr.`,
          tags:["detention_time","us"]});
      }
      const gpm = round(Q*C.MGD_TO_GPM,1);
      const q = difficulty==="medium"
        ? `A ${structure} has a volume of ${V} MG. Flow through the tank is ${gpm} gpm. What is the detention time in hr?`
        : `A ${structure} has a volume of ${V} MG. Flow is ${gpm} gpm. Surface area is ${rand(800,5000,0)} ft². What is the detention time in hr?`;
      const c = numChoices(hrs,"hr",[()=>V/gpm*24,()=>V/Q,()=>V*Q]);
      return mcq({category:"detention_time",difficulty,question:q,choices:c.choices,correct_index:c.correct_index,
        explanation:`Convert flow: ${gpm} gpm × 1440 ÷ 1,000,000 = ${round(Q,3)} MGD. Then T = V ÷ Q = ${V} ÷ ${Q} = ${round(V/Q,4)} days = ${round(hrs,2)} hr.`,
        tags:["detention_time","unit_conversion"]});
    }
    const V = rand(300,60000,1), Qd = rand(800,120000,1), hrs = V/Qd*24;
    const q = `A ${structure} has a volume of ${V} m³ and a flow of ${Qd} m³/day. What is the detention time in hr?`;
    const c = numChoices(hrs,"hr",[()=>V/Qd,()=>V*Qd/24,()=>Qd/V*24]);
    return mcq({category:"detention_time",difficulty,question:q,choices:c.choices,correct_index:c.correct_index,
      explanation:`T = V ÷ Q = ${V} ÷ ${Qd} = ${round(V/Qd,4)} days. Multiply by 24 = ${round(hrs,2)} hr.`,
      tags:["detention_time","metric"]});
  }

  function pounds(target){
    const difficulty = diff(target), system = sys();
    if(system==="US"){
      const mgL=rand(20,320,1), MGD=rand(0.4,18,3), lbday=mgL*MGD*8.34;
      if(difficulty==="easy"){
        const q=`A wastewater stream has a concentration of ${mgL} mg/L and a flow of ${MGD} MGD. What is the loading in lb/day?`;
        const c=numChoices(lbday,"lb/day",[()=>mgL*MGD,()=>mgL+MGD+8.34,()=>lbday/24]);
        return mcq({category:"pounds_formula",difficulty,question:q,choices:c.choices,correct_index:c.correct_index,
          explanation:`lb/day = mg/L × MGD × 8.34 = ${mgL} × ${MGD} × 8.34 = ${round(lbday,1)} lb/day.`,
          tags:["pounds_formula","us"]});
      }
      const gpm = round(MGD*C.MGD_TO_GPM,1);
      const q=`A stream tests ${mgL} mg/L at ${gpm} gpm. What is the loading in lb/day?`;
      const c=numChoices(lbday,"lb/day",[()=>mgL*gpm*8.34,()=>mgL*MGD,()=>lbday/24]);
      return mcq({category:"pounds_formula",difficulty,question:q,choices:c.choices,correct_index:c.correct_index,
        explanation:`Convert flow: ${gpm} gpm × 1440 ÷ 1,000,000 = ${round(MGD,3)} MGD. Then lb/day = ${mgL} × ${round(MGD,3)} × 8.34 = ${round(lbday,1)} lb/day.`,
        tags:["pounds_formula","unit_conversion"]});
    }
    const mgL=rand(20,320,1), m3d=rand(600,120000,1), kgd=mgL*m3d/1000000;
    const q=`A stream has a concentration of ${mgL} mg/L and a flow of ${m3d} m³/day. What is the loading in kg/day?`;
    const c=numChoices(kgd,"kg/day",[()=>mgL*m3d,()=>kgd*24,()=>kgd/24]);
    return mcq({category:"pounds_formula",difficulty,question:q,choices:c.choices,correct_index:c.correct_index,
      explanation:`kg/day = (mg/L × m³/day) ÷ 1,000,000 = (${mgL} × ${m3d}) ÷ 1,000,000 = ${round(kgd,2)} kg/day.`,
      tags:["pounds_formula","metric"]});
  }

  function dose(target){
    const difficulty=diff(target), system=sys();
    if(system==="US"){
      const MGD=rand(0.5,22,3), lbday=rand(10,800,1), dose=lbday/(MGD*8.34);
      if(difficulty==="easy"){
        const q=`A plant feeds ${lbday} lb/day of chemical at a flow of ${MGD} MGD. What is the dose in mg/L?`;
        const c=numChoices(dose,"mg/L",[()=>lbday/MGD,()=>lbday*MGD*8.34,()=>dose*24]);
        return mcq({category:"dose",difficulty,question:q,choices:c.choices,correct_index:c.correct_index,
          explanation:`Dose = lb/day ÷ (MGD × 8.34) = ${lbday} ÷ (${MGD} × 8.34) = ${round(dose,2)} mg/L.`,
          tags:["dose"]});
      }
      const gpm=round(MGD*C.MGD_TO_GPM,1);
      const q=`A chemical feed rate is ${lbday} lb/day and flow is ${gpm} gpm. What is the dose in mg/L?`;
      const c=numChoices(dose,"mg/L",[()=>lbday/gpm,()=>dose/24,()=>lbday/MGD]);
      return mcq({category:"dose",difficulty,question:q,choices:c.choices,correct_index:c.correct_index,
        explanation:`Convert flow: ${gpm} gpm × 1440 ÷ 1,000,000 = ${round(MGD,3)} MGD. Dose = ${lbday} ÷ (${round(MGD,3)} × 8.34) = ${round(dose,2)} mg/L.`,
        tags:["dose","unit_conversion"]});
    }
    const m3d=rand(1000,120000,1), kgd=rand(5,1000,2), dose=(kgd*1000000)/m3d;
    const q=`A plant feeds ${kgd} kg/day of chemical at a flow of ${m3d} m³/day. What is the dose in mg/L?`;
    const c=numChoices(dose,"mg/L",[()=>kgd/m3d,()=>dose/24,()=>kgd*m3d/1000]);
    return mcq({category:"dose",difficulty,question:q,choices:c.choices,correct_index:c.correct_index,
      explanation:`Dose = (kg/day × 1,000,000) ÷ m³/day = (${kgd} × 1,000,000) ÷ ${m3d} = ${round(dose,2)} mg/L.`,
      tags:["dose","metric"]});
  }

  function conversions(target){
    const difficulty = diff(target);
    const type = weighted([{v:"gpm_to_mgd",w:30},{v:"mgd_to_gpm",w:25},{v:"cfs_to_mgd",w:10},{v:"m3d_to_m3h",w:15},{v:"lps_to_m3d",w:10},{v:"gal_to_mg",w:10}]);
    let q,a,exp,c;
    if(type==="gpm_to_mgd"){
      const gpm=rand(50,18000,1), mgd=gpm*C.GPM_TO_MGD;
      q=`Convert ${gpm} gpm to MGD.`; c=numChoices(mgd,"MGD",[()=>gpm/1000,()=>mgd*24,()=>gpm*1440]);
      exp=`MGD = gpm × 1440 ÷ 1,000,000 = ${gpm} × 1440 ÷ 1,000,000 = ${round(mgd,4)} MGD.`;
    } else if(type==="mgd_to_gpm"){
      const mgd=rand(0.1,20,3), gpm=mgd*C.MGD_TO_GPM;
      q=`Convert ${mgd} MGD to gpm.`; c=numChoices(gpm,"gpm",[()=>mgd*1440,()=>gpm/24,()=>mgd*1000]);
      exp=`gpm = MGD × 1,000,000 ÷ 1440 = ${mgd} × 1,000,000 ÷ 1440 = ${round(gpm,1)} gpm.`;
    } else if(type==="cfs_to_mgd"){
      const cfs=rand(0.5,30,2), mgd=cfs*C.CFS_TO_MGD;
      q=`Convert ${cfs} cfs to MGD.`; c=numChoices(mgd,"MGD",[()=>cfs*6.46317,()=>cfs/0.646317,()=>mgd*24]);
      exp=`MGD = cfs × 0.646317 = ${cfs} × 0.646317 = ${round(mgd,3)} MGD.`;
    } else if(type==="m3d_to_m3h"){
      const m3d=rand(500,120000,1), m3h=m3d/24;
      q=`Convert ${m3d} m³/day to m³/hr.`; c=numChoices(m3h,"m³/hr",[()=>m3d*24,()=>m3d/60,()=>m3d/1440]);
      exp=`m³/hr = m³/day ÷ 24 = ${m3d} ÷ 24 = ${round(m3h,2)} m³/hr.`;
    } else if(type==="lps_to_m3d"){
      const lps=rand(2,120,2), m3d=lps*C.LPS_TO_M3D;
      q=`Convert ${lps} L/s to m³/day.`; c=numChoices(m3d,"m³/day",[()=>lps*8.64,()=>lps/86.4,()=>m3d/24]);
      exp=`m³/day = L/s × 86.4 = ${lps} × 86.4 = ${round(m3d,2)} m³/day.`;
    } else {
      const gal=rand(10000,5000000,0), MG=gal/1000000;
      q=`Convert ${gal} gal to MG.`; c=numChoices(MG,"MG",[()=>gal/1000,()=>MG*24,()=>gal*1000000]);
      exp=`MG = gal ÷ 1,000,000 = ${gal} ÷ 1,000,000 = ${round(MG,4)} MG.`;
    }
    return mcq({category:"flow_conversions",difficulty,question:q,choices:c.choices,correct_index:c.correct_index,explanation:exp,tags:["flow_conversion"]});
  }

  function fm(target){
    const difficulty=diff(target);
    const volumeMG=rand(0.8,8,3), flowMGD=rand(0.8,20,3), bod=rand(100,280,1), mlvss=rand(1500,4000,0);
    const food=bod*flowMGD*8.34, mass=mlvss*volumeMG*8.34, fm=food/mass;
    const q=`Influent BOD is ${bod} mg/L at ${flowMGD} MGD. Aeration basin volume is ${volumeMG} MG and MLVSS is ${mlvss} mg/L. What is the F/M ratio?`;
    const c=numChoices(fm,"",[()=>food/mass/8.34,()=>mass/food,()=>fm*24]);
    return mcq({category:"fm_ratio",difficulty,question:q,choices:c.choices.map(x=>x.trim()),correct_index:c.correct_index,
      explanation:`Food = ${bod} × ${flowMGD} × 8.34 = ${round(food,1)} lb/day. Microorganism mass = ${mlvss} × ${volumeMG} × 8.34 = ${round(mass,1)} lb. F/M = ${round(food,1)} ÷ ${round(mass,1)} = ${round(fm,3)}.`,
      tags:["fm_ratio"]});
  }

  function srt(target){
    const difficulty=diff(target), volumeMG=rand(0.8,10,3), MLSS=rand(1800,4500,0), wastageMGD=rand(0.005,0.2,4), WAS=rand(4000,10000,0), effQ=rand(0.5,20,3), effTSS=rand(5,30,0);
    const systemMass=MLSS*volumeMG*8.34, wasted=WAS*wastageMGD*8.34, effLoss=effTSS*effQ*8.34;
    if(difficulty==="easy"){
      const s=systemMass/wasted, q=`A plant has ${MLSS} mg/L MLSS in ${volumeMG} MG. It wastes ${wastageMGD} MGD at ${WAS} mg/L solids. What is the SRT in days?`;
      const c=numChoices(s,"days",[()=>systemMass/(wasted+effLoss),()=>wasted/systemMass,()=>s*24]);
      return mcq({category:"srt",difficulty,question:q,choices:c.choices,correct_index:c.correct_index,
        explanation:`System solids = ${MLSS} × ${volumeMG} × 8.34 = ${round(systemMass,1)} lb. Wasted/day = ${WAS} × ${wastageMGD} × 8.34 = ${round(wasted,1)} lb/day. SRT = ${round(systemMass,1)} ÷ ${round(wasted,1)} = ${round(s,1)} days.`,
        tags:["srt","simplified"]});
    }
    const s=systemMass/(wasted+effLoss), q=`A plant has ${MLSS} mg/L MLSS in ${volumeMG} MG. WAS flow is ${wastageMGD} MGD at ${WAS} mg/L, and effluent flow is ${effQ} MGD with ${effTSS} mg/L TSS. What is the SRT in days?`;
    const c=numChoices(s,"days",[()=>systemMass/wasted,()=>systemMass/effLoss,()=>s*24]);
    return mcq({category:"srt",difficulty,question:q,choices:c.choices,correct_index:c.correct_index,
      explanation:`System solids = ${MLSS} × ${volumeMG} × 8.34 = ${round(systemMass,1)} lb. Wasted/day = ${WAS} × ${wastageMGD} × 8.34 = ${round(wasted,1)} lb/day. Effluent loss = ${effTSS} × ${effQ} × 8.34 = ${round(effLoss,1)} lb/day. SRT = ${round(systemMass,1)} ÷ (${round(wasted,1)} + ${round(effLoss,1)}) = ${round(s,1)} days.`,
      tags:["srt","full_form"]});
  }

  function svi(target){
    const difficulty=diff(target), mlss=rand(1500,4500,0), ssv=rand(50,400,0), svi=ssv*1000/mlss;
    const interp = svi<80 ? "Pin floc / old sludge" : svi<=120 ? "Good settling" : svi<=200 ? "Mild bulking" : "Severe bulking";
    if(difficulty==="hard" || difficulty==="insane"){
      return mcq({category:"svi",difficulty,
        question:`A 30-minute settled sludge volume is ${ssv} mL/L and MLSS is ${mlss} mg/L. What is the SVI in mL/g, and what does it most likely indicate?`,
        choices:[`${round(svi,0)} mL/g — ${interp}`,`${round(svi/10,0)} mL/g — Good settling`,`${round(svi*10,0)} mL/g — Pin floc / old sludge`,`${round(svi,0)} mL/g — Mechanical failure`],
        correct_index:0,
        explanation:`SVI = (SSV × 1000) ÷ MLSS = (${ssv} × 1000) ÷ ${mlss} = ${round(svi,0)} mL/g. This most closely indicates ${interp}.`,
        tags:["svi","interpretation"]});
    }
    const c=numChoices(svi,"mL/g",[()=>ssv/mlss,()=>mlss/ssv,()=>svi*10]);
    return mcq({category:"svi",difficulty,question:`The 30-minute settled sludge volume is ${ssv} mL/L and MLSS is ${mlss} mg/L. What is the SVI in mL/g?`,choices:c.choices,correct_index:c.correct_index,explanation:`SVI = (SSV × 1000) ÷ MLSS = (${ssv} × 1000) ÷ ${mlss} = ${round(svi,0)} mL/g.`,tags:["svi"]});
  }

  function bod(target){
    const difficulty=diff(target);
    if(difficulty==="easy"){
      const D1=rand(7,9,1), D2=rand(1,4,1), P=rand(0.02,0.2,3), bod=(D1-D2)/P;
      const c=numChoices(bod,"mg/L",[()=>D1-D2,()=>bod*P,()=>bod/5]);
      return mcq({category:"bod",difficulty,question:`A BOD bottle has an initial DO of ${D1} mg/L and a final DO of ${D2} mg/L. The sample fraction is ${P}. What is the unseeded BOD in mg/L?`,choices:c.choices,correct_index:c.correct_index,explanation:`Unseeded BOD = (D1 - D2) ÷ P = (${D1} - ${D2}) ÷ ${P} = ${round(bod,0)} mg/L.`,tags:["bod","unseeded"]});
    }
    const D1=rand(7,9,1), D2=rand(1,4,1), P=rand(0.02,0.2,3), B1=rand(7,9,1), B2=rand(6,8.5,1), f=rand(0.3,1.0,2), bod=((D1-D2)-f*(B1-B2))/P;
    const c=numChoices(bod,"mg/L",[()=>((D1-D2))/P,()=>((D1-D2)+(f*(B1-B2)))/P,()=>bod/5]);
    return mcq({category:"bod",difficulty,question:`A seeded BOD test has: sample bottle DO initial ${D1} mg/L, final ${D2} mg/L; seed control DO initial ${B1} mg/L, final ${B2} mg/L; seed correction factor ${f}; sample fraction ${P}. What is the BOD in mg/L?`,choices:c.choices,correct_index:c.correct_index,explanation:`Seeded BOD = [(D1-D2) - f(B1-B2)] ÷ P = [(${D1}-${D2}) - ${f}(${B1}-${B2})] ÷ ${P} = ${round(bod,0)} mg/L.`,tags:["bod","seeded"]});
  }

  function alkalinity(target){
    const difficulty=diff(target);
    if(difficulty==="hard" || difficulty==="insane"){
      const infl=rand(120,260,0), eff=rand(40,120,0), consumed=infl-eff;
      const c=numChoices(consumed,"mg/L",[()=>infl+eff,()=>infl/eff,()=>consumed*7.14]);
      return mcq({category:"alkalinity",difficulty,question:`Influent alkalinity is ${infl} mg/L as CaCO3 and effluent alkalinity is ${eff} mg/L as CaCO3. How much alkalinity was consumed in mg/L as CaCO3?`,choices:c.choices,correct_index:c.correct_index,explanation:`Alkalinity consumed = influent - effluent = ${infl} - ${eff} = ${consumed} mg/L as CaCO3.`,tags:["alkalinity","interpretation"]});
    }
    const A=rand(4,18,2), N=rand(0.02,0.1,3), V=Math.random()<0.5 ? 100 : rand(50,200,0), alk=A*N*50000/V;
    const c=numChoices(alk,"mg/L",[()=>A*50000/V,()=>A*N*5000/V,()=>alk/10]);
    return mcq({category:"alkalinity",difficulty,question:`A titration uses ${A} mL of acid with normality ${N} on a ${V} mL sample. What is the alkalinity in mg/L as CaCO3?`,choices:c.choices,correct_index:c.correct_index,explanation:`Alkalinity = (A × N × 50,000) ÷ sample mL = (${A} × ${N} × 50,000) ÷ ${V} = ${round(alk,0)} mg/L as CaCO3.`,tags:["alkalinity","titration"]});
  }

  function ct(target){
    const difficulty=diff(target), Cc=rand(0.5,5,2), T=rand(5,60,1), CT=Cc*T;
    if(difficulty==="easy"){
      const c=numChoices(CT,"mg·min/L",[()=>Cc+T,()=>CT/60,()=>Cc/T]);
      return mcq({category:"ct",difficulty,question:`Chlorine residual is ${Cc} mg/L and contact time is ${T} min. What is the CT value in mg·min/L?`,choices:c.choices,correct_index:c.correct_index,explanation:`CT = C × T = ${Cc} × ${T} = ${round(CT,0)} mg·min/L.`,tags:["ct"]});
    }
    if(Math.random()<0.5){
      const reqCT=rand(15,80,0), reqT=reqCT/Cc;
      const c=numChoices(reqT,"min",[()=>reqCT*Cc,()=>Cc/reqCT,()=>reqT/60]);
      return mcq({category:"ct",difficulty,question:`Required CT is ${reqCT} mg·min/L and residual chlorine is ${Cc} mg/L. What contact time is required in min?`,choices:c.choices,correct_index:c.correct_index,explanation:`T = CT ÷ C = ${reqCT} ÷ ${Cc} = ${round(reqT,1)} min.`,tags:["ct","solve_for_time"]});
    }
    const reqCT=rand(15,80,0), reqC=reqCT/T;
    const c=numChoices(reqC,"mg/L",[()=>reqCT*T,()=>T/reqCT,()=>reqC*60]);
    return mcq({category:"ct",difficulty,question:`Required CT is ${reqCT} mg·min/L and contact time is ${T} min. What chlorine residual is required in mg/L?`,choices:c.choices,correct_index:c.correct_index,explanation:`C = CT ÷ T = ${reqCT} ÷ ${T} = ${round(reqC,2)} mg/L.`,tags:["ct","solve_for_residual"]});
  }

  function filtration(target){
    const difficulty=diff(target);
    if(Math.random()<0.6){
      const flow=rand(500,8000,1), area=rand(80,1200,0), rate=flow/area;
      const c=numChoices(rate,"gpm/ft²",[()=>flow*area,()=>area/flow,()=>rate*24]);
      return mcq({category:"filtration",difficulty,question:`A filter receives ${flow} gpm and has an area of ${area} ft². What is the hydraulic loading rate in gpm/ft²?`,choices:c.choices,correct_index:c.correct_index,explanation:`Hydraulic loading = Flow ÷ Area = ${flow} ÷ ${area} = ${round(rate,2)} gpm/ft².`,tags:["filtration","loading"]});
    }
    const lbs=rand(20,600,1), hours=rand(2,24,1), area=rand(80,1200,0), y=lbs/(hours*area);
    const c=numChoices(y,"lb/hr/ft²",[()=>lbs/area,()=>y*24,()=>area/(lbs*hours)]);
    return mcq({category:"filtration",difficulty,question:`A filter removes ${lbs} lb of solids over ${hours} hr and has an area of ${area} ft². What is the filter yield in lb/hr/ft²?`,choices:c.choices,correct_index:c.correct_index,explanation:`Yield = lb solids ÷ (hr × ft²) = ${lbs} ÷ (${hours} × ${area}) = ${round(y,3)} lb/hr/ft².`,tags:["filtration","yield"]});
  }

  function backwash(target){
    const difficulty=diff(target);
    if(Math.random()<0.6){
      const flow=rand(800,5000,1), area=rand(100,500,0), rate=flow/area;
      const c=numChoices(rate,"gpm/ft²",[()=>flow*area,()=>area/flow,()=>rate*24]);
      return mcq({category:"backwash",difficulty,question:`Backwash flow is ${flow} gpm and filter area is ${area} ft². What is the backwash rise rate in gpm/ft²?`,choices:c.choices,correct_index:c.correct_index,explanation:`Rise rate = Backwash flow ÷ Area = ${flow} ÷ ${area} = ${round(rate,2)} gpm/ft².`,tags:["backwash","rise_rate"]});
    }
    const orig=rand(18,36,1), expanded=rand(orig+4,orig+16,1), pct=((expanded-orig)/orig)*100;
    const c=numChoices(pct,"%",[()=>expanded/orig*100,()=>orig/expanded*100,()=>pct/10]);
    return mcq({category:"backwash",difficulty,question:`A filter media bed depth expands from ${orig} in to ${expanded} in during backwash. What is the bed expansion in %?`,choices:c.choices,correct_index:c.correct_index,explanation:`Expansion = ((Expanded - Original) ÷ Original) × 100 = ((${expanded}-${orig}) ÷ ${orig}) × 100 = ${round(pct,0)}%.`,tags:["backwash","expansion"]});
  }

  function pumps(target){
    const difficulty=diff(target), Q=rand(100,3000,1), H=rand(20,180,1), effPct=rand(55,85,0), eff=effPct/100, HP=(Q*H)/(3960*eff);
    const c=numChoices(HP,"HP",[()=>Q*H/3960,()=>Q*H*eff/3960,()=>HP*0.746]);
    return mcq({category:"pumps",difficulty,question:`A pump delivers ${Q} gpm against ${H} ft of head at ${effPct}% efficiency. What pump horsepower is required?`,choices:c.choices,correct_index:c.correct_index,explanation:`HP = (Q × H) ÷ (3960 × efficiency) = (${Q} × ${H}) ÷ (3960 × ${eff}) = ${round(HP,1)} HP.`,tags:["pumps","horsepower"]});
  }

  function sludge(target){
    const difficulty=diff(target);
    if(Math.random()<0.45){
      const dry=rand(2,20,2), wet=rand(dry+20,300,2), pct=dry/wet*100;
      const c=numChoices(pct,"%",[()=>dry/wet,()=>wet/dry*100,()=>pct*10]);
      return mcq({category:"sludge",difficulty,question:`A sludge sample has a dry weight of ${dry} g and a wet weight of ${wet} g. What is the percent solids?`,choices:c.choices,correct_index:c.correct_index,explanation:`% solids = (dry weight ÷ wet weight) × 100 = (${dry} ÷ ${wet}) × 100 = ${round(pct,1)}%.`,tags:["sludge","percent_solids"]});
    }
    const flow=rand(0.05,3,3), pct=rand(0.5,6,1)/100, dryTons=flow*pct*8.34*1000000/2000;
    const c=numChoices(dryTons,"dry ton/day",[()=>flow*pct*8.34/2000,()=>dryTons/24,()=>dryTons*100]);
    return mcq({category:"sludge",difficulty,question:`A sludge stream has a flow of ${flow} MGD and ${round(pct*100,1)}% solids. What is the dry solids production in dry ton/day?`,choices:c.choices,correct_index:c.correct_index,explanation:`Dry tons/day = Flow × %solids × 8.34 × 1,000,000 ÷ 2000 = ${flow} × ${pct} × 8.34 × 1,000,000 ÷ 2000 = ${round(dryTons,2)} dry ton/day.`,tags:["sludge","dry_solids"]});
  }

  function velocity(target){
    const difficulty=diff(target);
    if(Math.random()<0.5){
      const gpm=rand(150,4000,1), diaIn=rand(6,36,1), diaFt=diaIn/12, area=Math.PI*(diaFt*diaFt)/4, cfs=(gpm*C.GPM_TO_MGD)/C.CFS_TO_MGD, vel=cfs/area;
      const c=numChoices(vel,"ft/s",[()=>gpm/area,()=>cfs*area,()=>vel*24]);
      return mcq({category:"velocity",difficulty,question:`Flow in a circular pipe is ${gpm} gpm and pipe diameter is ${diaIn} in. What is the velocity in ft/s?`,choices:c.choices,correct_index:c.correct_index,explanation:`Diameter ${diaIn} in = ${round(diaFt,3)} ft. Area = πd²/4 = ${round(area,3)} ft². Flow = ${round(cfs,3)} cfs. Velocity = Q ÷ A = ${round(cfs,3)} ÷ ${round(area,3)} = ${round(vel,2)} ft/s.`,tags:["velocity","pipe"]});
    }
    const width=rand(1,8,1), depth=rand(0.4,4,1), flow=rand(0.2,6,2), area=width*depth, vel=flow/area;
    const c=numChoices(vel,"ft/s",[()=>flow*area,()=>area/flow,()=>vel*24]);
    return mcq({category:"velocity",difficulty,question:`An open channel is ${width} ft wide with a flow depth of ${depth} ft. Flow is ${flow} cfs. What is the velocity in ft/s?`,choices:c.choices,correct_index:c.correct_index,explanation:`Area = width × depth = ${width} × ${depth} = ${round(area,2)} ft². Velocity = Q ÷ A = ${flow} ÷ ${round(area,2)} = ${round(vel,2)} ft/s.`,tags:["velocity","channel"]});
  }

  function pipeVolume(target){
    const difficulty=diff(target), diaIn=rand(6,36,1), lenFt=rand(50,2000,1), diaFt=diaIn/12, area=Math.PI*(diaFt*diaFt)/4, ft3=area*lenFt, gal=ft3*7.48052;
    if(Math.random()<0.5){
      const c=numChoices(gal,"gal",[()=>ft3,()=>gal/7.48052,()=>gal*24]);
      return mcq({category:"pipe_volume",difficulty,question:`A pipe is ${diaIn} in in diameter and ${lenFt} ft long. What volume does it hold in gal?`,choices:c.choices,correct_index:c.correct_index,explanation:`Pipe area = πd²/4 = ${round(area,3)} ft². Volume = area × length = ${round(area,3)} × ${lenFt} = ${round(ft3,2)} ft³. Convert to gallons: ${round(ft3,2)} × 7.48052 = ${round(gal,1)} gal.`,tags:["pipe_volume"]});
    }
    const flowGPM=rand(50,2000,1), minutes=gal/flowGPM;
    const c=numChoices(minutes,"min",[()=>gal*flowGPM,()=>gal/flowGPM/60,()=>minutes*24]);
    return mcq({category:"pipe_volume",difficulty,question:`A pipe is ${diaIn} in in diameter and ${lenFt} ft long. If flow through the pipe is ${flowGPM} gpm, how long would it take to fill the pipe in min?`,choices:c.choices,correct_index:c.correct_index,explanation:`Pipe volume = ${round(gal,1)} gal. Time = volume ÷ flow = ${round(gal,1)} ÷ ${flowGPM} = ${round(minutes,1)} min.`,tags:["pipe_volume","fill_time"]});
  }

  function geometry(target){
    const difficulty=diff(target);
    if(Math.random()<0.5){
      const L=rand(40,400,1), W=rand(20,150,1), D=rand(8,25,1), ft3=L*W*D, MG=ft3*7.48052/1000000;
      const c=numChoices(MG,"MG",[()=>ft3,()=>MG*24,()=>L*W]);
      return mcq({category:"geometry",difficulty,question:`A rectangular basin is ${L} ft long, ${W} ft wide, and ${D} ft deep. What is the basin volume in MG?`,choices:c.choices,correct_index:c.correct_index,explanation:`Volume = L × W × D = ${L} × ${W} × ${D} = ${round(ft3,1)} ft³. Convert to gallons and then MG = ${round(MG,3)} MG.`,tags:["geometry","rectangular"]});
    }
    const dia=rand(20,120,1), D=rand(8,20,1), r=dia/2, area=Math.PI*r*r, ft3=area*D, MG=ft3*7.48052/1000000;
    const c=numChoices(MG,"MG",[()=>area,()=>ft3,()=>MG*24]);
    return mcq({category:"geometry",difficulty,question:`A circular basin has a diameter of ${dia} ft and a depth of ${D} ft. What is the volume in MG?`,choices:c.choices,correct_index:c.correct_index,explanation:`Area = πr² = π × ${r}² = ${round(area,1)} ft². Volume = area × depth = ${round(area,1)} × ${D} = ${round(ft3,1)} ft³. Convert to MG = ${round(MG,3)} MG.`,tags:["geometry","circular"]});
  }

  function weir(target){
    const difficulty=diff(target);
    if(Math.random()<0.6){
      const MGD=rand(0.5,8,3), ft=rand(40,300,1), gpdft=MGD*1000000/ft;
      const c=numChoices(gpdft,"gpd/ft",[()=>MGD/ft,()=>MGD*ft*1000,()=>gpdft/24]);
      return mcq({category:"weir_loading",difficulty,question:`A clarifier handles ${MGD} MGD over a weir length of ${ft} ft. What is the weir loading in gpd/ft?`,choices:c.choices,correct_index:c.correct_index,explanation:`Convert flow to gpd: ${MGD} × 1,000,000 = ${round(MGD*1000000,0)} gpd. Weir loading = flow ÷ weir length = ${round(MGD*1000000,0)} ÷ ${ft} = ${round(gpdft,0)} gpd/ft.`,tags:["weir_loading","experimental"]});
    }
    const dia=rand(20,120,1), MGD=rand(0.5,8,3), len=Math.PI*dia, gpdft=MGD*1000000/len;
    const c=numChoices(gpdft,"gpd/ft",[()=>MGD*1000000/dia,()=>len/MGD,()=>gpdft*24]);
    return mcq({category:"weir_loading",difficulty,question:`A circular clarifier has a diameter of ${dia} ft and treats ${MGD} MGD. Assuming flow goes over the full weir circumference, what is the weir loading in gpd/ft?`,choices:c.choices,correct_index:c.correct_index,explanation:`Weir length = πD = π × ${dia} = ${round(len,1)} ft. Flow = ${MGD} × 1,000,000 = ${round(MGD*1000000,0)} gpd. Loading = ${round(MGD*1000000,0)} ÷ ${round(len,1)} = ${round(gpdft,0)} gpd/ft.`,tags:["weir_loading","experimental","geometry"]});
  }

  const families = {
    detention_time: detention, pounds_formula: pounds, dose: dose, flow_conversions: conversions,
    fm_ratio: fm, srt: srt, svi: svi, bod: bod, alkalinity: alkalinity, ct: ct, filtration: filtration,
    backwash: backwash, pumps: pumps, sludge: sludge, velocity: velocity, pipe_volume: pipeVolume,
    geometry: geometry, weir_loading: weir
  };
  const familyList = [
    ["any","Any"],["detention_time","Detention Time"],["pounds_formula","Pounds Formula"],["dose","Dose"],
    ["flow_conversions","Flow Conversions"],["fm_ratio","F/M Ratio"],["srt","SRT / MCRT"],["svi","SVI"],["bod","BOD"],
    ["alkalinity","Alkalinity"],["ct","CT"],["filtration","Filter Loading / Yield"],["backwash","Backwash / Expansion"],
    ["pumps","Pumps / Horsepower"],["sludge","Sludge / Dry Solids"],["velocity","Velocity"],["pipe_volume","Pipe Volume"],
    ["geometry","Basin Geometry"],["weir_loading","Weir Loading (Experimental)"]
  ].map(([id,title])=>({id,title}));

  function generate(options={}){
    const family = options.family && options.family !== "any" ? options.family : weighted([
      {v:"detention_time",w:8},{v:"pounds_formula",w:9},{v:"dose",w:8},{v:"flow_conversions",w:3},
      {v:"fm_ratio",w:8},{v:"srt",w:8},{v:"svi",w:7},{v:"bod",w:6},{v:"alkalinity",w:5},
      {v:"ct",w:6},{v:"filtration",w:5},{v:"backwash",w:4},{v:"pumps",w:4},{v:"sludge",w:5},
      {v:"velocity",w:4},{v:"pipe_volume",w:4},{v:"geometry",w:4},{v:"weir_loading",w:1}
    ]);
    return families[family](options.difficulty || null);
  }
  return {generate, familyList};
})();
