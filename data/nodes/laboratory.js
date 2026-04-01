export const LAB_NODES = [
  {
    "id": "LB001",
    "category": "laboratory",
    "label": "Grab sample",
    "indicators": [
      "single sample taken at one moment",
      "instantaneous condition check"
    ],
    "causes": [
      "need for immediate measurement",
      "short-term condition monitoring"
    ],
    "effects": [
      "represents only one point in time",
      "does not show variation over time"
    ],
    "corrections": [
      "use composite sampling when time-based representation is needed"
    ],
    "relationships": [
      {
        "type": "associated_with",
        "target": "LB002",
        "strength": 0.8
      }
    ],
    "tags": [
      "sampling",
      "grab_sample"
    ]
  },
  {
    "id": "LB002",
    "category": "laboratory",
    "label": "Composite sample",
    "indicators": [
      "multiple samples over time",
      "combined sample collection"
    ],
    "causes": [
      "need to represent changing conditions",
      "permit monitoring requirements"
    ],
    "effects": [
      "better average representation",
      "captures variation over time"
    ],
    "corrections": [
      "ensure proper timing or flow pacing"
    ],
    "relationships": [],
    "tags": [
      "sampling",
      "composite_sample"
    ]
  },
  {
    "id": "LB003",
    "category": "laboratory",
    "label": "BOD test",
    "indicators": [
      "5-day incubation test",
      "oxygen depletion measurement"
    ],
    "causes": [
      "measurement of biodegradable organic strength"
    ],
    "effects": [
      "indicates oxygen demand from biodegradable material",
      "supports treatment performance evaluation"
    ],
    "corrections": [
      "use proper dilution",
      "avoid air bubbles",
      "maintain incubation conditions"
    ],
    "relationships": [
      {
        "type": "leads_to",
        "target": "LB004",
        "strength": 0.7
      }
    ],
    "tags": [
      "BOD",
      "lab",
      "process_monitoring"
    ]
  },
  {
    "id": "LB004",
    "category": "laboratory",
    "label": "Uncalibrated instrument",
    "indicators": [
      "inconsistent readings",
      "results that do not match plant conditions"
    ],
    "causes": [
      "missed calibration",
      "poor maintenance"
    ],
    "effects": [
      "bad process decisions",
      "inaccurate lab data"
    ],
    "corrections": [
      "calibrate instrument",
      "verify standard solutions"
    ],
    "relationships": [],
    "tags": [
      "calibration",
      "instrument",
      "lab"
    ]
  }
]
