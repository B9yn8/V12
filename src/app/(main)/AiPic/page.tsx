"use client"; // Ensures the file is treated as a client component


import { useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/bigscience/bloom", // Replace with the model of your choice
        {
          inputs: messages.map((msg) => msg.content).join("\n") + "\n" + input,
        },
        {
          headers: {
            Authorization: `Bearer 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`, // Get a free API key at huggingface.co
          },
        }
      );

      const botMessage = { role: "bot", content: response.data.generated_text || "I couldn't process that." };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", content: "Error processing your request." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <span>{msg.content}</span>
          </div>
        ))}
        {loading && <div className="message bot">Thinking...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>

      <style jsx>{`
        .chat-container {
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: #f5f5f5;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 16px;
        }
        .chat-window {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          margin-bottom: 8px;
        }
        .message {
          margin-bottom: 12px;
        }
        .message.user {
          text-align: right;
          color: #007bff;
        }
        .message.bot {
          text-align: left;
          color: #555;
        }
        .chat-input {
          display: flex;
          gap: 8px;
        }
        input {
          flex: 1;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          padding: 8px 16px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default ChatPage;
