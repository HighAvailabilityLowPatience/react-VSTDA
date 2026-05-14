/*
========================================
BUILDPROMPT.JS
========================================

PURPOSE:
Inject runtime variables into prompt templates.

RESPONSIBILITIES:
- Replace placeholders
- Assemble final prompts
- Inject dynamic runtime context

THIS FILE SHOULD:
- remain deterministic
- only handle string assembly

THIS FILE SHOULD NOT:
- call OpenRouter
- contain route logic
- contain persistence logic

FLOW:
template
+
runtime variables
↓
placeholder replacement
↓
final assembled prompt
*/

//Dynamically Building the Prompt String with parameters template = Json string with full prompt loaded and replacing variables = placeholders in prompt string
function buildPrompt(template, variables) {

  let finalPrompt = template;

  for (const [key, value] of Object.entries(variables)) {

    console.log("PLACEHOLDER FOUND:", key);
    //Container for holding the value we are going to swap
    const placeholder = `{${key}}`;
    //Match and Replace Variables with User Inputs
    finalPrompt = finalPrompt.replace(placeholder,value || "");
  }
console.log("PROMPT PREVIEW:",finalPrompt.slice(0, 10),"...",finalPrompt.slice(-10));
  return finalPrompt;

}

export default buildPrompt;