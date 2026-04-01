export const SAFETY_NODES = [
  {
    "id": "SF001",
    "category": "safety",
    "label": "Personal protective equipment",
    "indicators": [
      "gloves",
      "goggles",
      "face shields",
      "respirators"
    ],
    "causes": [
      "worker exposure risk",
      "chemical or physical hazards"
    ],
    "effects": [
      "reduced injury risk",
      "improved operator protection"
    ],
    "corrections": [
      "wear the correct PPE for the task",
      "inspect PPE before use"
    ],
    "relationships": [],
    "tags": [
      "PPE",
      "operator_protection",
      "safety"
    ]
  },
  {
    "id": "SF002",
    "category": "safety",
    "label": "Confined space entry",
    "indicators": [
      "limited entry and exit",
      "poor natural ventilation",
      "potential hazardous atmosphere"
    ],
    "causes": [
      "tank entry",
      "manhole entry",
      "vault entry"
    ],
    "effects": [
      "asphyxiation risk",
      "toxic gas exposure",
      "rescue complications"
    ],
    "corrections": [
      "follow confined space procedures",
      "test atmosphere before entry",
      "use proper permits and attendants"
    ],
    "relationships": [
      {
        "type": "leads_to",
        "target": "SF003",
        "strength": 0.7
      }
    ],
    "tags": [
      "confined_space",
      "entry",
      "atmosphere"
    ]
  },
  {
    "id": "SF003",
    "category": "safety",
    "label": "Hydrogen sulfide gas",
    "indicators": [
      "rotten egg odor at low concentration",
      "gas hazard in sewers and wet wells"
    ],
    "causes": [
      "septic wastewater",
      "anaerobic decomposition"
    ],
    "effects": [
      "toxic exposure",
      "respiratory danger",
      "confined space hazard"
    ],
    "corrections": [
      "test atmosphere before entry",
      "ventilate area",
      "use respiratory protection when required"
    ],
    "relationships": [],
    "tags": [
      "H2S",
      "gas_hazard",
      "confined_space"
    ]
  },
  {
    "id": "SF004",
    "category": "safety",
    "label": "Lockout/tagout",
    "indicators": [
      "equipment isolated from power",
      "lock and tag applied"
    ],
    "causes": [
      "maintenance activity",
      "equipment servicing"
    ],
    "effects": [
      "prevents accidental startup",
      "protects maintenance personnel"
    ],
    "corrections": [
      "de-energize equipment",
      "apply lockout/tagout before maintenance"
    ],
    "relationships": [],
    "tags": [
      "LOTO",
      "maintenance",
      "electrical_safety"
    ]
  }
]
