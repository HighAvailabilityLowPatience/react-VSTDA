import './App.css'
import ListsTab from "./components/ListsTab";
import WeekendPlannerModal from "./components/WeekendPlannerModal";
import EventsTab from "./components/EventsTab";
import CapacityModal from "./components/CapacityModal";
import AgentReadout from "./components/AgentReadout";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Sidebar from "./components/Sidebar";
import { useState, useEffect } from "react";

//ENDPOINTS

const API = {
  todos: "http://localhost:3000/todos",
  events: "http://localhost:3000/events",
  lists: "http://localhost:3000/lists",
  capacityCheck: "http://localhost:3000/capacity-check",
  weekendPlanner: "http://localhost:3000/weekend-planner",
  taskCleanup: "http://localhost:3000/task-cleanup"
};

function App() {
    // ======================
  // STATE
  // ======================

  const [selectedItemId, setSelectedItemId] = useState(null);

  const [todos, setTodos] = useState([]);
  
  const [completionLog, setCompletionLog] = useState([]);
// Controls which main tab is currently visible
  const [activeTab, setActiveTab] = useState("todos");

// Controls visibility of capacity check popup
  const [showCapacityModal, setShowCapacityModal] = useState(false);

// Controls visibility of weekend planner popup
  const [showWeekendModal, setShowWeekendModal] = useState(false);

  //------------------
  //Initial Data Fetch handlers
const fetchTodos = async () => {

  const response = await fetch(API.todos);

  const data = await response.json();

  setTodos(data.todos);

};
const fetchEvents = async () => {

  const response = await fetch(API.events);

  const data = await response.json();

  setEvents(data.events);

};
const fetchLists = async () => {

  const response = await fetch(API.lists);

  const data = await response.json();

  setLists(data.lists);

};
useEffect(() => {

  fetchTodos();

  fetchEvents();

  fetchLists();

}, []);


  // ======================
  // Mutation HANDLERS
  // ======================
//takes item from form and creates new id and then pushes the new item(object) into todolist array
const addTodo = async (todoData) => {

  if (
    !todoData.task ||
    !todoData.estimatedTimeCost ||
    !todoData.dueDate
  ) {

    console.log("Missing required fields");

    return;

  }

  const response = await fetch(API.todos, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      action: "createTodo",
      payload: todoData
    })

  });

  const data = await response.json();

  setTodos(data.todos);

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
  const updateTodo = async (id, updatedData) => {

  const response = await fetch(API.todos, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      action: "updateTodo",
      payload: {
        id,
        changes: updatedData
      }
    })

  });

  const data = await response.json();

  setTodos(data.todos);

};
  //edits array object from True-False
  const toggleComplete = async (id) => {

  const targetTodo = todos.find((todo) => {

    return todo.id === id;

  });

  if (targetTodo && !targetTodo.completed) {

    setCompletionLog((currentLog) => {

      return [...currentLog, Date.now()];

    });

  }

  const response = await fetch(API.todos, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      action: "toggleComplete",
      payload: { id }
    })

  });

  const data = await response.json();

  setTodos(data.todos);

};
//Controls selectedItemId, determines Which TodoItem is currently open/expanded/editable
  const selectTodoItem = (id) => {
     console.log("Selecting Todo Item:", id);

  setSelectedItemId(id);
  };
  /*Handlers to add and where to pass them
        handleAddEvent>>>eEventstab.js
      handleUpdateEvent>>>Eventstab.js
      handleDeleteEvent>>>>Eventstab.js
      handleAddListItem>>>>Liststab.js
      handleUpdateListItem>>>>Liststab.js
      handleDeleteListItem>>>>Liststab.js
      handleCapacityCheck>>>>Capacitymodal.js
      handleWeekendPlanner>>>>Weekendplanner.js
      handleTaskCleanup>>>>Agent AgentReadout.js
      */

   // ========================================
// EVENTS
// ========================================

const handleAddEvent = async (eventData) => {

  const response = await fetch(API.events, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      action: "createEvent",
      payload: eventData
    })

  });

  const data = await response.json();

  setEvents(data.events);

};



