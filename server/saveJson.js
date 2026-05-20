/*
========================================
SAVEJSON.JS
========================================

PURPOSE:
Generic JSON persistence writer.

RESPONSIBILITIES:
- Save JavaScript objects into JSON files
- Write formatted persistent data
- Maintain backend source-of-truth state

THIS FILE SHOULD:
- remain generic
- safely serialize data

THIS FILE SHOULD NOT:
- contain business logic
- mutate application state
- contain AI logic

FLOW:
data object
↓
JSON stringify
↓
write to file
*/

import fs from "fs/promises";
import path from "path";

async function saveJson(filename, data) {

  const filePath = path.join("server","data", filename);

  const jsonData = JSON.stringify(data, null, 2);

  await fs.writeFile(filePath, jsonData, "utf-8");

  console.log(`${filename} saved successfully`);

}
export default saveJson;