import * as fs from "node:fs";
import * as path from "node:path";
import Parser from "./src/parser/parser.js";
import {glob} from "glob";

const fileNames = await glob.glob(path.join(import.meta.dirname, "songbook/song_sections") + "/*/*.tex");

for (const file of fileNames) {
    const fileContent = fs.readFileSync(file, "utf-8");
    const res = Parser.parse(fileContent);
    console.log(res.toJSON())
}