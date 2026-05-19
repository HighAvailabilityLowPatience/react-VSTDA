//displaying AI output

function AgentReadout({agentReadout}) {

  return (

  <section className="agent-readout">

    <h3>Agent Readout</h3>

    {!agentReadout ? (

      <div className="agent-readout-empty">

        <p>No active agent responses.</p>

      </div>

    ) : (

      <div className="agent-response">

        <pre>

          {agentReadout}

        </pre>

      </div>

    )}

  </section>

);

}



// ========================================
// EXPORT
// ========================================

export default AgentReadout;