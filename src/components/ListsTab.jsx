//list management UI
function ListsTab({ lists, handleAddListItem, handleUpdateListItem, handleDeleteListItem}) {
  const submitListForm = (e, listType) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = formData.get("value");
    handleAddListItem(listType, value);
    e.target.reset();

  };

return (

    <section className="lists-tab">

      <div className="lists-header">

        <h2>Lists</h2>

        <p>
          Manage reusable lifestyle and utility lists.
        </p>

      </div>



      {/* TARGET LIST */}

      <div className="list-group">

        <h3>Target</h3>

        <form
          className="list-form"
          onSubmit={(e) => {
            submitListForm(e, "target");
          }}
        >

          <input
            type="text"
            name="value"
            placeholder="Add target..."
          />

          <button type="submit">

            Add

          </button>

        </form>

        <div className="list-items">

          {lists.target?.length === 0 ? (

            <p>No target items added.</p>

          ) : (

            lists.target?.map((item) => {

              return (

                <div
                  key={item.id}
                  className="list-item-row"
                >

                  <span>{item.value}</span>

                  <button
                    onClick={() => {
                      handleDeleteListItem(
                        "target",
                        item.id
                      );
                    }}
                  >
                    X
                  </button>

                </div>

              );

            })

          )}

        </div>

      </div>



      {/* SUPPLEMENTS LIST */}

      <div className="list-group">

        <h3>Supplements</h3>

        <form
          className="list-form"
          onSubmit={(e) => {
            submitListForm(e, "supplements");
          }}
        >

          <input
            type="text"
            name="value"
            placeholder="Add supplement..."
          />

          <button type="submit">

            Add

          </button>

        </form>

        <div className="list-items">

          {lists.supplements?.length === 0 ? (

            <p>No supplements added.</p>

          ) : (

            lists.supplements?.map((item) => {

              return (

                <div
                  key={item.id}
                  className="list-item-row"
                >

                  <span>{item.value}</span>

                  <button
                    onClick={() => {
                      handleDeleteListItem(
                        "supplements",
                        item.id
                      );
                    }}
                  >
                    X
                  </button>

                </div>

              );

            })

          )}

        </div>

      </div>



      {/* GROCERIES LIST */}

      <div className="list-group">

        <h3>Groceries</h3>

        <form
          className="list-form"
          onSubmit={(e) => {
            submitListForm(e, "groceries");
          }}
        >

          <input
            type="text"
            name="value"
            placeholder="Add grocery item..."
          />

          <button type="submit">

            Add

          </button>

        </form>

        <div className="list-items">

          {lists.groceries?.length === 0 ? (

            <p>No grocery items added.</p>

          ) : (

            lists.groceries?.map((item) => {

              return (

                <div
                  key={item.id}
                  className="list-item-row"
                >

                  <span>{item.value}</span>

                  <button
                    onClick={() => {
                      handleDeleteListItem(
                        "groceries",
                        item.id
                      );
                    }}
                  >
                    X
                  </button>

                </div>

              );

            })

          )}

        </div>

      </div>

    </section>

  );

}

export default ListsTab;