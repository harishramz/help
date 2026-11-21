export const REQUEST_CATEGORIES = [
  'Medical Assistance',
  'Poor Families',
  "Children's Education",
  'Food Assistance',
  'Emergency Support',
  'Disability Assistance',
  'Elderly People',
  'Other Assistance'
];

export const REQUEST_STATUSES = [
  'Pending Verification',
  'Under Review',
  'Verified',
  'Published',
  'Assistance in Progress',
  'Partially Fulfilled',
  'Completed',
  'Rejected'
];

export const SUPPORT_TYPES = [
  'Financial Assistance',
  'Medical Expenses',
  'Food and Groceries',
  'Educational Support',
  'Clothing',
  'Medicines',
  'Other Essential Needs'
];

export const mockRequests = [
  {
    id: 'REQ-1001',
    personId: 'PER-201',
    displayName: 'Lakshmi Narayanan',
    fullName: 'Lakshmi Narayanan',
    age: 54,
    consentGiven: true,
    avatarInitials: 'LN',
    avatarColor: '#0284c7',
    category: 'Medical Assistance',
    filterGroup: 'Medical',
    title: 'Post-Cardiac Surgery Recovery & Medication Support',
    shortDescription:
      'Retired textile worker needing follow-up cardiac medication and three months of post-operative rehabilitation.',
    story:
      'Lakshmi worked in a small weaving unit for 24 years until a sudden cardiac event required emergency angioplasty. While the initial procedure was covered through state insurance, her family cannot afford the three-month post-operative medications and diagnostic follow-ups.',
    currentSituation:
      'Currently recovering at home with her daughter, who works part-time at a local tailoring shop.',
    whyNeeded:
      'Daily cardiac and blood-thinning medications plus monthly echocardiogram checks are essential to prevent complications.',
    helpRequired: 'Financial support for 3 months of medicines and lab tests, or direct pharmacy sponsorship.',
    location: 'Coimbatore, Tamil Nadu',
    privateAddress: '14/2 Weaver Colony, Ondipudur, Coimbatore',
    privatePhone: '+91 98422 00112',
    requiredAmount: 45000,
    amountReceived: 31500,
    materialRequirements: '3-month cardiac prescription & monthly ECG checkups',
    urgency: 'Critical',
    isUrgent: true,
    isPublished: true,
    status: 'Partially Fulfilled',
    verifiedBy: 'Trust Verification Panel (Dr. S. Raghavan)',
    verifiedDate: '2026-10-28',
    publishedDate: '2026-10-29',
    supportingDocsConsent: true,
    supportingDocs: [
      { label: 'Hospital Discharge Summary (Redacted)', verified: true },
      { label: 'Cardiology Prescription Estimate', verified: true }
    ],
    updates: [
      { date: '2026-11-12', note: 'First month of medicines delivered directly via Trust partner pharmacy.' },
      { date: '2026-10-29', note: 'Case verified by Trust medical advisor and published for support.' }
    ]
  },
  {
    id: 'REQ-1002',
    personId: 'PER-202',
    displayName: 'Karthik & Siblings',
    fullName: 'Karthik Rajan',
    age: 13,
    consentGiven: true,
    avatarInitials: 'KR',
    avatarColor: '#059669',
    category: "Children's Education",
    filterGroup: 'Education',
    title: 'Annual School Fees, Uniforms & Study Materials for Two Siblings',
    shortDescription:
      'Two school-going siblings lost their primary breadwinner and need tuition, books, and bus pass support for the academic year.',
    story:
      'Karthik (Class 8) and his sister Divya (Class 5) are bright students who love science and drawing. Following the unexpected loss of their father earlier this year, their mother is struggling to manage household rent and school expenses.',
    currentSituation:
      'Mother works as a domestic helper; children are at risk of dropping out mid-term without fee assistance.',
    whyNeeded:
      'Ensuring uninterrupted schooling, textbooks, and safe daily transport for both children.',
    helpRequired: 'School fee sponsorship, notebooks, uniforms, and two school bags.',
    location: 'Madurai, Tamil Nadu',
    privateAddress: '8B Thirunagar, Madurai',
    privatePhone: '+91 94431 00224',
    requiredAmount: 28000,
    amountReceived: 18000,
    materialRequirements: '2 sets of school uniforms, textbooks, and annual bus pass',
    urgency: 'High',
    isUrgent: true,
    isPublished: true,
    status: 'Assistance in Progress',
    verifiedBy: 'Education Welfare Committee',
    verifiedDate: '2026-11-02',
    publishedDate: '2026-11-03',
    supportingDocsConsent: true,
    supportingDocs: [
      { label: 'School Fee Structure Memo (Redacted)', verified: true },
      { label: 'Bonafide Student Certificates', verified: true }
    ],
    updates: [
      { date: '2026-11-10', note: 'Term 1 tuition fees settled directly with school office.' },
      { date: '2026-11-03', note: 'Verified and published for community support.' }
    ]
  },
  {
    id: 'REQ-1003',
    personId: 'PER-203',
    displayName: 'Meenakshi Ammal',
    fullName: 'Meenakshi Sundaram',
    age: 71,
    consentGiven: true,
    avatarInitials: 'MA',
    avatarColor: '#0d9488',
    category: 'Elderly People',
    filterGroup: 'Food',
    title: 'Monthly Nutrition Kit & Mobility Walker for Elderly Resident',
    shortDescription:
      'Senior citizen living alone needs monthly grocery rations, blood-pressure medicines, and a foldable walking frame.',
    story:
      'Meenakshi Ammal lives in a small rented room and has limited mobility due to severe knee arthritis. Neighbors help her with water and errands, but she needs consistent dry rations and a safe walker.',
    currentSituation:
      'Relies on a modest old-age pension that barely covers rent and electricity.',
    whyNeeded:
      'Balanced monthly groceries and a sturdy aluminum walker will help her move safely indoors.',
    helpRequired: 'Food and groceries kit for 6 months plus 1 foldable medical walker.',
    location: 'Erode, Tamil Nadu',
    privateAddress: '22 Periyar Street, Erode',
    privatePhone: '+91 97890 00335',
    requiredAmount: 18000,
    amountReceived: 12000,
    materialRequirements: 'Monthly rice/lentils/oil ration kit + 1 foldable walker',
    urgency: 'High',
    isUrgent: true,
    isPublished: true,
    status: 'Partially Fulfilled',
    verifiedBy: 'Senior Care Field Coordinator',
    verifiedDate: '2026-11-05',
    publishedDate: '2026-11-06',
    supportingDocsConsent: true,
    supportingDocs: [
      { label: 'Field Visit Verification Note', verified: true }
    ],
    updates: [
      { date: '2026-11-11', note: 'November grocery kit and medical walker delivered.' }
    ]
  },
  {
    id: 'REQ-1004',
    personId: 'PER-204',
    displayName: 'Selvam Family',
    fullName: 'Selvam Murugan',
    age: 41,
    consentGiven: true,
    avatarInitials: 'SF',
    avatarColor: '#0369a1',
    category: 'Emergency Support',
    filterGroup: 'Emergency',
    title: 'Roof Repair & Essential Household Kit After Monsoon Damage',
    shortDescription:
      'Daily-wage family of four whose asbestos-sheet roof was damaged during heavy rains needs urgent shelter repair.',
    story:
      'Recent heavy rains and gusty winds damaged the roof of Selvam’s two-room home, soaking bedding and school books. With temporary tarpaulins in place, they need durable roofing sheets before the next rain spell.',
    currentSituation:
      'Family of four currently sharing one dry corner of a neighbor’s veranda at night.',
    whyNeeded:
      'Safe, dry shelter for two young children and protection from waterborne illness.',
    helpRequired: 'Roofing sheets, installation labor support, and dry bedding.',
    location: 'Tiruppur, Tamil Nadu',
    privateAddress: '5/19 Velampalayam, Tiruppur',
    privatePhone: '+91 98650 00446',
    requiredAmount: 35000,
    amountReceived: 14000,
    materialRequirements: 'Corrugated roofing sheets, 4 mattresses, solar lantern',
    urgency: 'Critical',
    isUrgent: true,
    isPublished: true,
    status: 'Published',
    verifiedBy: 'Emergency Relief Team',
    verifiedDate: '2026-11-11',
    publishedDate: '2026-11-12',
    supportingDocsConsent: true,
    supportingDocs: [
      { label: 'Local Ward Assessment Report', verified: true }
    ],
    updates: [
      { date: '2026-11-12', note: 'Emergency tarpaulin provided; permanent roof repair funding open.' }
    ]
  },
  {
    id: 'REQ-1005',
    personId: 'PER-205',
    displayName: 'Anitha K.',
    fullName: 'Anitha Krishnan',
    age: 29,
    consentGiven: true,
    avatarInitials: 'AK',
    avatarColor: '#0284c7',
    category: 'Disability Assistance',
    filterGroup: 'Family Support',
    title: 'Motorized Tailoring Machine for Self-Employment',
    shortDescription:
      'Differently-abled single mother seeking a foot-free motorized sewing machine to earn a steady livelihood from home.',
    story:
      'Anitha completed a 6-month tailoring certification with honors despite lower-limb mobility challenges. A motorized tabletop sewing machine will allow her to take blouse and uniform stitching orders from home.',
    currentSituation:
      'Living with her 6-year-old son; currently borrows a neighbor’s manual machine for a few hours a week.',
    whyNeeded:
      'Financial independence and sustainable monthly income without physically straining her legs.',
    helpRequired: '1 motorized sewing machine, worktable, and starter fabric/thread kit.',
    location: 'Salem, Tamil Nadu',
    privateAddress: '11 Fairlands Road, Salem',
    privatePhone: '+91 99440 00557',
    requiredAmount: 22000,
    amountReceived: 9500,
    materialRequirements: 'Motorized tabletop sewing machine + starter tailoring kit',
    urgency: 'Medium',
    isUrgent: false,
    isPublished: true,
    status: 'Verified',
    verifiedBy: 'Livelihood Support Desk',
    verifiedDate: '2026-11-08',
    publishedDate: '2026-11-09',
    supportingDocsConsent: true,
    supportingDocs: [
      { label: 'Tailoring Training Certificate', verified: true },
      { label: 'Vendor Equipment Quotation', verified: true }
    ],
    updates: [
      { date: '2026-11-09', note: 'Equipment quote verified with local authorized dealer.' }
    ]
  },
  {
    id: 'REQ-1006',
    personId: 'PER-206',
    displayName: 'Arunachalam Family',
    fullName: 'Arunachalam S.',
    age: 46,
    consentGiven: true,
    avatarInitials: 'AF',
    avatarColor: '#059669',
    category: 'Poor Families',
    filterGroup: 'Family Support',
    title: 'Pediatric Dialysis & Family Ration Support (Fulfilled)',
    shortDescription:
      'Family supported with 4 months of pediatric renal care travel, medicines, and monthly grocery hampers.',
    story:
      'Arunachalam’s 9-year-old son required regular hospital visits for renal care. Through TrustConnect supporters, the family received full medicine coverage and grocery kits until his condition stabilized.',
    currentSituation:
      'Child is now stable on maintenance diet and attending school regularly.',
    whyNeeded:
      'Completed support covering 4 months of medical travel, nutrition, and prescriptions.',
    helpRequired: 'Completed — thank you to all 14 verified contributors.',
    location: 'Coimbatore, Tamil Nadu',
    privateAddress: '33 Peelamedu, Coimbatore',
    privatePhone: '+91 98430 00668',
    requiredAmount: 40000,
    amountReceived: 40000,
    materialRequirements: 'Pediatric renal nutrition & 4-month medicine support',
    urgency: 'Normal',
    isUrgent: false,
    isPublished: true,
    status: 'Completed',
    verifiedBy: 'Trust Medical Board',
    verifiedDate: '2026-08-14',
    publishedDate: '2026-08-15',
    completedDate: '2026-10-18',
    thankYouMessage:
      'Thanks to the kindness of our supporters, our son received timely treatment and our family never felt alone during those difficult months.',
    supportingDocsConsent: true,
    supportingDocs: [
      { label: 'Completion & Receipt Audit Summary', verified: true }
    ],
    updates: [
      { date: '2026-10-18', note: 'Full assistance delivered and verified. Case marked Completed.' }
    ]
  }
];

