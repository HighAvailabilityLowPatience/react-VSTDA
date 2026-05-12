import TodoItem from './TodoItem';
//receive array todos, forward state handlers requests made by the user, pass via map to TodoItem,
function TodoList({ 
                        todos,
                        updateTodo,
                        deleteTodo,
                        toggleComplete,
                        selectedItemId,
                        selectTodoItem }) 
      {


  return (
    <section>
       {todos.map((todo) => (
     <TodoItem
      key={todo.id}
      todo={todo}
      deleteTodo={deleteTodo}
      updateTodo={updateTodo}
      toggleComplete={toggleComplete}
      selectedItemId={selectedItemId}
      selectTodoItem={selectTodoItem}
    />
       ))}
    </section>
  );
}

export default TodoList;
