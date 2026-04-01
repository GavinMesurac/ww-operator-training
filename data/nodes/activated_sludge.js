export const ACTIVATED_SLUDGE_NODES = [
  {
    "id": "AS001",
    "category": "activated_sludge",
    "label": "Low dissolved oxygen",
    "indicators": [
      "low basin DO",
      "dark septic conditions",
      "poor floc formation"
    ],
    "causes": [
      "insufficient aeration",
      "high organic loading",
      "blower problems"
    ],
    "effects": [
      "filamentous bulking",
      "poor settling",
      "high effluent TSS",
      "loss of nitrification"
    ],
    "corrections": [
      "increase aeration",
      "check blower performance",
      "reduce loading if possible"
    ],
    "relationships": [
      {
        "type": "causes",
        "target": "AS002",
        "strength": 0.95
      },
      {
        "type": "leads_to",
        "target": "AS003",
        "strength": 0.85
      },
      {
        "type": "leads_to",
        "target": "AS004",
        "strength": 0.8
      },
      {
        "type": "leads_to",
        "target": "AS005",
        "strength": 0.75
      }
    ],
    "organisms": [
      "Thiothrix",
      "Type 021N"
    ],
    "distractor_tags": [
      "high_FM",
      "old_sludge",
      "denitrification"
    ],
    "tags": [
      "DO",
      "aeration",
      "bulking",
      "nitrification"
    ]
  },
  {
    "id": "AS002",
    "category": "activated_sludge",
    "label": "Filamentous bulking",
    "indicators": [
      "high SVI",
      "sludge does not compact well",
      "poor clarifier settling"
    ],
    "causes": [
      "low dissolved oxygen",
      "nutrient deficiency",
      "septicity"
    ],
    "effects": [
      "solids carryover",
      "high effluent turbidity",
      "loss of clarifier performance"
    ],
    "corrections": [
      "increase dissolved oxygen",
      "correct nutrient deficiency",
      "improve process control"
    ],
    "relationships": [
      {
        "type": "results_in",
        "target": "AS003",
        "strength": 0.92
      },
      {
        "type": "results_in",
        "target": "AS004",
        "strength": 0.87
      }
    ],
    "organisms": [
      "filamentous bacteria"
    ],
    "distractor_tags": [
      "pin_floc",
      "rising_sludge",
      "old_sludge"
    ],
    "tags": [
      "bulking",
      "settling",
      "clarifier"
    ]
  },
  {
    "id": "AS003",
    "category": "activated_sludge",
    "label": "Poor settling",
    "indicators": [
      "cloudy secondary effluent",
      "solids carryover",
      "high sludge blanket"
    ],
    "causes": [
      "filamentous bulking",
      "young sludge",
      "pin floc"
    ],
    "effects": [
      "high effluent TSS",
      "clarifier washout risk"
    ],
    "corrections": [
      "identify sludge condition",
      "adjust wasting",
      "improve aeration if needed"
    ],
    "relationships": [
      {
        "type": "results_in",
        "target": "AS004",
        "strength": 0.95
      }
    ],
    "organisms": [],
    "distractor_tags": [
      "denitrification",
      "chlorine_demand"
    ],
    "tags": [
      "settling",
      "effluent",
      "clarifier"
    ]
  },
  {
    "id": "AS004",
    "category": "activated_sludge",
    "label": "High effluent TSS",
    "indicators": [
      "cloudy effluent",
      "poor solids separation",
      "elevated suspended solids results"
    ],
    "causes": [
      "poor settling",
      "clarifier overloading",
      "pin floc",
      "filamentous bulking"
    ],
    "effects": [
      "permit risk",
      "poor effluent quality"
    ],
    "corrections": [
      "correct settling problem",
      "check clarifier loading",
      "adjust sludge age if needed"
    ],
    "relationships": [],
    "organisms": [],
    "distractor_tags": [
      "low_alkalinity",
      "high_chlorine_residual"
    ],
    "tags": [
      "effluent",
      "TSS",
      "clarifier"
    ]
  },
  {
    "id": "AS005",
    "category": "activated_sludge",
    "label": "Loss of nitrification",
    "indicators": [
      "high effluent ammonia",
      "low nitrate production",
      "reduced ammonia removal"
    ],
    "causes": [
      "low dissolved oxygen",
      "low sludge age",
      "low alkalinity",
      "cold temperature"
    ],
    "effects": [
      "ammonia permit risk",
      "reduced biological performance"
    ],
    "corrections": [
      "increase dissolved oxygen",
      "increase sludge age",
      "restore alkalinity if needed"
    ],
    "relationships": [],
    "organisms": [
      "nitrifiers"
    ],
    "distractor_tags": [
      "high_RAS",
      "foaming",
      "pin_floc"
    ],
    "tags": [
      "nitrification",
      "ammonia",
      "process_control"
    ]
  }
]
