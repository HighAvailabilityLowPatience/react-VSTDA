/*
========================================
LOADPROMPT.JS
========================================

PURPOSE:
Load prompt templates from prompt files.

RESPONSIBILITIES:
- Read prompt registry
- Locate prompt text files
- Return raw prompt templates

THIS FILE SHOULD:
- handle prompt file loading only*/

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";


// ========================================
// CURRENT FILE DIRECTORY
// ========================================

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);


// ========================================
// LOAD PROMPT
// ========================================

async function loadPrompt(promptName) {

  const registryPath =
    path.join(
      __dirname,
      "data",
      "prompts",
      "prompts.json"
    );

  const registryData =
    await fs.readFile(
      registryPath,
      "utf-8"
    );

  const prompts =
    JSON.parse(registryData);

  const selectedPrompt =
    prompts[promptName];

  const promptFile =
    selectedPrompt.prompt;

  const promptPath =
    path.join(
      __dirname,
      "data",
      "prompts",
      promptFile
    );

  const rawPrompt =
    await fs.readFile(
      promptPath,
      "utf-8"
    );

  console.log(
    `Loaded Prompt Preview: ${rawPrompt.slice(0, 10)}...`
  );

  return rawPrompt;
}


export default loadPrompt;