import { useEffect, useState } from "react";

const STATUS_LABELS = {
  incomplete: "Incomplete",
  started: "Started",
  blocked: "Blocked",
  completed: "Completed"
};

function TodoItem({
  todo,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
  selectedItemId,
  selectTodoItem
}) {
  const [draftTodo, setDraftTodo] = useState(todo);
  const [saveState, setSaveState] = useState("saved");
  const isSelected = selectedItemId === todo.id;
  const status = todo.status || (todo.completed ? "completed" : "incomplete");
  const priorityClass = todo.priority
    ? `priority-${todo.priority
        .toLowerCase()
        .replaceAll("+", "and")
        .replaceAll(",", "")
        .replaceAll(" ", "-")}`
    : "priority-none";

  useEffect(() => {
    setDraftTodo(todo);
  }, [todo]);

  const setDraftField = (field, value) => {
    setDraftTodo((current) => ({ ...current, [field]: value }));
    setSaveState("unsaved");
  };

  const saveField = async (field, value = draftTodo[field]) => {
    if (value === todo[field]) {
      setSaveState("saved");
      return;
    }

    setSaveState("saving");

    try {
      await updateTodo(todo.id, { [field]: value });
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  };

  const changeStatus = async (nextStatus) => {
    setSaveState("saving");

    try {
      await updateTodoStatus(todo.id, nextStatus);
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  };

  return (
    <article className={`todo-item ${priorityClass} status-${status} ${status === "completed" ? "completed" : ""}`}>
      <div className="todo-summary">
        <div className="todo-heading-row">
          <h3 onClick={() => selectTodoItem(todo.id)}>{todo.task}</h3>
          <span className={`todo-status-badge status-${status}`}>
            {STATUS_LABELS[status]}
          </span>
        </div>

        <p className="todo-priority">{todo.priority || "No Priority"}</p>

        <div className="todo-meta">
          <span>{todo.estimatedTimeCost} min</span>
          <span>{todo.dueDate}</span>
        </div>

        <label className="todo-status-control">
          <span>Status</span>
          <select value={status} onChange={(event) => changeStatus(event.target.value)}>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
      </div>

      {isSelected && (
        <div className="todo-details">
          <div className="todo-save-state" aria-live="polite">
            {saveState === "saving" && "Saving..."}
            {saveState === "unsaved" && "Unsaved changes"}
            {saveState === "error" && "Save failed"}
            {saveState === "saved" && "Saved"}
          </div>

          <div className="todo-edit-grid">
            <label>Priority:</label>
            <select
              value={draftTodo.priority || ""}
              onChange={(event) => {
                const value = event.target.value;
                setDraftField("priority", value);
                saveField("priority", value);
              }}
            >
              <option value="">None</option>
              <option value="Urgent + Important">Urgent + Important</option>
              <option value="Important, Not Urgent">Important, Not Urgent</option>
              <option value="Urgent, Not Important">Urgent, Not Important</option>
              <option value="Not Urgent, Not Important">Not Urgent, Not Important</option>
            </select>
          </div>

          <div className="todo-edit-grid">
            <label>Estimated Time:</label>
            <input
              type="number"
              value={draftTodo.estimatedTimeCost}
              onChange={(event) => setDraftField("estimatedTimeCost", event.target.value)}
              onBlur={() => saveField("estimatedTimeCost", Number(draftTodo.estimatedTimeCost))}
            />
          </div>

          <div className="todo-edit-grid">
            <label>Category:</label>
            <input
              type="text"
              value={draftTodo.category || ""}
              placeholder="Category"
              onChange={(event) => setDraftField("category", event.target.value)}
              onBlur={() => saveField("category")}
            />
          </div>

          <div className="todo-edit-grid">
            <label>Due Date:</label>
            <input
              type="date"
              value={draftTodo.dueDate || ""}
              onChange={(event) => setDraftField("dueDate", event.target.value)}
              onBlur={() => saveField("dueDate")}
            />
          </div>

          <div className="todo-notes">
            <h3>Notes</h3>
            <textarea
              value={draftTodo.notes || ""}
              placeholder="Add notes..."
              onChange={(event) => setDraftField("notes", event.target.value)}
              onBlur={() => saveField("notes")}
            />
          </div>

          <button className="danger-button" onClick={() => deleteTodo(todo.id)}>
            Delete
          </button>
        </div>
      )}
    </article>
  );
}

export default TodoItem;
