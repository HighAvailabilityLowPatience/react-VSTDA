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

      throw new Error(
        `OpenRouter Request Failed: ${response.status}`
      );

    }


    // ========================================
    // PARSE RESPONSE
    // ========================================

    const data = await response.json();

    const aiResponse =
      data.choices[0].message.content;


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