const handleUpdateEvent = async (id, updatedData) => {

  const response = await fetch(API.events, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      action: "updateEvent",
      payload: {
        id,
        changes: updatedData
      }
    })

  });

  const data = await response.json();

  setEvents(data.events);

};



const handleDeleteEvent = async (id) => {

  const response = await fetch(API.events, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      action: "deleteEvent",
      payload: { id }
    })

  });

  const data = await response.json();

  setEvents(data.events);

};



// ========================================
// LISTS
// ========================================

const handleAddListItem = async (listType, value) => {

  const response = await fetch(API.lists, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      action: "addListItem",
      payload: {
        listType,
        value
      }
    })

  });

  const data = await response.json();

  setLists(data.lists);

};



const handleUpdateListItem = async (
  listType,
  id,
  updatedData
) => {

  const response = await fetch(API.lists, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      action: "updateListItem",
      payload: {
        listType,
        id,
        changes: updatedData
      }
    })

  });

  const data = await response.json();

  setLists(data.lists);

};



const handleDeleteListItem = async (
  listType,
  id
) => {

  const response = await fetch(API.lists, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      action: "deleteListItem",
      payload: {
        listType,
        id
      }
    })

  });

  const data = await response.json();

  setLists(data.lists);

};



// ========================================
// CAPACITY CHECK
// ========================================

const handleCapacityCheck = async (
  capacityData
) => {

  const response = await fetch(API.capacityCheck, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(capacityData)

  });

  const data = await response.json();

  setAgentReadout(data.response);

};



// ========================================
// WEEKEND PLANNER
// ========================================

const handleWeekendPlanner = async (
  plannerData
) => {

  const response = await fetch(API.weekendPlanner, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(plannerData)

  });

  const data = await response.json();

  setAgentReadout(data.response);

};



// ========================================
// TASK CLEANUP
// ========================================

const handleTaskCleanup = async () => {

  const response = await fetch(API.taskCleanup, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      todos
    })

  });

  const data = await response.json();

  setAgentReadout(data.response);

};   

  return (

  <div className="app-layout">

    {/* ======================================== */}
    {/* HEADER */}
    {/* ======================================== */}

    <header className="app-header">

      <h1>VSTDA</h1>

      <p>Visual Task Decision Assistant</p>

    </header>



    {/* ======================================== */}
    {/* TOP ACTION BAR */}
    {/* ======================================== */}

    <section className="top-action-bar">

      {/* TAB BUTTONS */}

      <button onClick={() => setActiveTab("todos")}>
        Tasks
      </button>

      <button onClick={() => setActiveTab("events")}>
        Events
      </button>

      <button onClick={() => setActiveTab("lists")}>
        Lists
      </button>



      {/* MODAL TRIGGERS */}

      <button onClick={() => setShowCapacityModal(true)}>
        Capacity Check
      </button>

      <button onClick={() => setShowWeekendModal(true)}>
        Plan Weekend
      </button>

    </section>



    {/* ======================================== */}
    {/* MAIN CONTENT AREA */}
    {/* ======================================== */}

    <section className="main-content-panel">

      {activeTab === "todos" && (

        <>

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

        </>

      )}



      {activeTab === "events" && (

        <section className="events-panel">

          <h2>Events</h2>

          <EventsTab />

        </section>

      )}



      {activeTab === "lists" && (

        <section className="lists-panel">

          <h2>Lists</h2>

          <ListsTab />

        </section>

      )}

    </section>



    {/* ======================================== */}
    {/* SIDEBAR */}
    {/* ======================================== */}

    <section className="sidebar-panel">

      <h2>Task Intelligence</h2>

      <Sidebar
        todos={todos}
        completionLog={completionLog}
      />



      {/* AGENT READOUT */}

      <AgentReadout />

    </section>



    {/* ======================================== */}
    {/* MODALS */}
    {/* ======================================== */}

    {showCapacityModal && (

      <CapacityModal
        onClose={() => setShowCapacityModal(false)}
      />

    )}



    {showWeekendModal && (

      <WeekendPlannerModal
        onClose={() => setShowWeekendModal(false)}
      />

    )}

  </div>

);
}
export default App
