export const CLARIFIER_NODES = [
  {
    "id": "CL001",
    "category": "clarifiers",
    "label": "High sludge blanket",
    "indicators": [
      "sludge blanket near weirs",
      "solids carryover",
      "increasing blanket depth readings"
    ],
    "causes": [
      "poor settling sludge",
      "insufficient sludge removal",
      "high flow conditions"
    ],
    "effects": [
      "solids washout",
      "high effluent TSS"
    ],
    "corrections": [
      "increase sludge withdrawal",
      "improve sludge settling",
      "monitor flow conditions"
    ],
    "relationships": [
      {
        "type": "results_in",
        "target": "CL004",
        "strength": 0.9
      }
    ],
    "organisms": [],
    "distractor_tags": [
      "rising_sludge",
      "pin_floc"
    ],
    "tags": [
      "blanket_depth",
      "settling",
      "clarifier"
    ]
  },
  {
    "id": "CL002",
    "category": "clarifiers",
    "label": "Rising sludge",
    "indicators": [
      "sludge rising to surface",
      "gas bubbles in sludge blanket",
      "floating sludge"
    ],
    "causes": [
      "denitrification in clarifier",
      "long sludge detention time"
    ],
    "effects": [
      "solids carryover",
      "floating sludge layers"
    ],
    "corrections": [
      "increase sludge removal",
      "reduce sludge detention time",
      "improve process control"
    ],
    "relationships": [
      {
        "type": "causes",
        "target": "CL003",
        "strength": 0.9
      }
    ],
    "organisms": [],
    "distractor_tags": [
      "filamentous_bulking",
      "pin_floc"
    ],
    "tags": [
      "denitrification",
      "clarifier",
      "sludge_blanket"
    ]
  },
  {
    "id": "CL003",
    "category": "clarifiers",
    "label": "Denitrification in clarifier",
    "indicators": [
      "gas bubbles in sludge",
      "rising sludge",
      "floating sludge masses"
    ],
    "causes": [
      "nitrate presence",
      "anoxic conditions in clarifier"
    ],
    "effects": [
      "sludge flotation",
      "solids washout"
    ],
    "corrections": [
      "increase sludge withdrawal",
      "maintain proper sludge blanket depth"
    ],
    "relationships": [
      {
        "type": "results_in",
        "target": "CL002",
        "strength": 0.92
      }
    ],
    "organisms": [],
    "distractor_tags": [
      "low_DO",
      "pin_floc"
    ],
    "tags": [
      "denitrification",
      "nitrogen",
      "clarifier"
    ]
  },
  {
    "id": "CL004",
    "category": "clarifiers",
    "label": "Solids carryover",
    "indicators": [
      "cloudy effluent",
      "elevated effluent suspended solids",
      "visible solids leaving clarifier"
    ],
    "causes": [
      "poor sludge settling",
      "high sludge blanket",
      "clarifier overloading"
    ],
    "effects": [
      "high effluent TSS",
      "permit violations"
    ],
    "corrections": [
      "improve settling conditions",
      "adjust sludge removal",
      "reduce hydraulic loading"
    ],
    "relationships": [],
    "organisms": [],
    "distractor_tags": [
      "low_alkalinity",
      "chlorine_residual"
    ],
    "tags": [
      "TSS",
      "effluent",
      "clarifier"
    ]
  }
]
