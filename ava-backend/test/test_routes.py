import pytest
from unittest.mock import patch
from flask import Flask
from routes import AvaChatBot
import handlers

# Fixture to set up a Flask test client
@pytest.fixture
def client():
    app = Flask(__name__)
    AvaChatBot(app)  # Initialize AvaChatBot routes
    return app.test_client()

# Test for health check route
def test_health_check(client):
    response = client.get('/')
    assert response.status_code == 200
    assert response.data.decode() == 'Ava Chat Bot is up and running!'

# Test for valid chat request with mocked handle_chat and environment variable
@patch("handlers.handle_chat")
@patch.dict('os.environ', {'OPENAI_API_KEY': 'test_api_key'})  # Mock environment variable
def test_chat_valid_request(mock_handle_chat, client):
    # Mock the handle_chat function to return a predefined response
    mock_handle_chat.return_value = "Hello, how can I assist you today?"

    # Simulate POST request to /chat
    response = client.post('/chat', json={"message": "Hello Ava!"})

    print("PRINTING RESPONSE", response.json)  # Debugging statement to see actual response
    assert response.status_code == 200
    assert response.json == {"response": "Hello, how can I assist you today?"}
    mock_handle_chat.assert_called_once_with("Hello Ava!")

# Test for when handle_chat throws an exception with mocked environment variable
@patch('handlers.handle_chat')
@patch.dict('os.environ', {'OPENAI_API_KEY': 'test_api_key'})  # Mock environment variable
def test_chat_handle_chat_exception(mock_handle_chat, client):
    # Mock the handle_chat function to raise an exception
    mock_handle_chat.side_effect = Exception("An error occurred")

    # Simulate POST request to /chat with valid message
    response = client.post('/chat', json={"message": "Hello Ava!"})

    print(response.json)  # Debugging statement to see actual response
    assert response.status_code == 200
    assert response.json == {"error": "An error occurred"}
