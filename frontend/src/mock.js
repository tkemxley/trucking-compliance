// Mock data for GT IRP Service Inc - Government Style

// Service Categories for Dropdown
export const serviceOptions = [
  { value: 'ctc_registration', label: 'CTC Registration + Adding Truck ($75)' },
  { value: 'ctc_certificate', label: 'Issuance of CTC Certificate ($25)' },
  { value: 'ctc_package', label: 'CTC Full Package ($100)' },
  { value: 'carb_registration', label: 'CARB Registration ($130)' },
  { value: 'carb_add_truck', label: 'Adding Truck to CARB ($70)' },
  { value: 'carb_package', label: 'Full CARB Package ($180)' },
  { value: 'ca_full_compliance', label: 'Full CA Compliance Package ($250)' },
  { value: 'oregon_account', label: 'Oregon Permit Account Registration ($60)' },
  { value: 'oregon_permit', label: 'Issuance of Oregon Permits ($40)' },
  { value: 'oregon_one_trip', label: 'One Trip Oregon Permit ($50)' },
  { value: 'oregon_miles', label: 'Oregon Miles Filing ($50/filing)' },
  { value: 'oregon_complete', label: 'Oregon Complete Package + Bond ($200)' },
  { value: 'not_sure', label: 'Not Sure - Need Consultation' }
];

// FAQ Data
export const mockFAQData = [
  {
    id: 1,
    question: 'What is the difference between CARB and Clean Truck Check?',
    answer: 'CARB is the California Air Resources Board registration system for emission compliance. Clean Truck Check (CTC) is the annual smoke opacity testing and certification program. Both are mandatory and separate requirements for trucks operating in California.'
  },
  {
    id: 2,
    question: 'What documents do I need to upload for service?',
    answer: 'Typically you\'ll need: Vehicle registration, VIN documentation, USDOT/MC authority documents, proof of insurance, and any existing CARB or CTC certificates. Our team will guide you on specific requirements after your initial submission.'
  },
  {
    id: 3,
    question: 'How long does processing take?',
    answer: 'CTC Registration: 1-2 weeks, CARB Registration: 2-3 weeks, Oregon Account Setup: 1-2 weeks, Oregon Trip Permits: 20 minutes (weekdays), Mileage Filing: processed by deadline.'
  },
  {
    id: 4,
    question: 'What are California compliance penalties?',
    answer: 'CARB violations: $1,000-$10,000 per vehicle. CTC non-compliance: Registration holds, operational restrictions, roadside citations. Both can result in vehicle impoundment and business interruption.'
  },
  {
    id: 5,
    question: 'What are Oregon compliance penalties?',
    answer: 'Operating without permit: $440 fixed penalty. Late or missing mileage reports: penalties and account suspension. Repeat violations can lead to increased scrutiny and operational restrictions.'
  },
  {
    id: 6,
    question: 'Do you provide bond assistance for Oregon?',
    answer: 'Yes, our Oregon Complete Package includes bond assistance. We help with carrier bond applications, documentation requirements, and ensure your Oregon account is fully compliant and operational.'
  },
  {
    id: 7,
    question: 'Can I add multiple trucks to my account?',
    answer: 'Yes. For CTC it\'s $75 per registration. For CARB it\'s $70 per additional truck. We offer fleet management services for companies with multiple vehicles - contact us for volume pricing.'
  },
  {
    id: 8,
    question: 'What is included in the Full CA Compliance Package?',
    answer: 'The $250 package includes complete CTC registration and certification PLUS full CARB registration. You save $30 compared to purchasing services separately. This covers all California requirements.'
  }
];

// Pricing Structure
export const pricingData = {
  california_ctc: {
    title: 'California - Clean Truck Check (CTC)',
    badge: 'CALIFORNIA',
    color: 'blue',
    icon: '🔵',
    services: [
      {
        id: 'ctc_reg',
        name: 'CTC Registration + Adding Truck',
        price: 75,
        description: 'Account setup and vehicle enrollment'
      },
      {
        id: 'ctc_cert',
        name: 'Issuance of CTC Certificate',
        price: 25,
        description: 'Annual smoke test certificate'
      },
      {
        id: 'ctc_full',
        name: 'CTC Full Package',
        price: 100,
        description: 'Registration + Certification included',
        badge: 'BEST VALUE'
      }
    ]
  },
  california_carb: {
    title: 'California - CARB',
    badge: 'CALIFORNIA',
    color: 'blue',
    icon: '🔵',
    services: [
      {
        id: 'carb_reg',
        name: 'CARB Registration',
        price: 130,
        description: 'Initial CARB system registration'
      },
      {
        id: 'carb_add',
        name: 'Adding Truck to CARB System',
        price: 70,
        description: 'Per additional vehicle'
      },
      {
        id: 'carb_full',
        name: 'Full CARB Package',
        price: 180,
        description: 'All included - Save $20',
        badge: 'SAVE $20'
      }
    ]
  },
  california_bonus: {
    title: 'Bonus Packages (California Only)',
    badge: 'CALIFORNIA',
    color: 'orange',
    icon: '⭐',
    services: [
      {
        id: 'ca_compliance',
        name: 'Full Compliance Package',
        price: 250,
        description: 'CTC + CARB Complete - Save $30',
        badge: 'MOST POPULAR',
        savings: 30
      }
    ]
  },
  oregon: {
    title: 'Oregon Services',
    badge: 'OREGON',
    color: 'green',
    icon: '🟢',
    services: [
      {
        id: 'or_account',
        name: 'Oregon Permit Account Registration',
        price: 60,
        description: 'Account setup and activation'
      },
      {
        id: 'or_permits',
        name: 'Issuance of Oregon Permits',
        price: 40,
        description: 'Standard trip permits'
      },
      {
        id: 'or_one_trip',
        name: 'One Trip Oregon Permit',
        price: 50,
        description: 'Single trip authorization'
      },
      {
        id: 'or_miles',
        name: 'Oregon Miles Filing',
        price: 50,
        description: 'Per filing (monthly or quarterly)'
      },
      {
        id: 'or_complete',
        name: 'Oregon Complete Package + Bond',
        price: 200,
        description: 'Full service including bond assistance',
        badge: 'COMPLETE'
      }
    ]
  }
};
