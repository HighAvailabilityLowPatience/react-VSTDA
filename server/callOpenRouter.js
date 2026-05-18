/*
========================================
CALLOPENROUTER.JS
========================================

PURPOSE:
Handle communication with OpenRouter models.

RESPONSIBILITIES:
- Send prompts to OpenRouter
- Configure model requests
- Handle API responses
- Return parsed model output
*/

import config from "./config.js";


// ========================================
// CALL OPENROUTER
// ========================================

async function callOpenRouter(finalPrompt) {

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
            {
              role: "user",
              content: finalPrompt
            }
          ],

          temperature: Number(config.openRouter.temperature),

          max_tokens: Number(config.openRouter.maxTokens)

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



    // ========================================
    // SAFETY CHECK
    // ========================================

    console.log(
      "OpenRouter response received successfully"
    );



    // ========================================
    // RETURN MODEL RESPONSE
    // ========================================

    return data;



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