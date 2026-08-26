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

    <aside className="task-intelligence">

      {/* =======================
          LEGEND
      ======================= */}

      <section className="metrics-grid" aria-label="Task metrics">

        <article className="metric-card">
          <span className="metric-label">Total Estimated Work</span>
          <strong className="metric-value">{totalEstimatedTime}</strong>
          <span className="metric-subtext">minutes queued</span>
        </article>

        <article className="metric-card">
          <span className="metric-label">7 Day Output</span>
          <strong className="metric-value">{recentCompletions.length}</strong>
          <span className="metric-subtext">completed items</span>
        </article>

      </section>

      <details className="priority-guide">

        <summary>Priority Guide</summary>

        <div className="priority-guide-grid">


        <article className="legend-card urgent-important">

          <span className="legend-icon">F</span>

          <h3>Urgent + Important</h3>

          <p>
            Needs immediate action and has serious consequences if ignored.
          </p>

          <small>
            Ask: "Does this hurt me badly if delayed?"
          </small>

        </article>


        <article className="legend-card important-not-urgent">

          <span className="legend-icon">!</span>

          <h3>Important, Not Urgent</h3>

          <p>
            Important for long-term growth, planning, or stability.
          </p>

          <small>
            Ask: "Will future me thank me for doing this?"
          </small>

        </article>


        <article className="legend-card urgent-not-important">

          <span className="legend-icon">T</span>

          <h3>Urgent, Not Important</h3>

          <p>
            Time-sensitive but low-value tasks that mainly demand attention.
          </p>

          <small>
            Ask: "Am I reacting instead of progressing?"
          </small>

        </article>


        <article className="legend-card not-urgent-not-important">

          <span className="legend-icon">Z</span>

          <h3>Not Urgent, Not Important</h3>

          <p>
            Low-impact tasks with little meaningful consequence.
          </p>

          <small>
            Ask: "Is this actually worth my energy right now?"
          </small>

        </article>

        </div>

      </details>

   {/* =======================
    TASK STATUS
======================= */}

<details className="status-guide">

  <summary>Task Status</summary>

  <div className="status-guide-grid">


<article className="legend-card status-started">

  <span className="legend-icon">S</span>

  <h3>Started</h3>

  <p>
    Work has begun on this task but it is not yet complete.
  </p>

  <small>
    Check notes for progress details or current state.
  </small>

</article>


<article className="legend-card status-blocker">

  <span className="legend-icon">B</span>

  <h3>Blocker</h3>

  <p>
    Progress on this task is currently blocked by an issue or dependency.
  </p>

  <small>
    Check notes for blocker details or required action.
  </small>

</article>

  </div>

</details>

    </aside>


  );

}

export default Sidebar;