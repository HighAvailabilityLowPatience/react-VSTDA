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
  todos: "/todos",
  events: "/events",
  lists: "/lists",
  capacityCheck: "/capacity-check",
  weekendPlanner: "/weekend-planner",
  taskCleanup: "/task-cleanup"
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
//Events state
const [events, setEvents] = useState([]);
//Lists State
const [lists, setLists] = useState({});
//Agent Readout State
const [agentReadout, setAgentReadout] = useState("");
  //------------------
  //Initial Data Fetch handlers
const fetchTodos = async () => {

  const response = await fetch(API.todos);

  const data = await response.json();

  setTodos(data.todos);

};
const fetchEvents = async () => {
 console.log("FETCH EVENTS START");
  const response = await fetch(API.events);
console.log("EVENTS RESPONSE STATUS:", response.status);

  const data = await response.json();
// console.log("EVENTS DATA FROM BACKEND:", data);
//  console.log("IS EVENTS DATA ARRAY?", Array.isArray(data));
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
const deleteTodo = async (id) => {

  console.log(
    "Deleting Todo ID:",
    id
  );

  const response = await fetch(
    API.todos,
    {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        action: "deleteTodo",

        payload: {
          id
        }

      })

    }
  );

  const data = await response.json();

  setTodos(data.todos);



  // CLEAR SELECTED ITEM IF NEEDED

  if (selectedItemId === id) {

    setSelectedItemId(null);

  }

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
setShowCapacityModal(false);
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
  setShowWeekendModal(false);
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

  <div className="app-shell">

    {/* ======================================== */}
    {/* TOP NAVIGATION */}
    {/* ======================================== */}

    <header className="top-nav">

      <div className="brand-section">

        <h1>VSTDA</h1>

        <p>Visual Task Decision Assistant</p>

      </div>



      <div className="nav-actions">

        {/* TAB BUTTONS */}

        <button
          onClick={() => setActiveTab("todos")}
        >
          Tasks
        </button>

        <button
          onClick={() => setActiveTab("events")}
        >
          Events
        </button>

        <button
          onClick={() => setActiveTab("lists")}
        >
          Lists
        </button>

        <button
          onClick={handleTaskCleanup}
        >
        Clean Tasks
        </button>



        {/* AI TOOLS */}

        <button
          onClick={() => setShowCapacityModal(true)}
        >
          Capacity Check
        </button>

        <button
          onClick={() => setShowWeekendModal(true)}
        >
          Plan Weekend
        </button>

      </div>

    </header>



    {/* ======================================== */}
    {/* MAIN APP LAYOUT */}
    {/* ======================================== */}

    <div className="app-body">



      {/* ======================================== */}
      {/* LEFT SIDEBAR */}
      {/* ======================================== */}

      <aside className="left-sidebar">

        {/* AGENT READOUT */}

        <section className="agent-panel">

          <h2>Agent Readout</h2>

          <AgentReadout agentReadout={agentReadout} />

        </section>



        {/* METRICS */}

        <section className="metrics-panel">

          <h2>Task Intelligence</h2>

          <Sidebar
            todos={todos}
            completionLog={completionLog}
          />

        </section>

      </aside>



      {/* ======================================== */}
      {/* MAIN CONTENT */}
      {/* ======================================== */}

      <main className="main-panel">

        {activeTab === "todos" && (

          <div className="todos-layout">

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

          </div>

        )}



        {activeTab === "events" && (

          <section className="events-panel">

            <EventsTab
              events={events}
              handleAddEvent={handleAddEvent}
              handleUpdateEvent={handleUpdateEvent}
              handleDeleteEvent={handleDeleteEvent}
            />

          </section>

        )}



        {activeTab === "lists" && (

          <section className="lists-panel">

            <ListsTab
              lists={lists}
              handleAddListItem={handleAddListItem}
              handleUpdateListItem={handleUpdateListItem}
              handleDeleteListItem={handleDeleteListItem}
            />

          </section>

        )}

      </main>

    </div>



    {/* ======================================== */}
    {/* MODALS */}
    {/* ======================================== */}

    {showCapacityModal && (

      <CapacityModal
        handleCapacityCheck={handleCapacityCheck}
        onClose={() => setShowCapacityModal(false)}
      />

    )}



    {showWeekendModal && (

      <WeekendPlannerModal
        handleWeekendPlanner={handleWeekendPlanner}
        onClose={() => setShowWeekendModal(false)}
      />

    )}

  </div>

);
}
export default App
