export const COLLECTION_NODES = [
  {
    "id": "CS001",
    "category": "collection_systems",
    "label": "Infiltration",
    "indicators": [
      "groundwater entering the sewer",
      "increased flow during wet groundwater conditions"
    ],
    "causes": [
      "cracked pipes",
      "leaking joints",
      "damaged manholes"
    ],
    "effects": [
      "increased hydraulic loading",
      "higher pumping costs",
      "plant flow increases"
    ],
    "corrections": [
      "repair leaks",
      "seal joints",
      "rehabilitate damaged sewers"
    ],
    "relationships": [
      {
        "type": "leads_to",
        "target": "CS002",
        "strength": 0.6
      }
    ],
    "tags": [
      "infiltration",
      "groundwater",
      "hydraulics"
    ]
  },
  {
    "id": "CS002",
    "category": "collection_systems",
    "label": "Inflow",
    "indicators": [
      "flow spikes during rain events",
      "rapid storm-related sewer flow increase"
    ],
    "causes": [
      "roof drains",
      "yard drains",
      "illegal stormwater connections"
    ],
    "effects": [
      "plant hydraulic overload",
      "lift station overload",
      "reduced treatment efficiency"
    ],
    "corrections": [
      "eliminate stormwater connections",
      "repair inflow entry points",
      "inspect manholes and covers"
    ],
    "relationships": [],
    "tags": [
      "inflow",
      "stormwater",
      "hydraulics"
    ]
  },
  {
    "id": "CS003",
    "category": "collection_systems",
    "label": "Grease blockage",
    "indicators": [
      "reduced sewer capacity",
      "slow sewer flow",
      "backup complaints"
    ],
    "causes": [
      "grease accumulation",
      "poor housekeeping at grease sources"
    ],
    "effects": [
      "sewer blockage",
      "overflow risk",
      "maintenance problems"
    ],
    "corrections": [
      "clean sewer line",
      "control grease sources",
      "increase preventive maintenance"
    ],
    "relationships": [],
    "tags": [
      "grease",
      "blockage",
      "maintenance"
    ]
  },
  {
    "id": "CS004",
    "category": "collection_systems",
    "label": "Lift station failure",
    "indicators": [
      "wet well level rising",
      "pump not cycling",
      "high-level alarm"
    ],
    "causes": [
      "power failure",
      "pump failure",
      "control failure"
    ],
    "effects": [
      "overflow risk",
      "upstream backup",
      "sewage release"
    ],
    "corrections": [
      "restore pumping",
      "check power supply",
      "inspect controls and pumps"
    ],
    "relationships": [],
    "tags": [
      "lift_station",
      "pumps",
      "overflow"
    ]
  }
]
