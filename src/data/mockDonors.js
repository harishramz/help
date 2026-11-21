export const mockDonors = [
  {
    id: 'DON-501',
    name: 'Arvind Subramanian',
    email: 'arvind.s@example.com',
    phone: '+91 98401 22334',
    city: 'Chennai',
    publicAck: true,
    verifiedDonor: true,
    joinedDate: '2025-11-10'
  },
  {
    id: 'DON-502',
    name: 'Priya Venkatesh',
    email: 'priya.v@example.com',
    phone: '+91 98422 77889',
    city: 'Coimbatore',
    publicAck: true,
    verifiedDonor: true,
    joinedDate: '2026-01-19'
  },
  {
    id: 'DON-503',
    name: 'Anonymous Well-Wisher',
    email: 'wellwisher@example.com',
    phone: '+91 94430 99881',
    city: 'Bengaluru',
    publicAck: false,
    verifiedDonor: true,
    joinedDate: '2026-04-05'
  },
  {
    id: 'DON-504',
    name: 'Senthil Kumar',
    email: 'senthil.k@example.com',
    phone: '+91 97900 44556',
    city: 'Madurai',
    publicAck: true,
    verifiedDonor: true,
    joinedDate: '2026-06-22'
  }
];

export const mockContributions = [
  {
    id: 'CON-801',
    donorId: 'DON-501',
    donorName: 'Arvind Subramanian',
    donorEmail: 'arvind.s@example.com',
    donorPhone: '+91 98401 22334',
    requestId: 'REQ-1001',
    requestTitle: 'Post-Cardiac Surgery Recovery & Medication Support',
    supportType: 'Medical Expenses',
    amount: 20000,
    message: 'Wishing Lakshmi a smooth and speedy recovery.',
    date: '2026-11-01',
    verificationStatus: 'Verified',
    publicAck: true
  },
  {
    id: 'CON-802',
    donorId: 'DON-502',
    donorName: 'Priya Venkatesh',
    donorEmail: 'priya.v@example.com',
    donorPhone: '+91 98422 77889',
    requestId: 'REQ-1001',
    requestTitle: 'Post-Cardiac Surgery Recovery & Medication Support',
    supportType: 'Medicines',
    amount: 11500,
    message: 'Happy to cover the pharmacy prescription.',
    date: '2026-11-06',
    verificationStatus: 'Verified',
    publicAck: true
  },
  {
    id: 'CON-803',
    donorId: 'DON-504',
    donorName: 'Senthil Kumar',
    donorEmail: 'senthil.k@example.com',
    donorPhone: '+91 97900 44556',
    requestId: 'REQ-1002',
    requestTitle: 'Annual School Fees, Uniforms & Study Materials for Two Siblings',
    supportType: 'Educational Support',
    amount: 18000,
    message: 'Education changes everything. Best wishes to Karthik and Divya!',
    date: '2026-11-08',
    verificationStatus: 'Verified',
    publicAck: true
  },
  {
    id: 'CON-804',
    donorId: 'DON-503',
    donorName: 'Anonymous Well-Wisher',
    donorEmail: 'wellwisher@example.com',
    donorPhone: '+91 94430 99881',
    requestId: 'REQ-1006',
    requestTitle: 'Pediatric Dialysis & Family Ration Support (Fulfilled)',
    supportType: 'Financial Assistance',
    amount: 40000,
    message: 'For the child’s full recovery.',
    date: '2026-09-12',
    verificationStatus: 'Completed',
    publicAck: false
  },
  {
    id: 'CON-805',
    donorId: 'DON-502',
    donorName: 'Priya Venkatesh',
    donorEmail: 'priya.v@example.com',
    donorPhone: '+91 98422 77889',
    requestId: 'REQ-1004',
    requestTitle: 'Roof Repair & Essential Household Kit After Monsoon Damage',
    supportType: 'Financial Assistance',
    amount: 14000,
    message: 'Pledged for roofing sheets — awaiting trust bank confirmation.',
    date: '2026-11-15',
    verificationStatus: 'Pending Verification',
    publicAck: true
  }
];
