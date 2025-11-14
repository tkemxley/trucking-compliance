#!/usr/bin/env python3
"""
Backend API Testing for GT IRP Service California Trucking Compliance Landing Page
Tests the compliance request submission endpoint
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient

# Get backend URL from frontend .env file
def get_backend_url():
    """Read backend URL from frontend .env file"""
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return "http://localhost:8001"
    return "http://localhost:8001"

BACKEND_URL = get_backend_url()
API_BASE = f"{BACKEND_URL}/api"

# MongoDB connection for verification
MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "test_database"

class ComplianceAPITester:
    def __init__(self):
        self.session = None
        self.mongo_client = None
        self.db = None
        self.test_results = []
        
    async def setup(self):
        """Setup HTTP session and MongoDB connection"""
        self.session = aiohttp.ClientSession()
        self.mongo_client = AsyncIOMotorClient(MONGO_URL)
        self.db = self.mongo_client[DB_NAME]
        
    async def cleanup(self):
        """Cleanup connections"""
        if self.session:
            await self.session.close()
        if self.mongo_client:
            self.mongo_client.close()
            
    async def test_api_endpoint(self, test_name, data, expected_status=200, should_fail=False):
        """Test API endpoint with given data"""
        print(f"\n🧪 Testing: {test_name}")
        print(f"📤 Request data: {json.dumps(data, indent=2)}")
        
        try:
            async with self.session.post(
                f"{API_BASE}/compliance-request",
                json=data,
                headers={"Content-Type": "application/json"}
            ) as response:
                status = response.status
                response_data = await response.json()
                
                print(f"📥 Response status: {status}")
                print(f"📥 Response data: {json.dumps(response_data, indent=2)}")
                
                # Check status code
                if status == expected_status:
                    print(f"✅ Status code correct: {status}")
                    status_ok = True
                else:
                    print(f"❌ Status code incorrect. Expected: {expected_status}, Got: {status}")
                    status_ok = False
                
                # For successful requests, verify response structure
                if status == 200 and not should_fail:
                    required_fields = ['success', 'message', 'requestId']
                    structure_ok = all(field in response_data for field in required_fields)
                    
                    if structure_ok and response_data.get('success') is True:
                        print("✅ Response structure valid")
                        # Verify MongoDB storage
                        mongo_ok = await self.verify_mongodb_storage(response_data.get('requestId'))
                    else:
                        print("❌ Response structure invalid")
                        structure_ok = False
                        mongo_ok = False
                        
                elif status == 422 and should_fail:
                    # Validation error expected
                    structure_ok = True
                    mongo_ok = True  # No need to check MongoDB for failed requests
                    print("✅ Validation error as expected")
                else:
                    structure_ok = False
                    mongo_ok = False
                
                self.test_results.append({
                    'test_name': test_name,
                    'status_ok': status_ok,
                    'structure_ok': structure_ok,
                    'mongo_ok': mongo_ok,
                    'overall_pass': status_ok and structure_ok and mongo_ok,
                    'response_status': status,
                    'response_data': response_data
                })
                
                return status_ok and structure_ok and mongo_ok
                
        except Exception as e:
            print(f"❌ Request failed with exception: {str(e)}")
            self.test_results.append({
                'test_name': test_name,
                'status_ok': False,
                'structure_ok': False,
                'mongo_ok': False,
                'overall_pass': False,
                'error': str(e)
            })
            return False
    
    async def verify_mongodb_storage(self, request_id):
        """Verify that the request was stored in MongoDB"""
        try:
            if not request_id:
                print("❌ No request ID provided for MongoDB verification")
                return False
                
            # Query MongoDB for the request
            document = await self.db.compliance_requests.find_one({"id": request_id})
            
            if document:
                print(f"✅ Request found in MongoDB with ID: {request_id}")
                print(f"📄 MongoDB document: {json.dumps({k: str(v) for k, v in document.items() if k != '_id'}, indent=2)}")
                return True
            else:
                print(f"❌ Request not found in MongoDB with ID: {request_id}")
                return False
                
        except Exception as e:
            print(f"❌ MongoDB verification failed: {str(e)}")
            return False
    
    async def check_backend_logs(self):
        """Check backend logs for email notification messages"""
        print("\n📋 Checking backend logs for email notifications...")
        try:
            # Check supervisor logs
            import subprocess
            result = subprocess.run(
                ["tail", "-n", "50", "/var/log/supervisor/backend.out.log"],
                capture_output=True,
                text=True
            )
            
            if result.returncode == 0:
                logs = result.stdout
                if "Email notification sent successfully" in logs:
                    print("✅ Found 'Email notification sent successfully' in logs")
                    return True
                elif "Email notification failed" in logs or "Failed to send email" in logs:
                    print("⚠️ Found email notification failure in logs")
                    return False
                else:
                    print("ℹ️ No email notification messages found in recent logs")
                    return None
            else:
                print(f"❌ Failed to read backend logs: {result.stderr}")
                return False
                
        except Exception as e:
            print(f"❌ Error checking backend logs: {str(e)}")
            return False
    
    async def run_all_tests(self):
        """Run all test cases"""
        print(f"🚀 Starting GT IRP Service Compliance API Tests")
        print(f"🔗 Backend URL: {BACKEND_URL}")
        print(f"🔗 API Endpoint: {API_BASE}/compliance-request")
        
        await self.setup()
        
        # Test Case 1: Valid submission with all fields
        test1_data = {
            "companyName": "Test Transport Co",
            "contactPerson": "John Smith",
            "phone": "+1 555-123-4567",
            "email": "john@testtransport.com",
            "usdotMc": "USDOT123456",
            "message": "Need CARB and Clean Truck Check help"
        }
        await self.test_api_endpoint("Test 1: Valid submission with all fields", test1_data)
        
        # Test Case 2: Valid submission without optional fields
        test2_data = {
            "companyName": "Quick Freight LLC",
            "contactPerson": "Jane Doe",
            "phone": "+1 415-555-9999",
            "email": "jane@quickfreight.com"
        }
        await self.test_api_endpoint("Test 2: Valid submission without optional fields", test2_data)
        
        # Test Case 3: Missing required field (email)
        test3_data = {
            "companyName": "Missing Email Co",
            "contactPerson": "Test User",
            "phone": "+1 555-000-0000"
        }
        await self.test_api_endpoint("Test 3: Missing required field", test3_data, expected_status=422, should_fail=True)
        
        # Test Case 4: Invalid email format
        test4_data = {
            "companyName": "Bad Email Co",
            "contactPerson": "Test User",
            "phone": "+1 555-000-0000",
            "email": "notanemail"
        }
        await self.test_api_endpoint("Test 4: Invalid email format", test4_data, expected_status=422, should_fail=True)
        
        # Check backend logs
        await self.check_backend_logs()
        
        await self.cleanup()
        
        # Print summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*60)
        print("📊 TEST SUMMARY")
        print("="*60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result['overall_pass'])
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {total_tests - passed_tests}")
        
        print("\nDetailed Results:")
        for result in self.test_results:
            status = "✅ PASS" if result['overall_pass'] else "❌ FAIL"
            print(f"{status} - {result['test_name']}")
            if not result['overall_pass']:
                if 'error' in result:
                    print(f"    Error: {result['error']}")
                else:
                    print(f"    Status OK: {result['status_ok']}")
                    print(f"    Structure OK: {result['structure_ok']}")
                    print(f"    MongoDB OK: {result['mongo_ok']}")
        
        print("\n" + "="*60)

async def main():
    """Main test runner"""
    tester = ComplianceAPITester()
    await tester.run_all_tests()

if __name__ == "__main__":
    asyncio.run(main())