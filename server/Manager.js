//Actual mutation behavior
import saveJson from "./saveJson.js";
import loadJson from "./loadJson.js";

// Generates 500 IDs when server starts

const todoIdBank = [];



// ========================================
// GENERATE TODO IDS
// ========================================

// Fills todoIdBank with UUIDs
// Runs once during server startup

function generateTodoIds() {

  console.log("Generating todo ID bank...");



  // Future:
  // Loop 500 times
  // Generate UUIDs
  // Push IDs into todoIdBank

}



// ========================================
// TODO MANAGER
// ========================================

// Handles:
// - createTodo
// - updateTodo
// - deleteTodo
// - toggleComplete

async function manageTodos(action, payload) {

  console.log("TODO MANAGER");

  console.log(action);

  console.log(payload);



  // Future:
  // Load todos JSON
  // Dispatch action
  // Mutate immutably
  // Save updated JSON
  // Return updated todos

}



// ========================================
// EVENT MANAGER
// ========================================

// Handles:
// - createEvent
// - updateEvent
// - deleteEvent

async function manageEvents(action, payload) {

  console.log("EVENT MANAGER");

  console.log(action);

  console.log(payload);



  // Future:
  // Load events JSON
  // Dispatch action
  // Mutate immutably
  // Save updated JSON
  // Return updated events

}



// ========================================
// LIST MANAGER
// ========================================

// Handles:
// - addListItem
// - updateListItem
// - deleteListItem

async function manageLists(action, payload) {

  console.log("LIST MANAGER");

  console.log(action);

  console.log(payload);



  // Future:
  // Load lists JSON
  // Dispatch action
  // Mutate immutably
  // Save updated JSON
  // Return updated lists

}



// ========================================
// EXPORTS
// ========================================

export {

  generateTodoIds,

  manageTodos,

  manageEvents,

  manageLists

};
```
