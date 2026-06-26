import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = {
      sender: "user",
      text: message
    };

    setChat(prev => [...prev, userMsg]);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          message: message
        }
      );

      const botMsg = {
        sender: "bot",
        text: response.data.response
      };

      setChat(prev => [...prev, botMsg]);

    } catch (error) {
      console.error(error);
    }

    setMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>MCP Chatbot</h1>

      <div
        style={{
          border: "1px solid gray",
          height: "400px",
          overflowY: "auto",
          padding: "10px",
          marginBottom: "10px"
        }}
      >
        {chat.map((msg, index) => (
          <div key={index}>
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "80%" }}
      />

      <button onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

export default App;