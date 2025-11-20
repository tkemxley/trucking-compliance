// Mock data for frontend-only testing
// This will be replaced with real backend API calls later

export const mockSubmitComplianceRequest = async (formData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate successful submission
  console.log('Mock form submission:', formData);
  
  return {
    success: true,
    message: 'Thank you! We will contact you shortly.',
    data: formData
  };
};

export const mockFAQData = [
  {
    id: 1,
    question: 'What is CARB and why do I need to comply?',
    answer: 'CARB (California Air Resources Board) regulates emissions from commercial vehicles in California. All trucks operating in California must register with CARB and meet emission standards to avoid penalties and operational restrictions.'
  },
  {
    id: 2,
    question: 'What is the Clean Truck Check program?',
    answer: 'Clean Truck Check is California\'s mandatory annual inspection program for heavy-duty trucks. It requires annual smoke opacity testing and reporting to ensure trucks meet emission standards.'
  },
  {
    id: 3,
    question: 'Do you help with Oregon trucking permits?',
    answer: 'Yes! We provide Oregon carrier registration services and Oregon temporary trip permits. Whether you need full registration or quick temporary permits for crossing Oregon, we handle all paperwork and submissions.'
  },
  {
    id: 4,
    question: 'What penalties can I face for non-compliance?',
    answer: 'Non-compliance can result in fines ranging from $1,000 to $10,000 per violation, vehicle registration holds, operational restrictions, and potential impoundment of non-compliant vehicles.'
  },
  {
    id: 5,
    question: 'How long does the compliance process take?',
    answer: 'California CARB: 2-3 weeks, Clean Truck Check: 1-2 weeks, Oregon registration: 1-2 weeks, Oregon temporary permits: 1-3 business days. We handle all documentation and follow up until approval.'
  },
  {
    id: 6,
    question: 'Do you provide ongoing support?',
    answer: 'Yes! We provide annual ongoing support to ensure your fleet stays compliant year after year. We track deadlines and remind you when renewals are due for both California and Oregon.'
  },
  {
    id: 7,
    question: 'What information do you need from me?',
    answer: 'We need your USDOT/MC number, vehicle VIN numbers, current registration documents, and basic company information. We\'ll guide you through the entire process.'
  },
  {
    id: 8,
    question: 'Can you help if I operate in both CA and OR?',
    answer: 'Absolutely! We specialize in multi-state compliance. We can handle all your California (CARB, Clean Truck Check) and Oregon (registration, temporary permits) requirements in one comprehensive package.'
  }
];

export const mockPricingData = [
  {
    id: 1,
    title: 'California CARB',
    price: 120,
    features: [
      'Initial CARB registration',
      'Document preparation',
      'VIN verification',
      'Submission & follow-up',
      'Approval confirmation'
    ],
    popular: false,
    category: 'california'
  },
  {
    id: 2,
    title: 'Clean Truck Check',
    price: 150,
    features: [
      'Annual CTC registration',
      'Smoke test coordination',
      'Report submission',
      'Compliance tracking',
      'Renewal reminders'
    ],
    popular: false,
    category: 'california'
  },
  {
    id: 3,
    title: 'Oregon Account Setup',
    price: 180,
    features: [
      'Open Oregon account',
      'Truck activation in system',
      'Complete documentation',
      'Online submission',
      'Setup support'
    ],
    popular: false,
    category: 'oregon'
  },
  {
    id: 4,
    title: 'Oregon Trip Permit',
    price: 85,
    features: [
      'Issued in 20 minutes',
      'Single or multiple trips',
      'Weekday service only',
      'Standard weight vehicles',
      'Instant confirmation'
    ],
    popular: false,
    category: 'oregon'
  },
  {
    id: 5,
    title: 'Mileage Report Filing',
    price: 120,
    features: [
      'Quarterly or monthly filing',
      'Oregon mileage reports',
      'Complete calculations',
      'Timely submissions',
      'Compliance tracking'
    ],
    popular: false,
    category: 'oregon'
  },
  {
    id: 6,
    title: 'CA + OR Full Package',
    price: 550,
    features: [
      'CARB + Clean Truck Check',
      'Oregon account setup',
      'Mileage report filing',
      'Priority processing',
      'Dedicated manager',
      'Annual support both states',
      'Save $120'
    ],
    popular: true,
    category: 'both'
  }
];
