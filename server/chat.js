/*
========================================
CHAT.JS
========================================

PURPOSE:
Maintain recent user/model conversation context.

RESPONSIBILITIES:
- Store user and assistant messages
- Remove messages older than 24 hours
- Limit conversation context size
- Return chat history
- Return current user message

THIS FILE SHOULD NOT:
- call OpenRouter
- build prompts
- handle routes
- manage runtime context
*/


// ========================================
// CONFIG
// ========================================

const MAX_HISTORY_AGE_MS =
  24 * 60 * 60 * 1000;

const MAX_ESTIMATED_TOKENS =
  6000;


// ========================================
// CHAT STORAGE
// ========================================

const conversationHistory = [];


// ========================================
// ESTIMATE TOKEN COUNT
// ========================================

function estimateTokens(text) {

  if (!text) {
    return 0;
  }

  // Rough approximation:
  // 1 token ≈ 4 characters

  return Math.ceil(
    text.length / 4
  );

}


// ========================================
// REMOVE OLD MESSAGES
// ========================================

function removeExpiredMessages() {

  const cutoff =
    Date.now() - MAX_HISTORY_AGE_MS;

  while (
    conversationHistory.length > 0 &&
    conversationHistory[0].timestamp < cutoff
  ) {

    conversationHistory.shift();

  }

}


// ========================================
// TRIM HISTORY TO TOKEN LIMIT
// ========================================

function trimHistoryToTokenLimit() {

  let estimatedTokens = 0;

  const trimmedHistory = [];


  // Start with newest messages
  // and work backwards

  for (
    let i = conversationHistory.length - 1;
    i >= 0;
    i--
  ) {

    const message =
      conversationHistory[i];

    const messageTokens =
      estimateTokens(message.content);


    if (
      estimatedTokens + messageTokens >
      MAX_ESTIMATED_TOKENS
    ) {

      break;

    }


    trimmedHistory.unshift({
      role: message.role,
      content: message.content
    });


    estimatedTokens +=
      messageTokens;

  }


  return trimmedHistory;

}


// ========================================
// ADD MESSAGE
// ========================================

function addMessage(
  role,
  content
) {

  if (
    role !== "user" &&
    role !== "assistant"
  ) {

    throw new Error(
      `Chat Error: invalid role "${role}"`
    );

  }


  if (
    typeof content !== "string" ||
    !content.trim()
  ) {

    throw new Error(
      "Chat Error: message content is required"
    );

  }


  conversationHistory.push({

    role,

    content,

    timestamp:
      Date.now()

  });


  removeExpiredMessages();

}


// ========================================
// GET CHAT CONTEXT
// ========================================

function getChatContext(
  userMessage
) {

  removeExpiredMessages();


  const chatHistory =
    trimHistoryToTokenLimit();


  return {

    chatHistory,

    userMessage

  };

}


// ========================================
// EXPORTS
// ========================================

export {
  addMessage,
  getChatContext
};