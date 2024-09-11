# import os
# from abc import ABC, abstractmethod
# from langchain.chat_models import ChatOpenAI
# from langchain.schema import AIMessage, HumanMessage, SystemMessage
# import constants


# class LLMLGClient(ABC):
#     @abstractmethod
#     def generate_response(self, user_message: str, system_prompt: str | None) -> str:
#         pass


# class OpenAIClient(LLMLGClient):
#     def __init__(self, api_key: str, chat_history=None):
#         # Initialize the Langchain OpenAI client
#         self.client = ChatOpenAI(
#             api_key=os.getenv("OPENAI_API_KEY"),  # Get API key from environment
#             model=constants.MODAL_NAME,          # Model name
#             temperature=constants.TEMPERATURE,
#             max_tokens=constants.MAX_TOKENS,
#             top_p=constants.TOP_P,
#             frequency_penalty=constants.FREQUENCY_PENALTY,
#             presence_penalty=constants.PRESENCE_PENALTY,
#         )
#         # Persistent chat history
#         self.chat_history = chat_history if chat_history is not None else []

#     def generate_response(self, user_message: str, system_prompt: str | None) -> str:
#         # Add system prompt only once at the beginning of the conversation
#         if system_prompt and len(self.chat_history) == 0:
#             self.chat_history.append(SystemMessage(content=system_prompt))

#         # Add user message to the conversation history
#         self.chat_history.append(HumanMessage(content=user_message))

#         # Get the response from the OpenAI client
#         response = self.client(self.chat_history)

#         # Add the AI's response to the conversation history
#         if response and len(response) > 0:
#             ai_message = response[0]
#             self.chat_history.append(AIMessage(content=ai_message.content.strip()))
#             return ai_message.content.strip()
#         else:
#             return "No response generated."

#     def get_history(self):
#         return self.chat_history
