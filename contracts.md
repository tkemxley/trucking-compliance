# GT IRP Service Landing Page - API Contracts

## Overview
This document outlines the API contracts and integration plan for the GT IRP Service California compliance landing page.

## Current State (Mock Data)
- **Frontend**: `/app/frontend/src/pages/Landing.jsx` - Fully functional with mock data
- **Mock File**: `/app/frontend/src/mock.js` - Contains mock functions and data
- **Mock Functions**:
  - `mockSubmitComplianceRequest(formData)` - Simulates form submission
  - `mockFAQData` - Static FAQ data
  - `mockPricingData` - Static pricing data

## Backend Implementation Plan

### 1. MongoDB Models

#### ComplianceRequest Model
```python
{
  "_id": ObjectId,
  "companyName": str (required),
  "contactPerson": str (required),
  "phone": str (required),
  "email": str (required),
  "usdotMc": str (optional),
  "message": str (optional),
  "submittedAt": datetime (auto-generated),
  "status": str (default: "new") # new, contacted, completed
}
```

### 2. API Endpoints

#### POST /api/compliance-request
**Purpose**: Submit compliance help request and send email notification

**Request Body**:
```json
{
  "companyName": "Test Trucking Co",
  "contactPerson": "John Doe",
  "phone": "+1 555-123-4567",
  "email": "john@testtrucking.com",
  "usdotMc": "USDOT123456",
  "message": "Need help with CARB compliance"
}
```

**Response (Success - 200)**:
```json
{
  "success": true,
  "message": "Thank you! We will contact you shortly.",
  "requestId": "507f1f77bcf86cd799439011"
}
```

**Response (Error - 400)**:
```json
{
  "success": false,
  "message": "Validation error message"
}
```

**Response (Error - 500)**:
```json
{
  "success": false,
  "message": "Server error. Please try again."
}
```

### 3. Email Notification System

**Trigger**: When form is submitted via POST /api/compliance-request

**Email Details**:
- **To**: globaltransportservicesinc@gmail.com
- **Subject**: "New Compliance Request from [Company Name]"
- **Body**: HTML formatted email with all form details

**Email Content**:
```
New Compliance Request

Company: [companyName]
Contact: [contactPerson]
Phone: [phone]
Email: [email]
USDOT/MC: [usdotMc]
Message: [message]

Submitted: [timestamp]
```

### 4. Frontend Integration

#### Changes to `/app/frontend/src/pages/Landing.jsx`:
1. Remove import of `mockSubmitComplianceRequest` from mock.js
2. Replace mock function with real API call using axios
3. Update error handling for real API responses

**Before**:
```javascript
import { mockSubmitComplianceRequest, mockFAQData, mockPricingData } from '../mock';

const result = await mockSubmitComplianceRequest(formData);
```

**After**:
```javascript
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const response = await axios.post(`${API}/compliance-request`, formData);
const result = response.data;
```

### 5. Environment Variables Needed

#### Backend `.env`:
- `SMTP_HOST` - Email server host
- `SMTP_PORT` - Email server port
- `SMTP_USERNAME` - Email username
- `SMTP_PASSWORD` - Email password
- `NOTIFICATION_EMAIL` - globaltransportservicesinc@gmail.com

### 6. Dependencies to Install

#### Backend:
- `aiosmtplib` - Async SMTP client for sending emails
- `email-validator` - Already installed

## Testing Checklist

### Backend Testing:
- [ ] Form submission saves to MongoDB
- [ ] Email notification sends successfully
- [ ] Validation errors return proper messages
- [ ] CORS is configured correctly

### Frontend Testing:
- [ ] Form submits to real API
- [ ] Success toast appears on successful submission
- [ ] Error toast appears on failure
- [ ] Form resets after successful submission
- [ ] Loading state works correctly

### Integration Testing:
- [ ] End-to-end form submission flow
- [ ] Email arrives with correct information
- [ ] MongoDB record matches submitted data

## Mock Data Removal Plan

1. Keep `mockFAQData` and `mockPricingData` in mock.js (static data, no backend needed)
2. Remove `mockSubmitComplianceRequest` function usage
3. Delete mock.js file after confirming backend works (optional)
