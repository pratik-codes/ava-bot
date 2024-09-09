import pytest
from unittest.mock import patch, Mock
from llm import OpenAIClient

# Test for valid response from OpenAIClient
@patch('openai.OpenAI')  # Mock the OpenAI class
@patch.dict('os.environ', {'OPENAI_API_KEY': 'test_api_key'})  # Mock environment variable
def test_generate_response_valid(mock_openai):
    # Create a mock OpenAI instance
    mock_openai_instance = Mock()
    mock_openai.return_value = mock_openai_instance

    # Mock the chat completions create method
    mock_create = Mock()
    mock_openai_instance.chat.completions.create = mock_create
    mock_create.return_value = Mock(choices=[Mock(message=Mock(content="This is a response."))])

    # Create an OpenAIClient instance
    client = OpenAIClient(api_key="test_api_key")

    # Call generate_response method
    response = client.generate_response("Hello Ava!", "System prompt")

    # Assert the response
    assert response == "This is a response."

    # Assert that OpenAI was initialized with the correct API key
    mock_openai.assert_called_once_with(api_key="test_api_key")

    # Assert that the chat completions create method was called with correct parameters
    mock_create.assert_called_once_with(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "System prompt"},
            {"role": "user", "content": "Hello Ava!"},
        ],
        max_tokens=150,
        temperature=0.7,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0,
    )

# Test for handling empty response
@patch('openai.OpenAI')  # Mock the OpenAI class
@patch.dict('os.environ', {'OPENAI_API_KEY': 'test_api_key'})  # Mock environment variable
def test_generate_response_no_choices(mock_openai):
    # Create a mock OpenAI instance
    mock_openai_instance = Mock()
    mock_openai.return_value = mock_openai_instance

    # Mock the chat completions create method to return no choices
    mock_create = Mock()
    mock_openai_instance.chat.completions.create = mock_create
    mock_create.return_value = Mock(choices=[])

    # Create an OpenAIClient instance
    client = OpenAIClient(api_key="test_api_key")

    # Call generate_response method
    response = client.generate_response("Hello Ava!", "System prompt")

    # Assert the response
    assert response == "No response generated."

# Test for handling exceptions from OpenAIClient
@patch('openai.OpenAI')  # Mock the OpenAI class
@patch.dict('os.environ', {'OPENAI_API_KEY': 'test_api_key'})  # Mock environment variable
def test_generate_response_exception(mock_openai):
    # Create a mock OpenAI instance
    mock_openai_instance = Mock()
    mock_openai.return_value = mock_openai_instance

    # Mock the chat completions create method to raise an exception
    mock_create = Mock()
    mock_openai_instance.chat.completions.create = mock_create
    mock_create.side_effect = Exception("API error")

    # Create an OpenAIClient instance
    client = OpenAIClient(api_key="test_api_key")

    # Call generate_response method and check for the exception handling
    with pytest.raises(Exception) as exc_info:
        client.generate_response("Hello Ava!", "System prompt")

    # Assert the exception message
    assert str(exc_info.value) == "API error"

    # Assert that OpenAI was initialized with the correct API key
    mock_openai.assert_called_once_with(api_key="test_api_key")
