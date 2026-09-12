import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import loadJson from "./loadJson.js"; 
import saveJson from "./saveJson.js"; 
import loadPrompt from "./loadPrompt.js"; 
import buildPrompt from "./buildPrompt.js";
import callOpenRouter from "./callOpenRouter.js";
import {manageTodos,manageEvents,manageLists} from "./Manager.js";
import {addMessage} from "./chat.js";

// ========================================
// PATH SETUP
// ========================================

const __filename = fileURLToPath(
  import.meta.url
);

const __dirname = path.dirname(
  __filename
);

// ========================================
// SERVER-LEVEL LOCATION STATE
// ========================================

let storedLocation = null;

const LOCATION_MAX_AGE_MS =
  60 * 60 * 1000;


function getActiveLocation() {

  if (!storedLocation) {
    return null;
  }

  const capturedAt =
    new Date(storedLocation.capturedAt).getTime();

  const age =
    Date.now() - capturedAt;

  if (
    Number.isNaN(capturedAt) ||
    age > LOCATION_MAX_AGE_MS
  ) {

    storedLocation = null;

    return null;
  }

  return storedLocation;
}


const app = express();


// ======================
// MIDDLEWARE
// ======================

app.use(cors());

app.use(express.json());


// ======================
// HEALTH CHECK
// ======================

app.get("/health", (req, res) => {

  res.json({
    status: "online",
    service: "VSTDA Backend"
  });

});


// ========================================
// TODOS
// ========================================


// LOAD TODOS
app.get("/todos", async (req, res) => {

  try {

    const todos = await loadJson("todos.json");

    res.json({todos});

  } catch (err) {

    console.error("Failed to load todos:", err);

    res.status(500).json({
      error: "Failed to load todos"
    });

  }

});


// SAVE TODOS
app.put("/todos", async (req, res) => {

  try {

    const todos = req.body;

    await saveJson("todos.json", todos);

    res.json({
      success: true
    });

  } catch (err) {

    console.error("Failed to save todos:", err);

    res.status(500).json({
      error: "Failed to save todos"
    });

  }

});


// ========================================
// EVENTS
// ========================================


// LOAD EVENTS
app.get("/events", async (req, res) => {

  try {

    const events = await loadJson("events.json");

    res.json({events});

  } catch (err) {

    console.error("Failed to load events:", err);

    res.status(500).json({
      error: "Failed to load events"
    });

  }

});


// SAVE EVENTS
app.put("/events", async (req, res) => {

  try {

    const events = req.body;

    await saveJson("events.json", events);

    res.json({
      success: true
    });

  } catch (err) {

    console.error("Failed to save events:", err);

    res.status(500).json({
      error: "Failed to save events"
    });

  }

});


// ========================================
// LISTS
// ========================================


// LOAD LISTS
app.get("/lists", async (req, res) => {

  try {

    const lists = await loadJson("lists.json");

    res.json({lists});

  } catch (err) {

    console.error("Failed to load lists:", err);

    res.status(500).json({
      error: "Failed to load lists"
    });

  }

});


// SAVE LISTS
app.put("/lists", async (req, res) => {

  try {

    const lists = req.body;

    await saveJson("lists.json", lists);

    res.json({
      success: true
    });

  } catch (err) {

    console.error("Failed to save lists:", err);

    res.status(500).json({
      error: "Failed to save lists"
    });

  }

});


// ========================================
// CAPACITY CHECK AGENT
// ========================================

app.post("/capacity-check", async (req, res) => {

  try {

    const todos = await loadJson("todos.json");

    const promptTemplate = await loadPrompt("capacityCheck");

    const finalPrompt = buildPrompt(promptTemplate, {

      AVAILABLE_TIME: req.body.availableTime,

      ENERGY_LEVEL: req.body.energyLevel,

      FOCUS_LEVEL: req.body.focusLevel,

      EMOTIONAL_CONTEXT: req.body.emotionalContext,

      TODO_LIST: JSON.stringify(todos, null, 2)

    });

    const response = await callOpenRouter(finalPrompt);

    res.json(response);

  } catch (err) {

    console.error("Capacity check failed:", err);

    res.status(500).json({
      error: "Capacity check failed"
    });

  }

});


// ========================================
// TASK CLEANUP AGENT
// ========================================

app.post("/task-cleanup", async (req, res) => {

  try {

    const todos = await loadJson("todos.json");

    const promptTemplate = await loadPrompt("taskCleanup");

    const finalPrompt = buildPrompt(promptTemplate, {

      TODO_LIST: JSON.stringify(todos, null, 2)

    });

    const response = await callOpenRouter(finalPrompt);

    res.json(response);

  } catch (err) {

    console.error("Task cleanup failed:", err);

    res.status(500).json({
      error: "Task cleanup failed"
    });

  }

});


// ========================================
// WEEKEND PLANNER AGENT
// ========================================

app.post("/weekend-planner", async (req, res) => {

  try {

    const events = await loadJson("events.json");

    const promptTemplate = await loadPrompt("weekendPlanner");

    const finalPrompt = buildPrompt(promptTemplate, {

      MOOD: req.body.mood,

      ENERGY_LEVEL: req.body.energyLevel,

      SOCIAL_BATTERY: req.body.socialBattery,

      AVAILABLE_TIME: req.body.availableTime,

      USER_CONTEXT: req.body.userContext,

      CURRENT_LOCATION: req.body.currentLocation,

      EVENT_LIST: JSON.stringify(events, null, 2)

    });

    const response = await callOpenRouter(finalPrompt);

    res.json(response);

  } catch (err) {

    console.error("Weekend planner failed:", err);

    res.status(500).json({
      error: "Weekend planner failed"
    });

  }

});

