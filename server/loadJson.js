/*
========================================
LOADJSON.JS
========================================

PURPOSE:
Generic JSON persistence loader.

RESPONSIBILITIES:
- Load JSON files from server/data
- Parse JSON safely
- Return usable JavaScript objects

THIS FILE SHOULD:
- remain generic
- work for todos/events/lists/etc*/

import fs from "fs/promises";
import path from "path";

async function loadJson(filename) {
    //file path created by parameters and request
const filePath = path.join("data", filename);
//then use filepath variable to go read the requested file
const jsonData = await fs.readFile(filePath, "utf-8");
//json parsing
const parsedData = JSON.parse(jsonData);
//output
return parsedData;
}


export default loadJson;