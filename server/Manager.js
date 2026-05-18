//Actual mutation behavior
import saveJson from "./saveJson.js";
import loadJson from "./loadJson.js";

// Generates 500 IDs when server starts for Events, Todos, and Lists
const todoIdBank = Array.from({ length: 500 }, (_, i) => i);
console.log("TODO IDs:", todoIdBank.slice(0, 10));
const eventIdBank = Array.from({ length: 500 }, (_, i) => `event-${i}`);
console.log("EVENT IDs:", eventIdBank.slice(0, 10));
const listIdBank = Array.from({ length: 500 }, (_, i) => `list-${i}`);
console.log("LIST IDs:", listIdBank.slice(0, 10));

function nextTodoId() {
  if (todoIdBank.length === 0) throw new Error("No TODO IDs available");
  return todoIdBank.shift();
}

function nextEventId() {
  if (eventIdBank.length === 0) throw new Error("No EVENT IDs available");
  return eventIdBank.shift();
}

function nextListId() {
  if (listIdBank.length === 0) throw new Error("No LIST IDs available");
  return listIdBank.shift();
}



async function manageTodos(action, payload) {

    console.log("TODO MANAGER");

    console.log(action);

    console.log(payload);

  const todos = await loadJson("todos.json");

  let updatedTodos = todos;

  switch (action) {

    case "createTodo": {

      const newTodo = {
        id: nextTodoId(),
        task: payload.task,
        priority: payload.priority || "",
        estimatedTimeCost: Number(payload.estimatedTimeCost) || 0,
        category: payload.category || "",
        completed: false,
        dueDate: payload.dueDate || "",
        notes: payload.notes || ""
      };

      updatedTodos = [...todos, newTodo];

      break;

    }

    case "updateTodo": {

      updatedTodos = todos.map((todo) => {

        if (todo.id !== payload.id) {

          return todo;

        }

        return {
          ...todo,
          ...payload.changes
        };

      });

      break;

    }

    case "deleteTodo": {
  // FIND TODO TO DELETE
  const deletedTodo = todos.find((todo) => {
    return todo.id === payload.id;
    });
  // RETURN ID TO BANK
  if (deletedTodo) {
    todoIdBank.push(deletedTodo.id);
  }
  // REMOVE TODO
  updatedTodos = todos.filter((todo) => {
    return todo.id !== payload.id;
  });
      break;
    }

    case "toggleComplete": {
      updatedTodos = todos.map((todo) => {
        if (todo.id !== payload.id) {
          return todo;
        }
        return {
          ...todo,
          completed: !todo.completed
        };

      });

      break;

    }

    default: {
      throw new Error(`Invalid todo action: ${action}`);
    }
  }

  await saveJson("todos.json", updatedTodos);

  return updatedTodos;

}

async function manageEvents(action, payload) {

  console.log("EVENT MANAGER");
  console.log(action);
  console.log(payload);

  const events = await loadJson("events.json");

  let updatedEvents = events;

  switch (action) {

    case "createEvent": {

      const newEvent = {
        id: nextEventId(),
        title: payload.title || "",
        location: payload.location || "",
        category: payload.category || "",
        date: payload.date || "",
        notes: payload.notes || ""
      };

      updatedEvents = [...events, newEvent];

      break;
    }

    case "updateEvent": {

      updatedEvents = events.map((event) => {

        if (event.id !== payload.id) {
          return event;
        }

        return {
          ...event,
          ...payload.changes
        };

      });

      break;
    }

    case "deleteEvent": {

      const deletedEvent = events.find((event) => {
        return event.id === payload.id;
      });

      if (deletedEvent) {
        eventIdBank.push(deletedEvent.id);
      }

      updatedEvents = events.filter((event) => {
        return event.id !== payload.id;
      });

      break;
    }

    default: {
      throw new Error(`Invalid event action: ${action}`);
    }

  }

  await saveJson("events.json", updatedEvents);

  return updatedEvents;
}



async function manageLists(action, payload) {

  console.log("LIST MANAGER");
  console.log(action);
  console.log(payload);

  const lists = await loadJson("lists.json");

  const targetList = lists[payload.listType];

  if (!targetList) {
    throw new Error(`Invalid list type: ${payload.listType}`);
  }

  let updatedLists = lists;

  switch (action) {

    case "addListItem": {

      const newItem = {
        id: nextListId(),
        value: payload.value || ""
      };

      updatedLists = {
        ...lists,
        [payload.listType]: [
          ...targetList,
          newItem
        ]
      };

      break;
    }

    case "updateListItem": {

      const updatedTargetList = targetList.map((item) => {

        if (item.id !== payload.id) {
          return item;
        }

        return {
          ...item,
          ...payload.changes
        };

      });

      updatedLists = {
        ...lists,
        [payload.listType]: updatedTargetList
      };

      break;
    }

    case "deleteListItem": {

      const deletedItem = targetList.find((item) => {
        return item.id === payload.id;
      });

      if (deletedItem) {
        listIdBank.push(deletedItem.id);
      }

      const filteredTargetList = targetList.filter((item) => {
        return item.id !== payload.id;
      });

      updatedLists = {
        ...lists,
        [payload.listType]: filteredTargetList
      };

      break;
    }

    default: {
      throw new Error(`Invalid list action: ${action}`);
    }

  }

  await saveJson("lists.json", updatedLists);

  return updatedLists;
}



export {
  manageTodos,
  manageEvents,
  manageLists
};
