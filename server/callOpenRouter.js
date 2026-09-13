/*
========================================
CALLOPENROUTER.JS
========================================

PURPOSE:
Handle communication with OpenRouter models.

RESPONSIBILITIES:
- Receive prepared model context
- Shape messages for OpenRouter
- Send request to OpenRouter
- Handle API responses
- Update conversation history
- Return parsed model output
*/

import config from "./config.js";
import { addMessage } from "./chat.js";
import {manageAction} from "./Manager.js";

const tools = [
  {
    type: "function",
    function: {
      name: "createTodo",
      description: "Create a new todo item.",
      parameters: {
        type: "object",
        properties: {
          task: { type: "string" },
          priority: { type: "string" },
          estimatedTimeCost: { type: "number" },
          category: { type: "string" },
          dueDate: { type: "string" },
          notes: { type: "string" }
        },
        required: ["task","estimatedTimeCost","category"]
      }
    }
  },

  {
    type: "function",
    function: {
      name: "createEvent",
      description: "Create a new event.",
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
      name: "addListItem",
      description: "Add a new item to an existing list.",
      parameters: {
        type: "object",
        properties: {
          listType: {
            type: "string",
            description: "Use the exact list key from current application state."
          },
          value: {
            type: "string"
          }
        },
        required: [
          "listType",
          "value"
        ]
      }
    }
  }
];

// ========================================
// CALL OPENROUTER
// ========================================

async function callOpenRouter({
  systemPrompt,
  runtimeContext,
  currentDateTime,
  systemState,
  chatHistory,
  userMessage
}) {

  try {
    console.log({
  baseUrl: config.openRouter.baseUrl,
  model: config.openRouter.model,
  apiKeyLoaded: Boolean(config.openRouter.apiKey),
  apiKeyLength: config.openRouter.apiKey?.length
});

    const response = await fetch(

      config.openRouter.baseUrl,

      {
        method: "POST",

        headers: {

          Authorization: `Bearer ${config.openRouter.apiKey}`,

          "Content-Type": "application/json"

        },

        body: JSON.stringify({

          model: config.openRouter.model,

          messages: [

            // ========================================
            // SYSTEM PROMPT
            // ========================================

            {
              role: "system",
              content: systemPrompt
            },


            // ========================================
            // RUNTIME CONTEXT
            // ========================================

            {
              role: "system",
              content: `
RUNTIME CONTEXT:

${JSON.stringify(runtimeContext, null, 2)}
`
            },


            // ========================================
            // CURRENT DATE / TIME
            // ========================================

            {
              role: "system",
              content: `
CURRENT DATE AND TIME:

${JSON.stringify(currentDateTime, null, 2)}
`
            },


            // ========================================
            // CURRENT SYSTEM STATE
            // ========================================

            {
              role: "system",
              content: `
CURRENT APPLICATION STATE:

${JSON.stringify(systemState, null, 2)}
`
            },


            // ========================================
            // CHAT HISTORY
            // ========================================

            ...chatHistory,


            // ========================================
            // CURRENT USER MESSAGE
            // ========================================

            {
              role: "user",
              content: userMessage
            }
          ],

            // ========================================
            // TOOLS
            // ========================================
            
            tools,
            tool_choice: "auto",
            
          temperature: Number(
            config.openRouter.temperature
          ),

          max_tokens: Number(
            config.openRouter.maxTokens
          )

        })

      }

    );


    // ========================================
    // RESPONSE VALIDATION
    // ========================================

    if (!response.ok) {

      const errorBody =
    await response.text();

  throw new Error(
    `OpenRouter Request Failed: ${response.status} - ${errorBody}`
  );

    }


    // ========================================
    // PARSE RESPONSE
    // ========================================

    const data = await response.json();

        const modelMessage =
          data.choices[0].message;

        const aiResponse =
          modelMessage.content;

        const toolCalls =
          modelMessage.tool_calls || [];

    // ========================================
    // TOOL EXECUTIONS
    // ========================================
      for (const toolCall of toolCalls) {

        const action =
          toolCall.function.name;

        const payload =
          JSON.parse(
            toolCall.function.arguments
          );

        await manageAction(
          action,
          payload
        );
}
    // ========================================
    // UPDATE CHAT HISTORY
    // ========================================

    addMessage(
      "user",
      userMessage
    );

    addMessage(
      "assistant",
      aiResponse
    );


    // ========================================
    // SAFETY CHECK
    // ========================================

    console.log(
      "OpenRouter response received successfully"
    );


    // ========================================
    // RETURN MODEL RESPONSE
    // ========================================

    return {
      success: true,
      response: aiResponse
    };


  } catch (err) {

    console.error(
      "OpenRouter Runtime Error:",
      err
    );

    throw err;

  }

}


// ========================================
// EXPORTS
// ========================================

export default callOpenRouter;