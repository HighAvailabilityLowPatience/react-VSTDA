const config = {

  openRouter: {

    apiKey: process.env.OPENROUTER_API_KEY,

    model: "deepseek/deepseek-v4-flash",

    baseUrl: "https://openrouter.ai/api/v1/chat/completions",

    temperature: 0.7,

    maxTokens: 2000

  }
  };

export default config;
