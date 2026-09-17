import React, { useState } from "react";

// Base URL of your Spring Boot backend.
// Update this if your backend runs on a different host/port.
const API_BASE_URL = "http://localhost:8080/api/ollama";

export default function OllamaChat() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    setLoading(true);
    setError("");
    setResponse("");

    try {
      // Backend endpoint is a GET with the message as a path variable,
      // so it must be URI-encoded (spaces, punctuation, etc.).
      const res = await fetch(
        `${API_BASE_URL}/${encodeURIComponent(trimmed)}`,
        { method: "GET" }
      );

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const text = await res.text();
      setResponse(text);
      setHistory((prev) => [...prev, { question: trimmed, answer: text }]);
      setMessage("");
    } catch (err) {
      setError(err.message || "Something went wrong while contacting the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Ollama Chat</h1>

      <div style={styles.inputRow}>
        <textarea
          style={styles.textarea}
          placeholder="Ask something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
        />
        <button
          style={{
            ...styles.button,
            opacity: loading || !message.trim() ? 0.6 : 1,
            cursor: loading || !message.trim() ? "not-allowed" : "pointer",
          }}
          onClick={sendMessage}
          disabled={loading || !message.trim()}
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {response && (
        <div style={styles.responseBox}>
          <strong>Latest response:</strong>
          <p style={styles.responseText}>{response}</p>
        </div>
      )}

      {history.length > 0 && (
        <div style={styles.historyBox}>
          <h2 style={styles.historyTitle}>History</h2>
          {history
            .slice()
            .reverse()
            .map((item, idx) => (
              <div key={idx} style={styles.historyItem}>
                <div style={styles.historyQuestion}>You: {item.question}</div>
                <div style={styles.historyAnswer}>Ollama: {item.answer}</div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: "40px auto",
    padding: 24,
    fontFamily: "system-ui, sans-serif",
    border: "1px solid #e0e0e0",
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  inputRow: {
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
  },
  textarea: {
    flex: 1,
    padding: 10,
    fontSize: 15,
    borderRadius: 8,
    border: "1px solid #ccc",
    resize: "vertical",
    fontFamily: "inherit",
  },
  button: {
    padding: "10px 18px",
    fontSize: 15,
    borderRadius: 8,
    border: "none",
    backgroundColor: "#4f46e5",
    color: "#fff",
    fontWeight: 600,
  },
  error: {
    marginTop: 14,
    color: "#b91c1c",
    backgroundColor: "#fee2e2",
    padding: 10,
    borderRadius: 8,
  },
  responseBox: {
    marginTop: 20,
    padding: 14,
    backgroundColor: "#f5f5f7",
    borderRadius: 8,
  },
  responseText: {
    whiteSpace: "pre-wrap",
    marginTop: 8,
  },
  historyBox: {
    marginTop: 24,
    borderTop: "1px solid #e0e0e0",
    paddingTop: 14,
  },
  historyTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  historyItem: {
    marginBottom: 14,
    padding: 10,
    backgroundColor: "#fafafa",
    borderRadius: 8,
  },
  historyQuestion: {
    fontWeight: 600,
    marginBottom: 4,
  },
  historyAnswer: {
    whiteSpace: "pre-wrap",
    color: "#374151",
  },
};
