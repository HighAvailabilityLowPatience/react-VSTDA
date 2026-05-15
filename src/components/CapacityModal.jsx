//capacity form UI
function CapacityModal({ onClose }) {

  return (

    <div className="modal-overlay">

      <div className="capacity-modal">

        {/* ======================================== */}
        {/* HEADER */}
        {/* ======================================== */}

        <div className="modal-header">

          <h2>Capacity Check</h2>

          <button onClick={onClose}>
            X
          </button>

        </div>



        {/* ======================================== */}
        {/* FORM */}
        {/* ======================================== */}

        <form className="capacity-form">

          {/* AVAILABLE TIME */}

          <div className="form-group">

            <label>Available Time (Minutes)</label>

            <input
              type="number"
              placeholder="120"
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



          {/* FOCUS LEVEL */}

          <div className="form-group">

            <label>Focus Level (1-10)</label>

            <input
              type="number"
              min="1"
              max="10"
              placeholder="5"
            />

          </div>



          {/* EMOTIONAL CONTEXT */}

          <div className="form-group">

            <label>Emotional Context</label>

            <textarea
              placeholder="Describe current mood, stress, overwhelm, etc..."
            />

          </div>



          {/* ======================================== */}
          {/* ACTIONS */}
          {/* ======================================== */}

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