//events UI

function EventsTab({events, handleAddEvent, handleUpdateEvent, handleDeleteEvent}) {
  const submitEventForm = (e) => {

  e.preventDefault();

  const formData = new FormData(e.target);

  const newEvent = {

    title: formData.get("title"),

    date: formData.get("date"),

    category: formData.get("category"),

    notes: formData.get("notes")

  };

  handleAddEvent(newEvent);

};
console.log(events)

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

      <form className="event-form" onSubmit={submitEventForm}>

        {/* EVENT TITLE */}

        <div className="form-group">

          <label>Event Title</label>

          <input
            type="text"
            name="title"
            placeholder="Concert, meetup, dinner, etc..."
          />

        </div>



        {/* LOCATION */}

        <div className="form-group">

          <label>Location</label>

          <input
            type="text"
            name="location"
            placeholder="Downtown Columbia"
          />

        </div>



        {/* DATE */}

        <div className="form-group">

          <label>Date</label>

          <input type="date" name="date" />

        </div>



        {/* CATEGORY */}

        <div className="form-group">

          <label>Category</label>

          <input
            type="text"
             name="category"
            placeholder="Social, Music, Outdoor..."
          />

        </div>
        {/* NOTES */}

          <div className="form-group">

          <label>Notes</label>

            <textarea
              name="notes"
              placeholder="Additional context..."
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

  {events.length === 0 ? (
    <p>No events added yet.</p>
  ) : (
    events.map((eventItem) => {
      return (
        <div
          key={eventItem.id}
          className="event-row"
        >
          <span>{eventItem.title}</span>
          <span>{eventItem.date}</span>
          <button
            onClick={() => {
              handleDeleteEvent(eventItem.id);
            }}
          >
            X
          </button>
        </div>

      );

    })

  )}

</div>
    </section>
  );
}


export default EventsTab;