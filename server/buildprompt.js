/*
========================================
BUILDPROMPT.JS
========================================

PURPOSE:
Build and package all model context needed
for callOpenRouter.

RESPONSIBILITIES:
- Load raw system prompt
- Replace prompt placeholders
- Get runtime context
- Get chat context
- Return packaged model context

THIS FILE SHOULD NOT:
- call OpenRouter
- contain route logic
- contain persistence logic
*/

import loadPrompt from "./loadPrompt.js";
import getRuntimeContext from "./runtimeContext.js";
import loadSystemState from "./loadSystemState.js";
import { getChatContext } from "./chat.js";
//DEFAULT SYSTEM PROMPT FOR WHWEN I AM JUST CHATTING
const DEFAULT_SYSTEM_PROMPT = `
You are the user's personal assistant.

Use the provided runtime context, current application state,
conversation history, and user message to provide useful,
context-aware responses.

The current application state represents the user's actual
application data and should be treated as the current source
of truth.

Be concise, practical, and helpful.
`;

// ========================================
// BUILD PROMPT
// ========================================

async function buildPrompt(
  promptName,
  variables,
  location,
  userMessage
) {

  // ========================================
  // GET RUNTIME CONTEXT
  // ========================================

  const runtimeContext =
    getRuntimeContext(location);


  // ========================================
  // GET CHAT CONTEXT
  // ========================================

  const chatContext =
    getChatContext(userMessage);


  // ========================================
  // DETERMINE SYSTEM PROMPT
  // ========================================

  let finalPrompt;


  if (promptName) {

    const template =
      await loadPrompt(promptName);

    finalPrompt = template;


    // ========================================
    // REPLACE TEMPLATE VARIABLES
    // ========================================

    for (
      const [key, value]
      of Object.entries(variables || {})
    ) {

      const placeholder =
        `{${key}}`;

      finalPrompt =
        finalPrompt.replaceAll(
          placeholder,
          value ?? ""
        );

    }

  } else {

    finalPrompt =
      DEFAULT_SYSTEM_PROMPT;

  }
  // ========================================
  // LOAD SYSTEM STATE
  // ========================================

  const systemState =
    await loadSystemState();


  // ========================================
  // RETURN MODEL CONTEXT
  // ========================================

  return {
//MODEL INSTRUCTIONS
    systemPrompt:
      finalPrompt,
//ENVIRONMENT CONTEXT
    runtimeContext,

    currentDateTime:
      runtimeContext.currentDateTime,
//APPLICATION DATA
    systemState,
//CONVERSATION BETWEEN USER AND MODEL
    chatHistory:
      chatContext.chatHistory,

    userMessage:
      chatContext.userMessage

  };

}
// ========================================
// EXPORTS
// ========================================

export default buildPrompt;