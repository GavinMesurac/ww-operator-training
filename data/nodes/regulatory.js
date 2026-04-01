export const REGULATORY_NODES = [
  {
    "id": "RG001",
    "category": "regulatory",
    "label": "NPDES permit",
    "indicators": [
      "discharge authorization",
      "effluent limitations",
      "monitoring requirements"
    ],
    "causes": [
      "regulated wastewater discharge to surface waters"
    ],
    "effects": [
      "defines plant compliance requirements",
      "establishes discharge limits"
    ],
    "corrections": [
      "operate within permit limits",
      "monitor and report as required"
    ],
    "relationships": [],
    "tags": [
      "NPDES",
      "permit",
      "compliance"
    ]
  },
  {
    "id": "RG002",
    "category": "regulatory",
    "label": "Permit violation",
    "indicators": [
      "effluent result exceeds permit limit",
      "monitoring result outside allowed range"
    ],
    "causes": [
      "poor process control",
      "equipment failure",
      "hydraulic overload"
    ],
    "effects": [
      "enforcement risk",
      "possible fines",
      "regulatory action"
    ],
    "corrections": [
      "correct the operating problem",
      "document the event",
      "report as required"
    ],
    "relationships": [
      {
        "type": "leads_to",
        "target": "RG003",
        "strength": 0.7
      }
    ],
    "tags": [
      "violation",
      "compliance",
      "limits"
    ]
  },
  {
    "id": "RG003",
    "category": "regulatory",
    "label": "Monitoring and reporting",
    "indicators": [
      "required sampling schedule",
      "documented analytical results",
      "submission of compliance reports"
    ],
    "causes": [
      "permit requirements",
      "regulatory oversight"
    ],
    "effects": [
      "demonstrates compliance status",
      "creates official plant record"
    ],
    "corrections": [
      "collect samples correctly",
      "submit reports on time",
      "maintain accurate records"
    ],
    "relationships": [],
    "tags": [
      "monitoring",
      "reporting",
      "records"
    ]
  },
  {
    "id": "RG004",
    "category": "regulatory",
    "label": "Sanitary sewer overflow reporting",
    "indicators": [
      "overflow event",
      "release from collection system",
      "public health concern"
    ],
    "causes": [
      "blockage",
      "lift station failure",
      "excess inflow"
    ],
    "effects": [
      "regulatory reporting requirement",
      "public health response",
      "environmental concern"
    ],
    "corrections": [
      "stop the overflow",
      "contain if possible",
      "notify and report as required"
    ],
    "relationships": [],
    "tags": [
      "SSO",
      "reporting",
      "collection_system"
    ]
  }
]
