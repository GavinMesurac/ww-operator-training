export const SLUDGE_NODES = [
  {
    "id": "SD001",
    "category": "sludge_handling",
    "label": "Anaerobic digestion",
    "indicators": [
      "biogas production",
      "reduced volatile solids",
      "stabilized sludge"
    ],
    "causes": [
      "anaerobic microbial activity",
      "controlled digestion environment"
    ],
    "effects": [
      "sludge stabilization",
      "biogas generation",
      "reduced sludge volume"
    ],
    "corrections": [
      "maintain proper temperature",
      "maintain proper mixing"
    ],
    "relationships": [
      {
        "type": "causes",
        "target": "SD002",
        "strength": 0.9
      }
    ],
    "tags": [
      "digestion",
      "biogas",
      "stabilization"
    ]
  },
  {
    "id": "SD002",
    "category": "sludge_handling",
    "label": "Digester gas production",
    "indicators": [
      "methane gas production",
      "increased gas pressure"
    ],
    "causes": [
      "active anaerobic digestion",
      "organic matter breakdown"
    ],
    "effects": [
      "energy recovery potential",
      "gas storage requirements"
    ],
    "corrections": [
      "monitor gas system",
      "maintain digestion conditions"
    ],
    "relationships": [],
    "tags": [
      "methane",
      "biogas"
    ]
  },
  {
    "id": "SD003",
    "category": "sludge_handling",
    "label": "Sludge thickening",
    "indicators": [
      "increased solids concentration",
      "reduced sludge volume"
    ],
    "causes": [
      "gravity thickening",
      "mechanical thickening"
    ],
    "effects": [
      "reduced digestion volume",
      "improved sludge handling"
    ],
    "corrections": [
      "optimize thickener operation"
    ],
    "relationships": [],
    "tags": [
      "thickening",
      "solids"
    ]
  },
  {
    "id": "SD004",
    "category": "sludge_handling",
    "label": "Sludge dewatering",
    "indicators": [
      "reduced water content",
      "production of sludge cake"
    ],
    "causes": [
      "centrifuge operation",
      "belt press operation"
    ],
    "effects": [
      "reduced disposal volume"
    ],
    "corrections": [
      "optimize polymer dosing",
      "maintain equipment"
    ],
    "relationships": [],
    "tags": [
      "dewatering",
      "sludge_cake"
    ]
  }
]
