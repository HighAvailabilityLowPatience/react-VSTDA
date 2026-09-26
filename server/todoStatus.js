const TODO_STATUSES = ["incomplete", "started", "blocked", "completed"];

function validateTodoStatus(status) {
  if (!TODO_STATUSES.includes(status)) {
    throw new Error(`Invalid todo status: ${status}`);
  }
}

function normalizeTodo(todo) {
  const status = TODO_STATUSES.includes(todo.status)
    ? todo.status
    : todo.completed
      ? "completed"
      : "incomplete";

  return {
    ...todo,
    status,
    completed: status === "completed"
  };
}

function normalizeTodos(todos) {
  return todos.map(normalizeTodo);
}

export { TODO_STATUSES, normalizeTodo, normalizeTodos, validateTodoStatus };