export const mockDirectRequests = [
  {
    id: 'DIR-301',
    fullName: 'Ramesh Babu',
    age: 38,
    phone: '+91 98940 11223',
    email: 'ramesh.b@example.com',
    address: '19 Anna Nagar, Pollachi',
    district: 'Coimbatore',
    category: 'Medical Assistance',
    situation: 'Recovering from a road accident leg fracture and unable to resume carpentry work for 8 weeks.',
    whyNeeded: 'Need physiotherapy sessions and basic family groceries during recovery.',
    helpType: 'Medical Expenses & Food',
    requiredAmount: 24000,
    familyMembers: 4,
    documents: ['Accident_Discharge_Note.pdf', 'Physio_Estimate.pdf'],
    consentGiven: true,
    submittedDate: '2026-11-14',
    status: 'Pending Verification'
  },
  {
    id: 'DIR-302',
    fullName: 'Vasanthi Devi',
    age: 64,
    phone: '+91 94420 55667',
    email: 'vasanthi.d@example.com',
    address: '44 Gandhi Road, Karur',
    district: 'Karur',
    category: 'Food Assistance',
    situation: 'Elderly couple without steady income; husband has vision impairment.',
    whyNeeded: 'Monthly dry rations and cataract surgery screening.',
    helpType: 'Food and Groceries',
    requiredAmount: 15000,
    familyMembers: 2,
    documents: ['Ration_Card_Copy.pdf'],
    consentGiven: true,
    submittedDate: '2026-11-15',
    status: 'Under Review'
  }
];
