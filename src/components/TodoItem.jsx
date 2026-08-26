function TodoItem({
  todo,
  updateTodo,
  deleteTodo,
  toggleComplete,
  selectedItemId,
  selectTodoItem
}) {

  // =======================
  // DERIVED UI STATE
  // =======================

  const isSelected = selectedItemId === todo.id;
  //Class creation to make it easy and clean to style todo items with the proper colors
  const priorityClass = todo.priority
  ? `priority-${todo.priority
      .toLowerCase()
      .replaceAll("+", "and")
      .replaceAll(",", "")
      .replaceAll(" ", "-")}`
  : "priority-none";
console.log(todo.priority, priorityClass);
  return (
    

  <article className={`todo-item ${priorityClass} ${todo.completed ? "completed" : ""}`}>

    {/* =======================
        COLLAPSED SUMMARY VIEW
    ======================= */}

    <div className="todo-summary">

      <h3 onClick={() => selectTodoItem(todo.id)}>
        {todo.task}
      </h3>

      <p className="todo-priority">
        {todo.priority || "No Priority"}
      </p>

      <div className="todo-meta">
        <span>{todo.estimatedTimeCost} min</span>
        <span>{todo.dueDate}</span>
      </div>

      <button
        className="todo-complete-button"
        onClick={() => toggleComplete(todo.id)}
      >

        {todo.completed ? "Completed" : "Incomplete"}

      </button>

    </div>


    {/* =======================
        EXPANDED DETAIL VIEW
    ======================= */}

    {isSelected && (

      <div className="todo-details">

        {/* =======================
            PRIORITY
        ======================= */}

        <div className="todo-edit-grid">

          <label>Priority:</label>

          <select
            value={todo.priority}
            onChange={(event) =>
              updateTodo(todo.id, {
                priority: event.target.value
              })
            }
          >

            <option value="">
              None
            </option>

            <option value="Urgent + Important">
              Urgent + Important
            </option>

            <option value="Important, Not Urgent">
              Important, Not Urent
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
            ESTIMATED TIME
        ======================= */}

        <div className="todo-edit-grid">

          <label>Estimated Time:</label>

          <input
            type="number"
            value={todo.estimatedTimeCost}
            onChange={(event) =>
              updateTodo(todo.id, {
                estimatedTimeCost: Number(event.target.value)
              })
            }
          />

        </div>


        {/* =======================
            CATEGORY
        ======================= */}

        <div className="todo-edit-grid">

          <label>Category:</label>

          <input
            type="text"
            value={todo.category}
            placeholder="Category"
            onChange={(event) =>
              updateTodo(todo.id, {
                category: event.target.value
              })
            }
          />

        </div>


        {/* =======================
            DUE DATE
        ======================= */}

        <div className="todo-edit-grid">

          <label>Due Date:</label>

          <input
            type="date"
            value={todo.dueDate}
            onChange={(event) =>
              updateTodo(todo.id, {
                dueDate: event.target.value
              })
            }
          />

        </div>


        {/* =======================
            NOTES
        ======================= */}

        <div className="todo-notes">

          <h3>Notes</h3>

          <textarea
            value={todo.notes}
            placeholder="Add notes..."
            onChange={(event) =>
              updateTodo(todo.id, {
                notes: event.target.value
              })
            }
          />

        </div>


        {/* =======================
            DELETE
        ======================= */}

        <button
          className="danger-button"
          onClick={() => deleteTodo(todo.id)}
        >

          Delete

        </button>

      </div>

    )}

  </article>

);
}
export default TodoItem;
