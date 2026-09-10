//displaying AI output

function parseAgentReadout(agentReadout) {
  if (typeof agentReadout !== "string") {
    return agentReadout;
  }

  try {
    return JSON.parse(agentReadout);
  } catch {
    return null;
  }
}

function formatLabel(label) {
  return label
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function renderValue(value, keyName = "Response") {
  if (Array.isArray(value)) {
    return (
      <div className="agent-list">
        {value.map((item, index) => (
          <article className="agent-card" key={`${keyName}-${index}`}>
            {renderValue(item, `${keyName} ${index + 1}`)}
          </article>
        ))}
      </div>
    );
  }

  if (value && typeof value === "object") {
    return (
      <div className="agent-fields">
        {Object.entries(value).map(([key, item]) => (
          <section className="agent-field" key={key}>
            <h4>{formatLabel(key)}</h4>
            {renderValue(item, key)}
          </section>
        ))}
      </div>
    );
  }

  return <p>{String(value || "None")}</p>;
}

function AgentReadout({
  agentReadout,
  chatInput,
  chatMessages,
  chatStatus,
  handleChatInputKeyDown,
  isChatLoading,
  isListening,
  sendChatMessage,
  setChatInput,
  toggleSpeechToText
}) {
  const parsedReadout = parseAgentReadout(agentReadout);

  return (

    <section className="agent-readout">

      <div className="agent-readout-header">
        <div>
          <span className="agent-kicker">AI Console</span>
          <h3>Agent Readout</h3>
        </div>
        <span className="agent-status">Ready</span>
      </div>

      <div className="agent-dialogue" aria-live="polite">
        {chatMessages.map((message, index) => (
          <article
            className={`chat-message ${message.role}`}
            key={`${message.role}-${index}`}
          >
            <span>{message.role === "user" ? "You" : "Assistant"}</span>
            <p>{message.content}</p>
          </article>
        ))}
      </div>

      <div className="agent-response-surface">
        {!agentReadout ? (

          <div className="agent-readout-empty">

            <p>No active agent responses yet.</p>
            <span>Send a message, run Clean Tasks, Capacity Check, or Plan Weekend.</span>

          </div>

        ) : (

         <div className="agent-response">

        {parsedReadout ? (

          renderValue(parsedReadout)

        ) : (

          <div className="agent-output">

            {agentReadout}

          </div>

        )}

        </div>

        )}
      </div>

      <div className="agent-composer">
        <textarea
          aria-label="Chat message"
          onChange={(event) => setChatInput(event.target.value)}
          onKeyDown={handleChatInputKeyDown}
          placeholder="Message the agent. Enter sends, Shift + Enter breaks line."
          value={chatInput}
        />

        <div className="agent-composer-actions">
          <span>{chatStatus}</span>

          <button
            className={isListening ? "voice-button listening" : "voice-button"}
            onClick={toggleSpeechToText}
            type="button"
          >
            {isListening ? "Stop" : "Voice"}
          </button>

          <button
            disabled={isChatLoading}
            onClick={sendChatMessage}
            type="button"
          >
            {isChatLoading ? "Sending" : "Send"}
          </button>
        </div>
      </div>

    </section>

  );

}

// ========================================
// EXPORT
// ========================================

export default AgentReadout;
