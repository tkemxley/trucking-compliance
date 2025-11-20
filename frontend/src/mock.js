// Mock data for GT IRP Service Inc

export const mockSubmitComplianceRequest = async (formData) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Mock form submission:', formData);
  return {
    success: true,
    message: 'Thank you! We will contact you shortly.',
    data: formData
  };
};

// Service Categories for Dropdown
export const serviceOptions = [
  { value: 'ctc', label: 'California Clean Truck Check (CTC)' },
  { value: 'carb', label: 'California CARB' },
  { value: 'oregon_permit', label: 'Oregon Permit' },
  { value: 'oregon_miles', label: 'Oregon Mileage Reporting' },
  { value: 'full_package', label: 'Full West Coast Package' },
  { value: 'not_sure', label: 'Not Sure - Need Help' }
];

// FAQ Data
export const mockFAQData = [
  {
    id: 1,
    question: 'What is the difference between CARB and Clean Truck Check?',
    answer: 'CARB (California Air Resources Board) is the emission registration system for all trucks operating in California. Clean Truck Check (CTC) is the annual smoke opacity testing program. Both are required and separate - you need CARB registration first, then annual CTC compliance.'
  },
  {
    id: 2,
    question: 'How fast can you issue an Oregon permit?',
    answer: 'Oregon trip permits are issued in just 20 minutes during weekdays. We handle standard weight vehicles for single or multiple trips. Note: No weekend service, and we don\'t handle overweight/oversize permits.'
  },
  {
    id: 3,
    question: 'What are Oregon Weight-Mile reports?',
    answer: 'Oregon requires quarterly or monthly mileage reporting for commercial vehicles. We file these reports on your behalf, handle all calculations, and ensure timely submissions to avoid penalties and account suspension.'
  },
  {
    id: 4,
    question: 'Do I need both CARB and CTC?',
    answer: 'Yes. If you operate trucks 14,000+ lbs in California, you need both. CARB is your one-time registration (with updates), and CTC is your annual smoke test compliance. Missing either results in penalties and registration holds.'
  },
  {
    id: 5,
    question: 'What happens if I operate in California without CARB?',
    answer: 'CARB violations range from $1,000 to $10,000 per vehicle. Your registration can be held, preventing renewal. During roadside inspections, non-compliant vehicles can be impounded. It\'s not worth the risk.'
  },
  {
    id: 6,
    question: 'Can you help if my Oregon account is suspended?',
    answer: 'Yes! We provide Oregon account reinstatement services. We\'ll help file missing reports, resolve penalties, and get your account back in good standing so you can operate legally in Oregon again.'
  },
  {
    id: 7,
    question: 'What\'s included in the Full West Coast Package?',
    answer: 'Our Full West Coast Package includes everything: California CARB registration, California Clean Truck Check compliance, Oregon account setup, mileage reporting, and trip permits. One comprehensive solution for operating across CA and OR.'
  },
  {
    id: 8,
    question: 'How long does CARB registration take?',
    answer: 'Initial CARB registration typically takes 2-3 weeks once we have all your documentation. We handle the entire process including VIN verification, document preparation, submission, and follow-up until approval.'
  }
];

// Pricing Data - Restructured
export const pricingCategories = {
  california_ctc: {
    title: 'California Clean Truck Check (CTC)',
    color: 'blue',
    services: [
      {
        id: 'ctc_account',
        name: 'CTC Account Setup',
        price: 150,
        features: ['Account creation', 'VIN enrollment', 'Initial registration', 'System setup']
      },
      {
        id: 'ctc_annual',
        name: 'Annual CTC Reporting',
        price: 150,
        features: ['Annual smoke test coordination', 'Report submission', 'Compliance tracking', 'Deadline reminders']
      },
      {
        id: 'ctc_fleet',
        name: 'Fleet Management (Optional)',
        price: 'Custom',
        features: ['Multiple vehicle tracking', 'Centralized reporting', 'Fleet-wide compliance', 'Priority support']
      }
    ]
  },
  california_carb: {
    title: 'California CARB',
    color: 'blue',
    services: [
      {
        id: 'carb_reg',
        name: 'CARB Registration',
        price: 120,
        features: ['Initial registration', 'VIN verification', 'Document preparation', 'Submission & follow-up']
      },
      {
        id: 'carb_trucrs',
        name: 'TRUCRS Updates',
        price: 95,
        features: ['System updates', 'Vehicle changes', 'Ownership transfers', 'Status corrections']
      },
      {
        id: 'carb_compliance',
        name: 'Compliance Check',
        price: 75,
        features: ['Status verification', 'Violation review', 'Compliance audit', 'Recommendations']
      },
      {
        id: 'carb_corrective',
        name: 'Corrective Action Services',
        price: 150,
        features: ['Violation resolution', 'Appeal assistance', 'Documentation fixes', 'Compliance restoration']
      }
    ]
  },
  oregon: {
    title: 'Oregon Services',
    color: 'green',
    services: [
      {
        id: 'or_account',
        name: 'Weight-Mile Account Setup',
        price: 180,
        features: ['Account opening', 'Truck activation', 'System registration', 'Initial configuration']
      },
      {
        id: 'or_permit',
        name: 'Permit Issuing',
        price: 85,
        features: ['20-minute processing', 'Single/multiple trips', 'Weekday service', 'Standard weight only']
      },
      {
        id: 'or_miles',
        name: 'Mileage Reporting',
        price: 120,
        features: ['Quarterly or monthly filing', 'Complete calculations', 'Timely submissions', 'Compliance tracking']
      },
      {
        id: 'or_reinstate',
        name: 'Account Reinstatement',
        price: 250,
        features: ['Suspended account recovery', 'Missing reports filed', 'Penalty resolution', 'Account restoration']
      },
      {
        id: 'or_bond',
        name: 'Bond Assistance',
        price: 150,
        features: ['Bond application help', 'Documentation support', 'Carrier services', 'Compliance guidance']
      }
    ]
  },
  packages: {
    title: 'Bonus Packages',
    color: 'gold',
    services: [
      {
        id: 'pkg_ctc_carb',
        name: 'CTC + CARB Package',
        price: 420,
        popular: true,
        features: ['Complete CA compliance', 'CARB registration', 'CTC annual reporting', 'Priority processing', 'Save $150'],
        savings: 150
      },
      {
        id: 'pkg_west_coast',
        name: 'Full West Coast Package',
        price: 750,
        popular: true,
        features: ['CA: CARB + CTC', 'OR: Account + Permits + Mileage', 'Complete CA & OR coverage', 'Dedicated manager', 'Annual support', 'Save $305'],
        savings: 305
      }
    ]
  }
};
