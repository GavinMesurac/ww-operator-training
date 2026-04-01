export const DISINFECTION_NODES = [
  {
    "id": "DI001",
    "category": "disinfection",
    "label": "Low chlorine residual",
    "indicators": [
      "low chlorine residual test",
      "inadequate disinfection results",
      "high coliform counts"
    ],
    "causes": [
      "insufficient chlorine dose",
      "high chlorine demand",
      "equipment malfunction"
    ],
    "effects": [
      "poor pathogen removal",
      "permit violation risk"
    ],
    "corrections": [
      "increase chlorine dose",
      "verify dosing equipment",
      "monitor chlorine demand"
    ],
    "relationships": [
      {
        "type": "causes",
        "target": "DI002",
        "strength": 0.7
      },
      {
        "type": "leads_to",
        "target": "DI003",
        "strength": 0.6
      }
    ],
    "tags": [
      "chlorine",
      "residual",
      "disinfection"
    ]
  },
  {
    "id": "DI002",
    "category": "disinfection",
    "label": "High chlorine demand",
    "indicators": [
      "rapid chlorine consumption",
      "low residual despite adequate dose"
    ],
    "causes": [
      "high organic load",
      "high ammonia levels",
      "presence of reducing compounds"
    ],
    "effects": [
      "low chlorine residual",
      "reduced disinfection efficiency"
    ],
    "corrections": [
      "increase chlorine dose",
      "improve upstream treatment"
    ],
    "relationships": [],
    "tags": [
      "chlorine_demand",
      "disinfection"
    ]
  },
  {
    "id": "DI003",
    "category": "disinfection",
    "label": "Insufficient chlorine contact time",
    "indicators": [
      "low detention time",
      "short contact basin retention"
    ],
    "causes": [
      "high plant flow",
      "hydraulic short-circuiting"
    ],
    "effects": [
      "incomplete disinfection",
      "pathogen survival"
    ],
    "corrections": [
      "increase contact time",
      "reduce flow if possible"
    ],
    "relationships": [],
    "tags": [
      "contact_time",
      "CT",
      "disinfection"
    ]
  },
  {
    "id": "DI004",
    "category": "disinfection",
    "label": "Dechlorination failure",
    "indicators": [
      "chlorine residual detected in effluent",
      "failed residual compliance test"
    ],
    "causes": [
      "insufficient dechlorination chemical",
      "equipment malfunction"
    ],
    "effects": [
      "toxic discharge",
      "environmental impact"
    ],
    "corrections": [
      "increase dechlorination chemical",
      "verify feed equipment"
    ],
    "relationships": [],
    "tags": [
      "dechlorination",
      "effluent"
    ]
  }
]
