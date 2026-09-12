/*
========================================
LOADSYSTEMSTATE.JS
========================================

PURPOSE:
Load current application state for model context.

RESPONSIBILITIES:
- Load todos
- Load lists
- Load events
- Combine all application state
- Return one systemState object

THIS FILE SHOULD NOT:
- build prompts
- call OpenRouter
- handle chat history
- contain route logic
*/

import fs from "fs/promises";
import path from "path";


// ========================================
// LOAD SYSTEM STATE
// ========================================

async function loadSystemState() {

  // ========================================
  // FILE PATHS
  // ========================================

  const todosPath = path.join(
    "server",
    "data",
    "todos.json"
  );

  const listsPath = path.join(
    "server",
    "data",
    "lists.json"
  );

  const eventsPath = path.join(
    "server",
    "data",
    "events.json"
  );


  // ========================================
  // LOAD ALL SYSTEM DATA
  // ========================================

  const [
    todosData,
    listsData,
    eventsData
  ] = await Promise.all([

    fs.readFile(
      todosPath,
      "utf-8"
    ),

    fs.readFile(
      listsPath,
      "utf-8"
    ),

    fs.readFile(
      eventsPath,
      "utf-8"
    )

  ]);


  // ========================================
  // PARSE SYSTEM DATA
  // ========================================

  const todos =
    JSON.parse(todosData);

  const lists =
    JSON.parse(listsData);

  const events =
    JSON.parse(eventsData);


  // ========================================
  // BUILD SYSTEM STATE
  // ========================================

  const systemState = {

    todos,

    lists,

    events

  };


  // ========================================
  // LOG
  // ========================================

  console.log(
    "System state loaded successfully"
  );


  // ========================================
  // RETURN SYSTEM STATE
  // ========================================

  return systemState;

}


// ========================================
// EXPORTS
// ========================================

export default loadSystemState;