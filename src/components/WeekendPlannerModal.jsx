//weekend planner form UI

function WeekendPlannerModal({handleWeekendPlanner,onClose }) {
const submitWeekendPlanner = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const weekendData = {
    mood: formData.get("mood"),
    energyLevel: Number(
      formData.get("energyLevel")
    ),
    socialBattery: Number(
      formData.get("socialBattery")
    ),
    availableTime: Number(
      formData.get("availableTime")
    ),
    additionalContext: formData.get(
      "additionalContext"
    )
  };

  console.log(
    "WEEKEND DATA:",
    weekendData
  );

  handleWeekendPlanner(weekendData);

};
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

        <form className="weekend-form"
        onSubmit={submitWeekendPlanner}
        >

          {/* MOOD */}

          <div className="form-group">

            <label>Mood</label>

            <input
              type="text"
              name="mood"
              placeholder="Burned out, bored, restless, etc..."
            />

          </div>



          {/* ENERGY LEVEL */}

          <div className="form-group">

            <label>Energy Level (1-10)</label>

            <input
              type="number"
              name="energyLevel"
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
              name="socialBattery"
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
              name="availableTime"
              placeholder="In Minutes Example"
            />

          </div>



          {/* USER CONTEXT */}

          <div className="form-group">

            <label>Additional Context</label>

            <textarea
            name="additionalContext"
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