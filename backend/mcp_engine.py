from openai import OpenAI
from config import OPENAI_API_KEY

client = OpenAI(
    api_key=OPENAI_API_KEY,
    base_url="https://api.groq.com/openai/v1"
)


class MCPEngine:
    def __init__(self):
        self.system_prompt = (
            "You are a helpful AI assistant. "
            "You maintain context from previous conversations."
        )

    def build_messages(self, user_message, chat_history):
        """
        MCP-style context builder
        """

        messages = []

        # 1. System message (role definition)
        messages.append({
            "role": "system",
            "content": self.system_prompt
        })

        # 2. Add chat history (last few messages)
        for chat in chat_history[-5:]:
            messages.append({
                "role": "user",
                "content": chat["question"]
            })
            messages.append({
                "role": "assistant",
                "content": chat["answer"]
            })

        # 3. Current user message
        messages.append({
            "role": "user",
            "content": user_message
        })

        return messages

    def get_response(self, user_message, chat_history):
        """
        Call OpenAI API with MCP context
        """

        messages = self.build_messages(user_message, chat_history)

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages
)
        

        return response.choices[0].message.content