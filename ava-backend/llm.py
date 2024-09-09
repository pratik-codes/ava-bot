import os
from abc import ABC, abstractmethod
import openai


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
            model="gpt-3.5-turbo",  # Or "gpt-4" if you have access
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message},
            ],
            max_tokens=150,
            temperature=0.7,
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0,
        )

        response_content = ""
        # Return the response message
        if response.choices and len(response.choices) > 0:
            response_content = response.choices[0].message.content.strip()
        else:
            response_content = "No response generated."

        return response_content
