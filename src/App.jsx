import './App.css'
import { nextId, recycleId } from "./components/idBank";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

function App() {
    // ======================
  // STATE
  // ======================

  const [selectedItemId, setSelectedItemId] = useState(null);

  const [todos, setTodos] = useState([]);
  
  const [completionLog, setCompletionLog] = useState([]);

  // ======================
  // HANDLERS
  // ======================
//takes item from form and creates new id and then pushes the new item(object) into todolist array
const addTodo = (todoData) => {

  console.log('Creating/Validating new to do Item', todoData);

  const newTodo = {

    id: nextId(),

    task: todoData.task,

    priority: todoData.priority || "",

    estimatedTimeCost: Number(todoData.estimatedTimeCost),

    category: todoData.category || "",

    completed: false,

    dueDate: todoData.dueDate,

    notes: todoData.notes || ""

  };
  // VALIDATION
  if (
    !todoData.task ||
    !todoData.estimatedTimeCost ||
    !todoData.dueDate
  ) {

    console.log("Missing required fields");

    return;
  }


  console.log("Creating Todo:", newTodo);


  setTodos((currentTodos) => {

    const updatedTodos = [...currentTodos, newTodo];

    console.log("Updated Todos:", updatedTodos);

    return updatedTodos;

  });

  };
//remove item from array and then return id to the bank
  const deleteTodo = (id) => {
console.log("Deleting Todo ID:", id);


  // RETURN ID TO BANK
  recycleId(id);


  // CLEAR SELECTED ITEM IF NEEDED
  if (selectedItemId === id) {

    setSelectedItemId(null);

  }


  // REMOVE TODO FROM ARRAY AND RETURN A NEW ARRAY
  setTodos((currentTodos) => {

    const updatedTodos = currentTodos.filter((todo) => {

      return todo.id !== id;

    });

    console.log("Updated Todos:", updatedTodos);

    return updatedTodos;

  });

  };
//edit the selected item
  const updateTodo = (id,updatedData) => {
    console.log("Updating Todo:", id);
    console.log("Updated Data:", updatedData);
  setTodos((currentTodos) => {

     const updatedTodos = currentTodos.map((todo) => {

      // NOT THE TARGET
      if (todo.id !== id) {

        return todo;

      }


      // TARGET FOUND
      return {

        ...todo,

        ...updatedData

      };

    });


    console.log("Updated Todos:", updatedTodos);

    return updatedTodos;

  });

  };
  //edits array object from True-False
  const toggleComplete = (id) => {
console.log("Toggling Complete:", id);


   setTodos((currentTodos) => {

    const updatedTodos = currentTodos.map((todo) => {

      // NOT TARGET
      if (todo.id !== id) {

        return todo;

      }


      // TARGET FOUND

      // ONLY LOG NEW COMPLETIONS
      if (!todo.completed) {

        setCompletionLog((currentLog) => {

          return [...currentLog, Date.now()];

        });

      }


      return {

        ...todo,

        completed: !todo.completed

      };

    });

    return updatedTodos;

  });

  };
//Controls selectedItemId, determines Which TodoItem is currently open/expanded/editable
  const selectTodoItem = (id) => {
     console.log("Selecting Todo Item:", id);

  setSelectedItemId(id);
  };
  
  return (
    <div className="app-layout">

    <header  className="app-header">
      <h1>VSTDA</h1>
      <p>Visual Task Decision Assistant</p>
    </header>

    <section className="todo-form-panel">
      <h2>Create Task</h2>
      <TodoForm addTodo={addTodo} />
    </section>

    <section className="todo-list-panel">
      <h2>Task List</h2>
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        toggleComplete={toggleComplete}
        selectedItemId={selectedItemId}
        selectTodoItem={selectTodoItem}
      />
    </section>

    <section className="sidebar-panel">
      <h2>Task Intelligence</h2>
      <Sidebar
        todos={todos}
        completionLog={completionLog}
      />
    </section>

  </div>
);
}
export default App
