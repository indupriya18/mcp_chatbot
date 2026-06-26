from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from mcp_engine import MCPEngine

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mcp = MCPEngine()

chat_history = []


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def home():
    return {"message": "MCP Chatbot Backend Running"}


@app.post("/chat")
def chat(request: ChatRequest):

    user_message = request.message

    answer = mcp.get_response(
        user_message=user_message,
        chat_history=chat_history
    )

    chat_history.append(
        {
            "question": user_message,
            "answer": answer
        }
    )

    return {
        "response": answer
    }