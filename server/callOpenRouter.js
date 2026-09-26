import config from "./config.js";
import { manageAction } from "./Manager.js";
import { TODO_STATUSES } from "./todoStatus.js";

const todoProperties = {
  task: { type: "string" },
  priority: { type: "string" },
  estimatedTimeCost: { type: "number" },
  category: { type: "string" },
  status: { type: "string", enum: TODO_STATUSES },
  dueDate: { type: "string" },
  notes: { type: "string" }
};

const tools = [
  {
    type: "function",
    function: {
      name: "createTodo",
      description: "Create a todo item.",
      parameters: {
        type: "object",
        properties: todoProperties,
        required: ["task", "estimatedTimeCost", "category"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "updateTodo",
      description: "Update fields on an existing todo item.",
      parameters: {
        type: "object",
        properties: {
          id: { type: "number" },
          changes: { type: "object", properties: todoProperties, additionalProperties: false }
        },
        required: ["id", "changes"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "setTodoStatus",
      description: "Set a todo status to incomplete, started, blocked, or completed.",
      parameters: {
        type: "object",
        properties: {
          id: { type: "number" },
          status: { type: "string", enum: TODO_STATUSES }
        },
        required: ["id", "status"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "deleteTodo",
      description: "Delete an existing todo item.",
      parameters: {
        type: "object",
        properties: { id: { type: "number" } },
        required: ["id"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "createEvent",
      description: "Create an event.",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string" },
          location: { type: "string" },
          category: { type: "string" },
          date: { type: "string" },
          notes: { type: "string" }
        },
        required: ["title"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "updateEvent",
      description: "Update fields on an existing event.",
      parameters: {
        type: "object",
        properties: {
          id: { type: "number" },
          changes: { type: "object", additionalProperties: true }
        },
        required: ["id", "changes"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "deleteEvent",
      description: "Delete an existing event.",
      parameters: {
        type: "object",
        properties: { id: { type: "number" } },
        required: ["id"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "addListItem",
      description: "Add an item to an existing list.",
      parameters: {
        type: "object",
        properties: {
          listType: { type: "string", description: "Use an exact list key from application state." },
          value: { type: "string" }
        },
        required: ["listType", "value"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "updateListItem",
      description: "Update an existing list item.",
      parameters: {
        type: "object",
        properties: {
          listType: { type: "string" },
          id: { type: "number" },
          changes: {
            type: "object",
            properties: { value: { type: "string" } },
            additionalProperties: false
          }
        },
        required: ["listType", "id", "changes"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "deleteListItem",
      description: "Delete an existing list item.",
      parameters: {
        type: "object",
        properties: {
          listType: { type: "string" },
          id: { type: "number" }
        },
        required: ["listType", "id"]
      }
    }
  }
];

function buildMessages(modelContext) {
  return [
    { role: "system", content: modelContext.systemPrompt },
    {
      role: "system",
      content: `RUNTIME CONTEXT:\n\n${JSON.stringify(modelContext.runtimeContext, null, 2)}`
    },
    {
      role: "system",
      content: `CURRENT DATE AND TIME:\n\n${JSON.stringify(modelContext.currentDateTime, null, 2)}`
    },
    {
      role: "system",
      content: `CURRENT APPLICATION STATE:\n\n${JSON.stringify(modelContext.systemState, null, 2)}`
    },
    ...modelContext.chatHistory,
    { role: "user", content: modelContext.userMessage }
  ];
}

async function requestOpenRouter(messages, allowTools) {
  const body = {
    model: config.openRouter.model,
    messages,
    temperature: Number(config.openRouter.temperature),
    max_tokens: Number(config.openRouter.maxTokens)
  };

  if (allowTools) {
    body.tools = tools;
    body.tool_choice = "auto";
  }

  const response = await fetch(config.openRouter.baseUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.openRouter.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenRouter Request Failed: ${response.status} - ${errorBody}`);
  }

  const data = await response.json();
  const message = data.choices?.[0]?.message;

  if (!message) {
    throw new Error("OpenRouter response did not include a message");
  }

  return message;
}

async function callOpenRouter(modelContext, { allowTools = true } = {}) {
  const messages = buildMessages(modelContext);
  const firstMessage = await requestOpenRouter(messages, allowTools);
  const toolCalls = allowTools ? firstMessage.tool_calls || [] : [];

  if (toolCalls.length === 0) {
    if (typeof firstMessage.content !== "string" || !firstMessage.content.trim()) {
      throw new Error("OpenRouter returned an empty response");
    }

    return { success: true, response: firstMessage.content, mutations: [] };
  }

  const mutations = [];
  const toolMessages = [];

  for (const toolCall of toolCalls) {
    const action = toolCall.function.name;
    const payload = JSON.parse(toolCall.function.arguments || "{}");
    const result = await manageAction(action, payload);

    mutations.push({ action, payload });
    toolMessages.push({
      role: "tool",
      tool_call_id: toolCall.id,
      name: action,
      content: JSON.stringify({ success: true, result })
    });
  }

  try {
    const finalMessage = await requestOpenRouter(
      [...messages, firstMessage, ...toolMessages],
      false
    );

    if (typeof finalMessage.content !== "string" || !finalMessage.content.trim()) {
      throw new Error("OpenRouter returned no confirmation after tool execution");
    }

    return { success: true, response: finalMessage.content, mutations };
  } catch (error) {
    return {
      success: true,
      response: "The requested changes were completed, but the assistant confirmation could not be generated.",
      mutations,
      warning: error.message
    };
  }
}

export default callOpenRouter;
