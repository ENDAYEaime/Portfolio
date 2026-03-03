import requests
import sys
from datetime import datetime

class PortfolioAPITester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, expected_keys=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            result = {
                'name': name,
                'endpoint': endpoint,
                'expected_status': expected_status,
                'actual_status': response.status_code,
                'success': success,
                'response_data': None,
                'error': None
            }

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                try:
                    response_data = response.json()
                    result['response_data'] = response_data
                    print(f"Response: {response_data}")
                    
                    # Check expected keys if provided
                    if expected_keys:
                        missing_keys = [key for key in expected_keys if key not in response_data]
                        if missing_keys:
                            print(f"⚠️  Warning: Missing expected keys: {missing_keys}")
                        else:
                            print(f"✅ All expected keys present: {expected_keys}")
                            
                except Exception as e:
                    print(f"⚠️  Warning: Could not parse JSON response: {str(e)}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.text
                    result['error'] = error_data
                    print(f"Error response: {error_data}")
                except:
                    result['error'] = f"HTTP {response.status_code}"

            self.test_results.append(result)
            return success, response

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            result = {
                'name': name,
                'endpoint': endpoint,
                'expected_status': expected_status,
                'actual_status': None,
                'success': False,
                'response_data': None,
                'error': str(e)
            }
            self.test_results.append(result)
            return False, None

    def test_health_check(self):
        """Test API health check endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200,
            expected_keys=["status", "message"]
        )

    def test_info_endpoint(self):
        """Test portfolio info endpoint"""
        return self.run_test(
            "Portfolio Info",
            "GET", 
            "api/info",
            200,
            expected_keys=["name", "title", "email", "github", "linkedin"]
        )

    def print_summary(self):
        """Print test summary"""
        print(f"\n📊 Test Summary")
        print(f"=" * 50)
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.tests_passed < self.tests_run:
            print(f"\n❌ Failed Tests:")
            for result in self.test_results:
                if not result['success']:
                    error_msg = result['error'] or f"HTTP {result['actual_status']}"
                    print(f"  - {result['name']}: {error_msg}")
        
        return self.tests_passed == self.tests_run

def main():
    print("🚀 Starting Portfolio API Tests")
    print("=" * 50)
    
    tester = PortfolioAPITester()
    
    # Run all tests
    tests = [
        tester.test_health_check,
        tester.test_info_endpoint
    ]
    
    for test in tests:
        test()
    
    # Print summary
    all_passed = tester.print_summary()
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())