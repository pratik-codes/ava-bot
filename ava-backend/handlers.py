import os
from llm import OpenAIClient

def handle_chat(user_message):
    system_prompt = os.getenv("SYSTEM_PROMPT")

    llm_client = OpenAIClient(api_key="your_openai_api_key")
    response_content = llm_client.generate_response(user_message, system_prompt)
    print("Response from OpenAI:", response_content)

    return response_content
