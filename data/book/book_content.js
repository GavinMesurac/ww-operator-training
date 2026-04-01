export const BOOK_CONTENT = {
  "chapters": [
    {
      "id": "ch1",
      "title": "Introduction to Wastewater Treatment",
      "category": "intro",
      "sections": [
        {
          "title": "What's in a Name?",
          "summary": "Introduces wastewater treatment terminology and the idea of water resource recovery. Frames the operator's role as both protecting public health and recovering value from wastewater streams.",
          "operator_focus": [
            "Know treatment train terminology",
            "Understand why facilities are called WRRFs",
            "Connect treatment goals to public health and environmental protection"
          ]
        },
        {
          "title": "Why Treat Wastewater?",
          "summary": "Explains why untreated wastewater must be controlled: oxygen depletion, solids deposition, nutrients, pathogens, nuisance conditions, and receiving-stream impacts.",
          "operator_focus": [
            "Link poor treatment to stream impacts",
            "Connect permit compliance to treatment goals",
            "Recognize why each process step exists"
          ]
        },
        {
          "title": "Components of Wastewater",
          "summary": "Covers water, solids, biochemical oxygen demand, nutrients, fats/oils/grease, bacteria, and pathogens. Gives the baseline language used in later chapters.",
          "operator_focus": [
            "Know major wastewater components",
            "Connect each component to a treatment process",
            "Recognize common abbreviations and units"
          ]
        },
        {
          "title": "The Clean Water Act",
          "summary": "Introduces the regulatory framework behind modern wastewater treatment and permits. Gives context for secondary treatment standards and compliance obligations.",
          "operator_focus": [
            "Understand why permit limits exist",
            "Recognize relationship between law and operations",
            "Connect compliance to reporting and sampling"
          ]
        },
        {
          "title": "Basic Wastewater Treatment Processes",
          "summary": "Outlines the liquid line and solids line, from collection through preliminary, primary, secondary, advanced treatment, disinfection, thickening, stabilization, and dewatering.",
          "operator_focus": [
            "Understand the full treatment train",
            "Know where each unit process fits",
            "Connect liquid and solids handling lines"
          ]
        }
      ]
    },
    {
      "id": "ch2",
      "title": "Wastewater Characteristics",
      "category": "characteristics",
      "sections": [
        {
          "title": "Characterization of Wastewater",
          "summary": "Explains how wastewater is described using solids, oxygen demand, nutrients, pathogens, fats/oils/grease, and other measurable parameters.",
          "operator_focus": [
            "Know what each parameter means",
            "Understand why characterization matters for process control",
            "Recognize typical domestic wastewater relationships"
          ]
        },
        {
          "title": "Influent Characteristics",
          "summary": "Describes what operators should expect at the head of the plant and how influent variability affects downstream processes.",
          "operator_focus": [
            "Watch for changing load patterns",
            "Connect influent changes to process response",
            "Recognize diurnal and wet-weather impacts"
          ]
        }
      ]
    },
    {
      "id": "ch3",
      "title": "Preliminary Treatment of Wastewater",
      "category": "preliminary",
      "sections": [
        {
          "title": "Screening",
          "summary": "Removes rags, sticks, wipes, plastics, and large debris that can damage pumps and clog downstream equipment.",
          "operator_focus": [
            "Keep screens clean",
            "Recognize blinding and overflow risk",
            "Connect ragging to downstream maintenance problems"
          ]
        },
        {
          "title": "Grit Removal",
          "summary": "Targets heavy inorganic solids like sand, coffee grounds, eggshells, and cinders that cause wear, deposition, and loss of volume downstream.",
          "operator_focus": [
            "Know why grit must be removed early",
            "Watch for grit carryover",
            "Connect flow velocity to removal efficiency"
          ]
        },
        {
          "title": "Additional Pretreatment Considerations",
          "summary": "Covers odor, flow surges, headworks hydraulics, and other issues that influence plant performance before primary clarification.",
          "operator_focus": [
            "Recognize septic headworks conditions",
            "Watch for surge impacts",
            "Support downstream stability"
          ]
        },
        {
          "title": "Regulatory and Safety Considerations",
          "summary": "Highlights safety and compliance expectations at headworks, including hazardous atmospheres, housekeeping, and safe access.",
          "operator_focus": [
            "Treat headworks as a high-hazard area",
            "Use good ventilation and housekeeping",
            "Follow safety procedures consistently"
          ]
        }
      ]
    },
    {
      "id": "ch4",
      "title": "Primary Treatment of Wastewater",
      "category": "primary",
      "sections": [
        {
          "title": "Purpose and Function",
          "summary": "Primary clarifiers remove settleable and floatable solids before biological treatment, reducing downstream loading and helping overall plant stability.",
          "operator_focus": [
            "Connect primary removal to downstream aeration demand",
            "Track percent removal for solids and BOD",
            "Operate clarifiers as part of the whole plant"
          ]
        },
        {
          "title": "Theory of Operation",
          "summary": "Explains gravity settling, scum removal, sludge collection, hydraulic loading, and detention time as the foundation of clarifier performance.",
          "operator_focus": [
            "Understand settling and flotation behavior",
            "Connect flow and solids loading to performance",
            "Watch sludge blanket and scum control"
          ]
        },
        {
          "title": "Equipment and Process Variables",
          "summary": "Covers clarifier mechanisms, drives, flights/plows, sludge hoppers, skimming, recycle flows, and the operating variables that drive performance.",
          "operator_focus": [
            "Inspect mechanisms routinely",
            "Manage sludge pumping",
            "Control floatables and scum"
          ]
        },
        {
          "title": "Operation of Primary Clarifiers",
          "summary": "Focuses on putting a clarifier into service, taking it out of service, sludge removal, skimming, housekeeping, and odor control.",
          "operator_focus": [
            "Prevent solids from becoming septic",
            "Skim consistently",
            "Coordinate sludge pumping with blanket depth and hopper conditions"
          ]
        },
        {
          "title": "Data Collection, Sampling, and Analysis",
          "summary": "Uses blanket depth, settleable solids, TSS, volatile solids, COD/BOD, surface appearance, and flow data to judge clarifier performance.",
          "operator_focus": [
            "Trend process data",
            "Use visual inspections plus lab data",
            "Tie numbers to operating changes"
          ]
        },
        {
          "title": "Maintenance, Troubleshooting, and Records",
          "summary": "Covers lubrication, inspections, spare parts, housekeeping, mechanical problems, and the records needed for stable operation and accountability.",
          "operator_focus": [
            "Do preventive maintenance",
            "Keep accurate logs",
            "Troubleshoot hydraulics, solids, and mechanisms systematically"
          ]
        }
      ]
    },
    {
      "id": "ch5",
      "title": "Fundamentals of Biological Treatment",
      "category": "biology",
      "sections": [
        {
          "title": "Physical and Chemical Requirements",
          "summary": "Covers biodegradable waste, nonbiodegradable/inert material, dissolved oxygen, nutrients, pH, and other conditions microbes need for treatment.",
          "operator_focus": [
            "Know what biology needs to work",
            "Recognize when wastewater is treatable vs resistant",
            "Connect chemistry to biology"
          ]
        },
        {
          "title": "Microbiology",
          "summary": "Introduces bacteria and other organisms involved in secondary treatment, including how microbial health affects floc formation and process performance.",
          "operator_focus": [
            "Understand core organism roles",
            "Use biology observations in troubleshooting",
            "Connect microbial changes to plant conditions"
          ]
        },
        {
          "title": "Microbial Growth Rates",
          "summary": "Explains growth, decay, sludge age, food-to-microorganism relationships, and why process balance matters in biological systems.",
          "operator_focus": [
            "Use wasting and solids inventory deliberately",
            "Connect F/M and SRT to treatment quality",
            "Recognize signs of young vs old sludge"
          ]
        }
      ]
    },
    {
      "id": "ch6",
      "title": "Wastewater Treatment Ponds",
      "category": "ponds",
      "sections": [
        {
          "title": "Purpose and Function",
          "summary": "Explains how ponds use detention time, sunlight, biological activity, and simple hydraulics to treat wastewater.",
          "operator_focus": [
            "Understand pond treatment basics",
            "Recognize land-intensive but simple operation",
            "Watch detention and hydraulic behavior"
          ]
        },
        {
          "title": "Theory of Operation",
          "summary": "Covers facultative behavior, layering, algae, oxygen balance, and natural stabilization processes.",
          "operator_focus": [
            "Recognize aerobic and anaerobic zones",
            "Connect algae and detention to performance",
            "Watch seasonal changes"
          ]
        },
        {
          "title": "Process Variables and Control",
          "summary": "Discusses loading, detention time, short-circuiting, algae carryover, and day-to-day operation.",
          "operator_focus": [
            "Watch short-circuiting",
            "Monitor effluent quality",
            "Manage nuisance and algae impacts"
          ]
        }
      ]
    },
    {
      "id": "ch10",
      "title": "Disinfection",
      "category": "disinfection",
      "sections": [
        {
          "title": "Chlorine Disinfection",
          "summary": "Covers chlorine feed, dose, residual, contact time, demand, and the practical relationship between operator settings and pathogen reduction.",
          "operator_focus": [
            "Know dose vs residual",
            "Track contact time",
            "Recognize high demand and poor kill conditions"
          ]
        },
        {
          "title": "UV Disinfection",
          "summary": "Explains UV intensity, transmittance, sleeve cleanliness, lamp output, and the way suspended solids and fouling reduce effective dose.",
          "operator_focus": [
            "Keep sleeves clean",
            "Watch UV intensity alarms",
            "Connect turbidity/TSS to reduced UV performance"
          ]
        },
        {
          "title": "Safety and Hazards",
          "summary": "Highlights chlorine hazards, UV radiation exposure, electrical risks, lifting hazards, and mercury concerns in UV systems.",
          "operator_focus": [
            "Treat disinfection as high hazard",
            "Follow chemical and electrical safety procedures",
            "Recognize mercury handling requirements"
          ]
        },
        {
          "title": "Sampling and Analysis",
          "summary": "Uses chlorine residual testing, indicator organism sampling, and routine verification to confirm disinfection performance.",
          "operator_focus": [
            "Sample correctly",
            "Use the right test for the system",
            "Tie monitoring results to operating decisions"
          ]
        },
        {
          "title": "System Comparison",
          "summary": "Compares chlorine and UV by operator attention, hazards, residual behavior, and treatment limitations.",
          "operator_focus": [
            "Know pros/cons of each method",
            "Choose the best operational response for the system you run",
            "Recognize what each system can and cannot fix"
          ]
        }
      ]
    }
  ],
  "acronyms": [
    {
      "term": "DO",
      "meaning": "Dissolved Oxygen",
      "why_it_matters": "Core control variable for aerobic treatment and nitrification."
    },
    {
      "term": "BOD",
      "meaning": "Biochemical Oxygen Demand",
      "why_it_matters": "Represents biodegradable strength and oxygen demand of wastewater."
    },
    {
      "term": "TSS",
      "meaning": "Total Suspended Solids",
      "why_it_matters": "Measures particulate matter and is critical for clarifier/filter performance."
    },
    {
      "term": "MLSS",
      "meaning": "Mixed Liquor Suspended Solids",
      "why_it_matters": "Tracks biomass inventory in activated sludge."
    },
    {
      "term": "SRT",
      "meaning": "Solids Retention Time",
      "why_it_matters": "Controls biomass age and biological stability."
    },
    {
      "term": "MCRT",
      "meaning": "Mean Cell Residence Time",
      "why_it_matters": "Often used interchangeably with SRT in process control."
    },
    {
      "term": "F/M",
      "meaning": "Food to Microorganism Ratio",
      "why_it_matters": "Shows the balance between incoming food and available biomass."
    },
    {
      "term": "CT",
      "meaning": "Concentration \u00d7 Time",
      "why_it_matters": "Key concept in chlorine disinfection effectiveness."
    },
    {
      "term": "NPDES",
      "meaning": "National Pollutant Discharge Elimination System",
      "why_it_matters": "Permit framework that sets discharge limits and reporting requirements."
    }
  ]
};
