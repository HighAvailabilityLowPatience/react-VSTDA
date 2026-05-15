//displaying AI output

function AgentReadout() {

  return (

    <section className="agent-readout">

      <h3>Agent Readout</h3>



      {/* EMPTY STATE */}

      <div className="agent-readout-empty">

        <p>No active agent responses.</p>

      </div>



      {/* FUTURE RESPONSE DISPLAY */}

      {/*
        Future:
        - Capacity check output
        - Weekend plans
        - Cleanup recommendations
        - AI summaries
      */}

    </section>

  );

}



// ========================================
// EXPORT
// ========================================

export default AgentReadout;