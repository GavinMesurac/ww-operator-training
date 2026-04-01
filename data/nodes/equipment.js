export const EQUIPMENT_NODES = [
  {
    "id": "EQ001",
    "category": "equipment",
    "label": "Pump cavitation",
    "indicators": [
      "unusual noise",
      "vibration",
      "pitted impeller damage"
    ],
    "causes": [
      "low suction pressure",
      "air leaks",
      "inadequate net positive suction head"
    ],
    "effects": [
      "reduced pump performance",
      "impeller damage",
      "equipment failure"
    ],
    "corrections": [
      "improve suction conditions",
      "check for air leaks",
      "verify pump operating conditions"
    ],
    "relationships": [],
    "tags": [
      "pump",
      "cavitation",
      "vibration"
    ]
  },
  {
    "id": "EQ002",
    "category": "equipment",
    "label": "Pump failure",
    "indicators": [
      "no flow",
      "wet well level rising",
      "motor not running"
    ],
    "causes": [
      "mechanical breakdown",
      "power loss",
      "control failure"
    ],
    "effects": [
      "loss of pumping",
      "overflow risk",
      "process interruption"
    ],
    "corrections": [
      "restore power if lost",
      "inspect motor and controls",
      "repair or replace failed parts"
    ],
    "relationships": [],
    "tags": [
      "pump",
      "failure",
      "lift_station"
    ]
  },
  {
    "id": "EQ003",
    "category": "equipment",
    "label": "Blower failure",
    "indicators": [
      "low air flow",
      "decreasing basin DO",
      "blower alarm"
    ],
    "causes": [
      "motor failure",
      "belt failure",
      "electrical problem"
    ],
    "effects": [
      "low dissolved oxygen",
      "poor aeration",
      "possible loss of nitrification"
    ],
    "corrections": [
      "restore blower operation",
      "check motor and belts",
      "verify air delivery"
    ],
    "relationships": [],
    "tags": [
      "blower",
      "aeration",
      "DO"
    ]
  },
  {
    "id": "EQ004",
    "category": "equipment",
    "label": "Motor overheating",
    "indicators": [
      "high motor temperature",
      "overload trip",
      "burning smell"
    ],
    "causes": [
      "overload",
      "poor ventilation",
      "mechanical resistance"
    ],
    "effects": [
      "equipment shutdown",
      "motor damage"
    ],
    "corrections": [
      "reduce load if possible",
      "check bearings and alignment",
      "improve ventilation"
    ],
    "relationships": [],
    "tags": [
      "motor",
      "overheating",
      "mechanical"
    ]
  }
]
