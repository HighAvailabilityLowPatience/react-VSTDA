import express from "express";
import cors from "cors";

import loadJson from "./loadJson.js"; //done
import saveJson from "./saveJson.js"; //done
import loadPrompt from "./loadPrompt.js"; //done
import buildPrompt from "./buildPrompt.js";//done
import callOpenRouter from "./callOpenRouter.js";//done
import {manageTodos,manageEvents,manageLists} from "./Manager.js";


const app = express();


// ======================
// MIDDLEWARE
// ======================

app.use(cors());

app.use(express.json());


// ======================
// HEALTH CHECK
// ======================

app.get("/", (req, res) => {

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
    // ACTION DISPATCH
    // ========================================

    switch (action) {

      case "createEvent":

        console.log("Creating event...");
        console.log(payload);

        break;



      case "updateEvent":

        console.log("Updating event...");
        console.log(payload);

        break;



      case "deleteEvent":

        console.log("Deleting event...");
        console.log(payload);

        break;



      default:

        return res.status(400).json({

          success: false,

          error: "Invalid event action."

        });

    }



    // ========================================
    // SUCCESS RESPONSE
    // ========================================

    return res.status(200).json({

      success: true,

      message: "Event action received."

    });

  }

  catch (error) {

    console.error("EVENT ROUTE ERROR:", error);



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
    // ACTION DISPATCH
    // ========================================

    switch (action) {

      case "addListItem":

        console.log("Adding list item...");
        console.log(payload);

        break;



      case "updateListItem":

        console.log("Updating list item...");
        console.log(payload);

        break;



      case "deleteListItem":

        console.log("Deleting list item...");
        console.log(payload);

        break;



      default:

        return res.status(400).json({

          success: false,

          error: "Invalid list action."

        });

    }



    // ========================================
    // SUCCESS RESPONSE
    // ========================================

    return res.status(200).json({

      success: true,

      message: "List action received."

    });

  }

  catch (error) {

    console.error("LIST ROUTE ERROR:", error);



    return res.status(500).json({

      success: false,

      error: "Internal server error."

    });

  }

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