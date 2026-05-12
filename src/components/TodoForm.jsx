function TodoForm({ addTodo }) {
  const submitTodo = (event) => {

    // stop browser refresh
    event.preventDefault();


    // collect all form inputs
    const formData = new FormData(event.target);


    // compile into object
    const todoData = Object.fromEntries(formData);

    console.log('Passing', todoData ,'to handler')
    // send payload upward
    addTodo(todoData);
      }
  return (
       <form onSubmit={submitTodo}>

      {/* =======================
          TASK
      ======================= */}

      <div>

        <label htmlFor="task">
          Task
        </label>

        <input
          type="text"
          id="task"
          name="task"
          placeholder="What needs to get done?"
          required
        />

      </div>


      {/* =======================
          PRIORITY
      ======================= */}

      <div>

        <label htmlFor="priority">
          Priority
        </label>

        <select
          id="priority"
          name="priority"
        >

          <option value="">
            Select Priority
          </option>

          <option value="Urgent + Important">
            Urgent + Important
          </option>

          <option value="Important, Not Urgent">
            Important, Not Urgent
          </option>

          <option value="Urgent, Not Important">
            Urgent, Not Important
          </option>

          <option value="Not Urgent, Not Important">
            Not Urgent, Not Important
          </option>

        </select>

      </div>


      {/* =======================
          ESTIMATED TIME COST
      ======================= */}

      <div>

        <label htmlFor="estimatedTimeCost">
          Estimated Time Cost (Minutes)
        </label>

        <input
          type="number"
          id="estimatedTimeCost"
          name="estimatedTimeCost"
          placeholder="30"
          required
        />

      </div>


      {/* =======================
          CATEGORY
      ======================= */}

      <div>

        <label htmlFor="category">
          Category
        </label>

        <input
          type="text"
          id="category"
          name="category"
          placeholder="Work, Health, Learning..."
        />

      </div>


      {/* =======================
          DUE DATE
      ======================= */}

      <div>

        <label htmlFor="dueDate">
          Due Date
        </label>

        <input
          type="date"
          id="dueDate"
          name="dueDate"
          required
        />

      </div>


      {/* =======================
          NOTES
      ======================= */}

      <div>

        <label htmlFor="notes">
          Notes
        </label>

        <textarea
          id="notes"
          name="notes"
          placeholder="Additional context..."
        />

      </div>


      {/* =======================
          SUBMIT
      ======================= */}

      <button type="submit">

        Add Todo

      </button>

    </form>

  );

}
export default TodoForm;
