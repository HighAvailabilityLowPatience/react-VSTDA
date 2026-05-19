//displaying AI output

function AgentReadout({agentReadout}) {
let parsedResponse = null;
try {
  parsedResponse = JSON.parse(
    agentReadout
  );
} catch (err) {
  console.log(
    "Invalid JSON response"
  );
}
  return (

  <section className="agent-readout">

    <h3>Agent Readout</h3>

    {!agentReadout ? (

      <div className="agent-readout-empty">

        <p>No active agent responses.</p>

      </div>

    ) : (

      <div className="agent-response">

        <h4>
          {parsedResponse?.summary}
        </h4>



        {parsedResponse?.systemConcerns?.map(
          (concern, index) => {

            return (

              <div
                key={index}
                className="agent-warning"
              >

                ⚠ {concern}

              </div>

            );

          }
        )}



        {parsedResponse?.recommendedActions?.map(
          (action, index) => {

            return (

              <div
                key={index}
                className="agent-action-card"
              >

                <h5>
                  {action.task}
                </h5>

                <p>
                  {action.reason}
                </p>

              </div>

            );

          }
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