// ========================================
// TODO MUTATION ROUTE
// ========================================

app.post("/todos", async (req, res) => {

  try {

    // ========================================
    // REQUEST DATA
    // ========================================

    const { action, payload } = req.body;

const updatedTodos = await manageTodos(
      action,
      payload
    );

    return res.json({
      success: true,
      todos: updatedTodos
    });

    // ========================================
    // VALIDATION
    // ========================================

    if (!action) {

      return res.status(400).json({

        success: false,

        error: "Missing action."

      });

    }

    // ========================================
    // ACTION DISPATCH
    // ========================================

    switch (action) {

      case "createTodo":

        console.log("Creating todo...");
        console.log(payload);

        break;



      case "updateTodo":

        console.log("Updating todo...");
        console.log(payload);

        break;



      case "deleteTodo":

        console.log("Deleting todo...");
        console.log(payload);

        break;



      case "toggleComplete":

        console.log("Toggling completion...");
        console.log(payload);

        break;



      default:

        return res.status(400).json({

          success: false,

          error: "Invalid todo action."

        });

    }



    // ========================================
    // SUCCESS RESPONSE
    // ========================================

    return res.status(200).json({

      success: true,

      message: "Todo action received."

    });

  }

  catch (error) {

    console.error("TODO ROUTE ERROR:", error);



    return res.status(500).json({

      success: false,

      error: "Internal server error."

    });

  }

});



// ========================================
// EVENTS MUTATION ROUTE
// ========================================

app.post("/events", async (req, res) => {

   try {

    // ========================================
    // REQUEST DATA
    // ========================================

    const { action, payload } = req.body;



    // ========================================
    // VALIDATION
    // ========================================

    if (!action) {

      return res.status(400).json({

        success: false,

        error: "Missing action."

      });

    }



    // ========================================
    // EVENT MANAGER
    // ========================================

    const updatedEvents = await manageEvents(
      action,
      payload
    );



    // ========================================
    // SUCCESS RESPONSE
    // ========================================

    return res.status(200).json({

      success: true,

      events: updatedEvents

    });

  }

  catch (error) {

    console.error(
      "EVENT ROUTE ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      error: "Internal server error."

    });

  }

});



// ========================================
// LISTS MUTATION ROUTE
// ========================================

app.post("/lists", async (req, res) => {

  try {

    // ========================================
    // REQUEST DATA
    // ========================================

    const { action, payload } = req.body;



    // ========================================
    // VALIDATION
    // ========================================

    if (!action) {

      return res.status(400).json({

        success: false,

        error: "Missing action."

      });

    }



    // ========================================
    // LIST MANAGER
    // ========================================

    const updatedLists = await manageLists(
      action,
      payload
    );



    // ========================================
    // SUCCESS RESPONSE
    // ========================================

    return res.status(200).json({

      success: true,

      lists: updatedLists

    });

  }

  catch (error) {

    console.error(
      "LIST ROUTE ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      error: "Internal server error."

    });

  }

});

// ========================================
// POST /CHAT
// ========================================

app.post("/chat", async (req, res) => {

    try {

      const {
        messages = [],
        location,
        promptName,
        variables = {}
      } = req.body;


      // ========================================
      // UPDATE LOCATION
      // ========================================

      if (location) {

        storedLocation = location;

      }


      const activeLocation =
        getActiveLocation();


      // ========================================
      // GET CURRENT USER MESSAGE
      // ========================================

      const latestUserMessage =
        [...messages]
          .reverse()
          .find(
            message =>
              message.role === "user"
          );


      if (!latestUserMessage) {

        return res
          .status(400)
          .json({
            success: false,
            error:
              "No user message provided"
          });

      }


      const userMessage =
        latestUserMessage.content;


      // ========================================
      // UPDATE CHAT HISTORY
      // ========================================

      addMessage(
        "user",
        userMessage
      );


      // ========================================
      // BUILD MODEL CONTEXT
      // ========================================

      const modelContext =
        await buildPrompt(
          promptName,
          variables,
          activeLocation,
          userMessage
        );


      // ========================================
      // CALL OPENROUTER
      // ========================================

      const result =
        await callOpenRouter(
          modelContext
        );


      // ========================================
      // UPDATE CHAT HISTORY
      // ========================================

      addMessage(
        "assistant",
        result.response
      );


      // ========================================
      // RETURN RESPONSE
      // ========================================

      return res
        .status(200)
        .json({

          success: true,

          response:
            result.response

        });


    } catch (err) {

      console.error(
        "Chat Route Error:",
        err
      );


      return res
        .status(500)
        .json({

          success: false,

          error:
            "Unable to process chat request"

        });

    }

  }
);
// ========================================
// STATIC FRONTEND 
// ========================================
app.use(
  express.static(
    path.join(__dirname, "../dist")
  )
);

// ========================================
// REACT FALLBACK 
// ========================================

app.get(/.*/, (req, res) => {

  res.sendFile(
    path.join(
      __dirname,
      "../dist/index.html"
    )
  );

});
// ========================================
// GLOBAL ERROR HANDLER 
// ========================================

app.use((err, req, res, next) => {

  console.error("Unhandled Server Error:", err);

  res.status(500).json({

    error: "Internal Server Error"

  });

});



export default app;