function Sidebar({ todos, completionLog }) {
 const totalEstimatedTime = todos.reduce((total, todo) => {

  return total + todo.estimatedTimeCost;

}, 0);
const now = Date.now();
const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
const recentCompletions = completionLog.filter((timestamp) => {

  return timestamp >= sevenDaysAgo;

});
  return (

    <aside>

      {/* =======================
          LEGEND
      ======================= */}

      <section>

        <h2>Legend</h2>


        <div>

          <span>🔥</span>

          <h3>Urgent + Important</h3>

          <p>
            Needs immediate action and has serious consequences if ignored.
          </p>

          <small>
            Ask: "Does this hurt me badly if delayed?"
          </small>

        </div>


        <div>

          <span>⚠️</span>

          <h3>Important, Not Urgent</h3>

          <p>
            Important for long-term growth, planning, or stability.
          </p>

          <small>
            Ask: "Will future me thank me for doing this?"
          </small>

        </div>


        <div>

          <span>⏳</span>

          <h3>Urgent, Not Important</h3>

          <p>
            Time-sensitive but low-value tasks that mainly demand attention.
          </p>

          <small>
            Ask: "Am I reacting instead of progressing?"
          </small>

        </div>


        <div>

          <span>🧊</span>

          <h3>Not Urgent, Not Important</h3>

          <p>
            Low-impact tasks with little meaningful consequence.
          </p>

          <small>
            Ask: "Is this actually worth my energy right now?"
          </small>

        </div>

      </section>

   {/* =======================
    TASK STATUS
======================= */}

<div>

  <h2>Task Status</h2>

</div>


<div>

  <span>🚧</span>

  <h3>Started</h3>

  <p>
    Work has begun on this task but it is not yet complete.
  </p>

  <small>
    Check notes for progress details or current state.
  </small>

</div>


<div>

  <span>⛔</span>

  <h3>Blocker</h3>

  <p>
    Progress on this task is currently blocked by an issue or dependency.
  </p>

  <small>
    Check notes for blocker details or required action.
  </small>

</div>

     {/* =======================
          METRICS
      ======================= */}

      <section>

        <h2>Metrics</h2>


        <div>

          <h3>Total Estimated Work</h3>

          <p>
            {totalEstimatedTime} Minutes
          </p>

        </div>


        <div>

          <h3>7 Day Output</h3>

          <p>
            {recentCompletions.length} Completed Items
          </p>

        </div>

      </section>

    </aside>


  );

}

export default Sidebar;