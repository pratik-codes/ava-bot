import pytest
from unittest.mock import patch, Mock
import llm
import handlers

# Test for valid chat request
@patch("llm.OpenAIClient")  # Mock the OpenAIClient
@patch.dict('os.environ', {'SYSTEM_PROMPT': 'test_system_prompt'})  # Mock environment variable
def test_handle_chat_valid_request(mock_openai_client):
    # Create a mock OpenAIClient instance
    mock_client_instance = Mock()
    mock_openai_client.return_value = mock_client_instance

    # Mock the generate_response method
    mock_client_instance.generate_response.return_value = "This is a response."

    # Call handle_chat function
    response = handlers.handle_chat("Hello Ava!")

    # Assert the response from handle_chat
    assert response == "This is a response."

    # Assert that OpenAIClient was initialized with the correct API key
    mock_openai_client.assert_called_once_with(api_key="your_openai_api_key")

    # Assert that generate_response was called with correct arguments
    mock_client_instance.generate_response.assert_called_once_with("Hello Ava!", 'test_system_prompt')

# Test for handling exceptions from OpenAIClient
@patch("llm.OpenAIClient")  # Mock the OpenAIClient
@patch.dict('os.environ', {'SYSTEM_PROMPT': 'test_system_prompt'})  # Mock environment variable
def test_handle_chat_exception(mock_openai_client):
    # Create a mock OpenAIClient instance
    mock_client_instance = Mock()
    mock_openai_client.return_value = mock_client_instance

    # Mock the generate_response method to raise an exception
    mock_client_instance.generate_response.side_effect = Exception("API error")

    # Call handle_chat function and check for the exception handling
    with pytest.raises(Exception) as exc_info:
        handlers.handle_chat("Hello Ava!")

    # Assert the exception message
    assert str(exc_info.value) == "API error"

    # Assert that OpenAIClient was initialized with the correct API key
    mock_openai_client.assert_called_once_with(api_key="your_openai_api_key")

    # Assert that generate_response was called with correct arguments
    mock_client_instance.generate_response.assert_called_once_with("Hello Ava!", 'test_system_prompt')
