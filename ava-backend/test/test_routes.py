import unittest
from flask import Flask
from unittest.mock import patch, MagicMock
from routes import init_routes
from app import app

class TestChatRoutes(unittest.TestCase):

    def setUp(self):
        # Create a test Flask app instance
        self.app = Flask(__name__)
        init_routes(self.app)
        self.client = app.test_client()

    def test_health_check(self):
        """Test the health check route."""
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.decode('utf-8'), 'Ava Chat Bot is up and running!')

    @patch('routes.handle_chat')  # Patch the handle_chat function in the routes module
    def test_chat_valid_request(self, mock_handle_chat):
        # Set up mock return value
        mock_handle_chat.return_value = "Hello! How can I assist you today?"

        # Send a POST request to the /chat endpoint with a valid message
        response = self.client.post('/chat', json={"message": "Hi, Ava!"})

        # Assert the response
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"response": "Hello! How can I assist you today?"})

        # Check that handle_chat was called with the correct argument
        mock_handle_chat.assert_called_once_with("Hi, Ava!")

    def test_chat_invalid_request_no_json(self):
        """Test chat route with an invalid request (no JSON payload)."""
        response = self.client.post('/chat')

        # Assertions
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {"error": "Invalid request"})

    def test_chat_invalid_request_no_message(self):
        """Test chat route with an invalid request (missing 'message' in JSON)."""
        response = self.client.post('/chat', json={})

        # Assertions
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {"error": "Invalid request"})

    @patch('routes.handle_chat')  # Patch handle_chat in routes
    def test_chat_handle_chat_raises_exception(self, mock_handle_chat):
        """Test chat route when handle_chat raises an exception."""
        # Mock handle_chat to raise an exception
        mock_handle_chat.side_effect = Exception("Something went wrong")

        # Send a valid POST request with JSON payload
        response = self.client.post('/chat', json={"message": "Hi, Ava!"})

        # Assertions
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"error": "Something went wrong"})

if __name__ == '__main__':
    unittest.main()
