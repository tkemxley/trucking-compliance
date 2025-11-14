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
    question: 'What penalties can I face for non-compliance?',
    answer: 'Non-compliance can result in fines ranging from $1,000 to $10,000 per violation, vehicle registration holds, operational restrictions, and potential impoundment of non-compliant vehicles.'
  },
  {
    id: 4,
    question: 'How long does the compliance process take?',
    answer: 'With our help, CARB registration typically takes 2-3 weeks, and Clean Truck Check registration takes 1-2 weeks. We handle all documentation and follow up until approval.'
  },
  {
    id: 5,
    question: 'Do you provide ongoing support?',
    answer: 'Yes! We provide annual ongoing support to ensure your fleet stays compliant year after year. We track deadlines and remind you when renewals are due.'
  },
  {
    id: 6,
    question: 'What information do you need from me?',
    answer: 'We need your USDOT/MC number, vehicle VIN numbers, current registration documents, and basic company information. We\'ll guide you through the entire process.'
  }
];

export const mockPricingData = [
  {
    id: 1,
    title: 'CARB Registration',
    price: 120,
    features: [
      'Initial CARB registration',
      'Document preparation',
      'VIN verification',
      'Submission & follow-up',
      'Approval confirmation'
    ],
    popular: false
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
    popular: false
  },
  {
    id: 3,
    title: 'Full Compliance Package',
    price: 250,
    features: [
      'CARB + Clean Truck Check',
      'Complete documentation',
      'Priority processing',
      'Annual ongoing support',
      'Dedicated compliance manager',
      'Save $20'
    ],
    popular: true
  }
];
