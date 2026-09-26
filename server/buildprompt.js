import loadPrompt from "./loadPrompt.js";
import getRuntimeContext from "./runtimeContext.js";
import loadSystemState from "./loadSystemState.js";
import { getChatContext } from "./chat.js";

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

async function buildPrompt({
  promptName = null,
  variables = {},
  location = null,
  userMessage,
  includeChatHistory = true
}) {
  if (typeof userMessage !== "string" || !userMessage.trim()) {
    throw new Error("Build Prompt Error: userMessage is required");
  }

  const runtimeContext = getRuntimeContext(location);
  const chatContext = getChatContext(userMessage);
  let systemPrompt = DEFAULT_SYSTEM_PROMPT;

  if (promptName) {
    systemPrompt = await loadPrompt(promptName);

    for (const [key, value] of Object.entries(variables)) {
      systemPrompt = systemPrompt.replaceAll(`{${key}}`, String(value ?? ""));
    }

    const unresolvedVariables = systemPrompt.match(/\{[A-Z][A-Z0-9_]*\}/g);

    if (unresolvedVariables) {
      throw new Error(
        `Build Prompt Error: unresolved variables ${[...new Set(unresolvedVariables)].join(", ")}`
      );
    }
  }

  return {
    systemPrompt,
    runtimeContext,
    currentDateTime: runtimeContext.currentDateTime,
    systemState: await loadSystemState(),
    chatHistory: includeChatHistory ? chatContext.chatHistory : [],
    userMessage: chatContext.userMessage
  };
}

export default buildPrompt;
