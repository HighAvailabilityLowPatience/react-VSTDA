/*
========================================
CONFIG.JS
========================================

PURPOSE:
Centralized runtime configuration for the backend application.

RESPONSIBILITIES:
- Load environment variables
- Normalize backend configuration
- Store OpenRouter runtime settings
- Provide one consistent config object
  for the entire server*/

  import dotenv from "dotenv";


dotenv.config();
const config = {

  openRouter: {

    apiKey: process.env.OPENROUTER_API_KEY,

    model: process.env.OPENROUTER_MODEL,

    baseUrl: process.env.OPENROUTER_BASE_URL,

    temperature: process.env.OPENROUTER_TEMPERATURE,

    maxTokens: process.env.OPENROUTER_MAX_TOKENS
  }
  };

export default config;
