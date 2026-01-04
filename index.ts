import * as fs from "node:fs";
import * as path from "node:path";
import Parser from "./src/parser/parser.js";
import {glob} from "glob";
import Song from "./src/types/Song.js";

const fileNames = await glob.glob(path.join(import.meta.dirname, "songbook/song_sections") + "/*/*.tex");

const songs: Song[] = [];

for (const file of fileNames) {
    const fileContent = fs.readFileSync(file, "utf-8");
    const res = Parser.parse(fileContent);
    songs.push(res);
}

fs.writeFileSync(path.join(import.meta.dirname, "songbook/songs.json"), JSON.stringify(songs, null, 2), "utf-8");
console.log(`Parsed ${songs.length} songs.`);