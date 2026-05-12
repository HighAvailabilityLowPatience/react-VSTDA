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
      .replaceAll(" + ", "-and-")
      .replaceAll(", ", "-")
      .replaceAll(" ", "-")}`
  : "priority-none";
console.log(todo.priority, priorityClass);
  return (
    

  <article className={`todo-item ${priorityClass}`}>

    {/* =======================
        COLLAPSED SUMMARY VIEW
    ======================= */}

    <div>

      <h2 onClick={() => selectTodoItem(todo.id)}>
        {todo.task}
      </h2>

      <p>
        {todo.priority || "No Priority"}
      </p>

      <p>
        ⏱ {todo.estimatedTimeCost} Minutes
      </p>

      <p>
        📅 {todo.dueDate}
      </p>

      <button
        onClick={() => toggleComplete(todo.id)}
      >

        {todo.completed ? "✅ Completed" : "⬜ Incomplete"}

      </button>

    </div>


    {/* =======================
        EXPANDED DETAIL VIEW
    ======================= */}

    {isSelected && (

      <div>

        {/* =======================
            PRIORITY
        ======================= */}

        <div>

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

        <div>

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

        <div>

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

        <div>

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

        <div>

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
          onClick={() => deleteTodo(todo.id)}
        >

          🗑 Delete

        </button>

      </div>

    )}

  </article>

);
}
export default TodoItem;
