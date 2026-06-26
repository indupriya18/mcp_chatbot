import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setChat((prev) => [
      ...prev,
      { sender: "user", text: userMessage }
    ]);

    setMessage("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          message: userMessage
        }
      );

      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text: response.data.response
        }
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#20287e",
        display: "flex",
        flexDirection: "column",
        cornerRadius: "10px"
      }}
    >
      <h1
        style={{
          color: "white",
          textAlign: "center"
        }}
      >
        INDU'S AI
      </h1>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px"
        }}
      >
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                msg.sender === "user"
                  ? "flex-end"
                  : "flex-start",
              marginBottom: "10px"
            }}
          >
            <div
              style={{
                background:
                  msg.sender === "user"
                    ? "#10a37f"
                    : "#444654",
                color: "white",
                padding: "12px",
                borderRadius: "10px",
                maxWidth: "70%"
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          padding: "20px"
        }}
      >
        <input
          vlue={message}
  onChange={(e) => setMessage(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }}
  style={{ 
    flex: 1,
    padding: "12px",
    fontSize: "16px"
  }}
  placeholder="Ask something..."
/>

        <button
          onClick={sendMessage}
          style={{
            marginLeft: "10px",
            padding: "12px 20px"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;