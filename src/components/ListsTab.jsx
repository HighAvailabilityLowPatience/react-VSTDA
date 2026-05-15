//list management UI
function ListsTab() {

  return (

    <section className="lists-tab">

      {/* ======================================== */}
      {/* HEADER */}
      {/* ======================================== */}

      <div className="lists-header">

        <h2>Lists</h2>

        <p>
          Manage reusable lifestyle and utility lists.
        </p>

      </div>



      {/* ======================================== */}
      {/* TARGET LIST */}
      {/* ======================================== */}

      <div className="list-group">

        <h3>Target</h3>

        {/* ADD ITEM */}

        <form className="list-form">

          <input
            type="text"
            placeholder="Add target..."
          />

          <button type="submit">

            Add

          </button>

        </form>



        {/* LIST DISPLAY */}

        <div className="list-items">

          <p>No targets added.</p>

        </div>

      </div>



      {/* ======================================== */}
      {/* SUPPLEMENTS LIST */}
      {/* ======================================== */}

      <div className="list-group">

        <h3>Supplements</h3>

        {/* ADD ITEM */}

        <form className="list-form">

          <input
            type="text"
            placeholder="Add supplement..."
          />

          <button type="submit">

            Add

          </button>

        </form>



        {/* LIST DISPLAY */}

        <div className="list-items">

          <p>No supplements added.</p>

        </div>

      </div>



      {/* ======================================== */}
      {/* GROCERIES LIST */}
      {/* ======================================== */}

      <div className="list-group">

        <h3>Groceries</h3>

        {/* ADD ITEM */}

        <form className="list-form">

          <input
            type="text"
            placeholder="Add grocery item..."
          />

          <button type="submit">

            Add

          </button>

        </form>



        {/* LIST DISPLAY */}

        <div className="list-items">

          <p>No grocery items added.</p>

        </div>

      </div>

    </section>

  );

}


export default ListsTab;