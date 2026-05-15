//weekend planner form UI

function WeekendPlannerModal({ onClose }) {

  return (

    <div className="modal-overlay">

      <div className="weekend-modal">

        {/* ======================================== */}
        {/* HEADER */}
        {/* ======================================== */}

        <div className="modal-header">

          <h2>Plan My Weekend</h2>

          <button onClick={onClose}>
            X
          </button>

        </div>



        {/* ======================================== */}
        {/* FORM */}
        {/* ======================================== */}

        <form className="weekend-form">

          {/* MOOD */}

          <div className="form-group">

            <label>Mood</label>

            <input
              type="text"
              placeholder="Burned out, bored, restless, etc..."
            />

          </div>



          {/* ENERGY LEVEL */}

          <div className="form-group">

            <label>Energy Level (1-10)</label>

            <input
              type="number"
              min="1"
              max="10"
              placeholder="5"
            />

          </div>



          {/* SOCIAL BATTERY */}

          <div className="form-group">

            <label>Social Battery (1-10)</label>

            <input
              type="number"
              min="1"
              max="10"
              placeholder="5"
            />

          </div>



          {/* AVAILABLE TIME */}

          <div className="form-group">

            <label>Available Time (Minutes)</label>

            <input
              type="number"
              placeholder="480"
            />

          </div>



          {/* USER CONTEXT */}

          <div className="form-group">

            <label>Additional Context</label>

            <textarea
              placeholder="Describe current situation, recovery needs, goals, etc..."
            />

          </div>



          {/* ======================================== */}
          {/* ACTIONS */}
          {/* ======================================== */}

          <div className="modal-actions">

            <button type="submit">

              Generate Weekend Plan

            </button>

            <button
              type="button"
              onClick={onClose}
            >

              Cancel

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}



// ========================================
// EXPORT
// ========================================

export default WeekendPlannerModal;