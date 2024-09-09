import os
from abc import ABC, abstractmethod
import openai
import constants


class LLMClient(ABC):
    @abstractmethod
    def generate_response(self, user_message: str, system_prompt: str | None) -> str:
        pass


class OpenAIClient(LLMClient):
    def __init__(self, api_key: str):
        self.client = openai.OpenAI(
            # This is the default and can be omitted
            api_key=os.environ.get("OPENAI_API_KEY"),
        )

    def generate_response(self, user_message: str, system_prompt: str | None) -> str:
        response = self.client.chat.completions.create(
            model=constants.MODAL_NAME,  # Or "gpt-4" if you have access
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message},
            ],
            max_tokens=constants.MAX_TOKENS,
            temperature=constants.TEMPERATURE,
            top_p=constants.TOP_P,
            frequency_penalty=constants.FREQUENCY_PENALTY,
            presence_penalty=constants.PRESENCE_PENALTY,
        )

        response_content = ""
        # Return the response message
        if response.choices and len(response.choices) > 0:
            response_content = response.choices[0].message.content.strip()
        else:
            response_content = "No response generated."

        return response_content
