import unittest
from unittest.mock import patch, MagicMock
from handlers import handle_chat
import llm as LLM

class TestHandleChat(unittest.TestCase):
    @patch('LLM.OpenAIClient')
    def test_handle_chat_valid_response(self, MockOpenAIClient):
        # Create a mock response object
        mock_response = MagicMock()
        mock_response.choices = [
            MagicMock(
                message=MagicMock(content="Hello! How can I assist you today?")
            )
        ]

        # Set up the mock OpenAIClient
        mock_client = MockOpenAIClient.return_value
        mock_client.generate_response.return_value = "Hello! How can I assist you today?"

        # Call the function with a sample user message
        response = handle_chat("Hi, Ava!")

        # Assertions
        mock_client.generate_response.assert_called_once_with(
            user_message="Hi, Ava!",
            system_message="You are Ava, an AI assistant."
        )
        self.assertEqual(response, "Hello! How can I assist you today?")

    @patch('LLM.OpenAIClient')
    def test_handle_chat_client_exception(self, MockOpenAIClient):
        # Mock generate_response to raise an exception
        mock_client = MockOpenAIClient.return_value
        mock_client.generate_response.side_effect = Exception("Something went wrong")

        # Call the function with a sample user message
        response = handle_chat("Hi, Ava!")

        # Assertions
        mock_client.generate_response.assert_called_once_with(
            user_message="Hi, Ava!",
            system_message="You are Ava, an AI assistant."
        )
        self.assertEqual(response, "No response generated.")

if __name__ == '__main__':
    unittest.main()
