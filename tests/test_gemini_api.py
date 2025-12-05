
import unittest
import re
from playwright.sync_api import sync_playwright, expect

class TestGeminiAPI(unittest.TestCase):
    def test_api_call_uses_correct_model(self):
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()

            # Variable to store the requested URL
            intercepted_url = ""

            def handle_route(route):
                nonlocal intercepted_url
                intercepted_url = route.request.url
                # Abort the request since we are only checking the URL
                route.abort()

            # Intercept network requests
            page.route(re.compile("generativelanguage.googleapis.com"), handle_route)

            # Navigate to the local file
            import os
            file_path = os.path.abspath('index.html')
            page.goto(f"file://{file_path}")

            # Trigger the API call
            page.locator('button', has_text='Ask AI').first.click()
            page.locator('#chat-input').fill("test prompt")
            page.locator('#send-btn').click()

            # Wait a moment for the async JS to execute and make the fetch call
            page.wait_for_timeout(1000)

            browser.close()

            # Assert that the correct model name is in the intercepted URL
            self.assertIn("gemini-1.5-flash-latest", intercepted_url)

if __name__ == '__main__':
    unittest.main()
