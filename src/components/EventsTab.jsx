//events UI

function EventsTab() {

  return (

    <section className="events-tab">

      {/* ======================================== */}
      {/* HEADER */}
      {/* ======================================== */}

      <div className="events-header">

        <h2>Events</h2>

        <p>
          Manage upcoming events and activities.
        </p>

      </div>



      {/* ======================================== */}
      {/* ADD EVENT FORM */}
      {/* ======================================== */}

      <form className="event-form">

        {/* EVENT TITLE */}

        <div className="form-group">

          <label>Event Title</label>

          <input
            type="text"
            placeholder="Concert, meetup, dinner, etc..."
          />

        </div>



        {/* LOCATION */}

        <div className="form-group">

          <label>Location</label>

          <input
            type="text"
            placeholder="Downtown Columbia"
          />

        </div>



        {/* DATE */}

        <div className="form-group">

          <label>Date</label>

          <input type="date" />

        </div>



        {/* CATEGORY */}

        <div className="form-group">

          <label>Category</label>

          <input
            type="text"
            placeholder="Social, Music, Outdoor..."
          />

        </div>



        {/* ACTIONS */}

        <div className="event-form-actions">

          <button type="submit">

            Add Event

          </button>

        </div>

      </form>



      {/* ======================================== */}
      {/* EVENT LIST */}
      {/* ======================================== */}

      <div className="events-list">

        <p>No events added yet.</p>

      </div>

    </section>

  );

}


export default EventsTab;