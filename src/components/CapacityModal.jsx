//capacity form UI
function CapacityModal({ onClose, handleCapacityCheck }) {
    const submitCapacityForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const capacityData = {
      availableTime: Number(
        formData.get("availableTime")
      ),
      energyLevel: Number(
        formData.get("energyLevel")
      ),
      focusLevel: Number(
        formData.get("focusLevel")
      ),
      emotionalContext: formData.get(
        "emotionalContext"
      )
    };

    console.log("CAPACITY DATA:", capacityData);

    handleCapacityCheck(capacityData);

  };

  return (

    <div className="modal-overlay">

      <div className="capacity-modal">

        <div className="modal-header">

          <h2>Capacity Check</h2>

          <button onClick={onClose}>
            X
          </button>

        </div>



        <form
          className="capacity-form"
          onSubmit={submitCapacityForm}
        >

          {/* AVAILABLE TIME */}

          <div className="form-group">

            <label>Available Time (Minutes)</label>

            <input
              type="number"
              name="availableTime"
              placeholder="120"
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



          {/* FOCUS LEVEL */}

          <div className="form-group">

            <label>Focus Level (1-10)</label>

            <input
              type="number"
              name="focusLevel"
              min="1"
              max="10"
              placeholder="5"
            />

          </div>



          {/* EMOTIONAL CONTEXT */}

          <div className="form-group">

            <label>Emotional Context</label>

            <textarea
              name="emotionalContext"
              placeholder="Describe current mood, stress, overwhelm, etc..."
            />

          </div>



          <div className="modal-actions">

            <button type="submit">

              Run Capacity Check

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

export default CapacityModal;