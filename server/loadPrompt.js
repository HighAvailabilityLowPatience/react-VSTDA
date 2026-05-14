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

async function loadPrompt(promptName) {
  //  load prompts.json registry
const registryPath = path.join("data", "prompts.json");
const registryData = await fs.readFile(registryPath, "utf-8");
//reading thru our prompt registry
const prompts = JSON.parse(registryData);
  // find promptName inside registry
const SelectedPrompt = prompts[promptName];
  // get txt filename
const promptFile = SelectedPrompt.prompt
  //  read txt file
const promptPath = path.join("prompts", promptFile);
const rawPrompt = await fs.readFile(promptPath, "utf-8");
  //  return raw prompt text
  console.log(`Loaded Prompt Preview: ${rawPrompt.slice(0, 10)}...`);
  return rawPrompt
}

export default loadPrompt;