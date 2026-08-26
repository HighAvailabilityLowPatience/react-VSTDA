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

function AgentReadout({ agentReadout }) {
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

      {!agentReadout ? (

        <div className="agent-readout-empty">

          <p>No active agent responses yet.</p>
          <span>Run Clean Tasks, Capacity Check, or Plan Weekend to light this up.</span>

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

    </section>

  );

}

// ========================================
// EXPORT
// ========================================

export default AgentReadout;