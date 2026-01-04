import {LatexNode} from "latexenc";
import MacroHandler from "./macros/index.js";
import Song from "../types/Song.js";
import Logger from "../helpers/logger.js";
import Verse from "../types/Verse.js";
import Line from "../types/Line.js";

class NodeWalker {
    private index: number;
    private readonly nodes: LatexNode[];
    private readonly song: Song;

    public insideVerse = false;
    public verseIndex = -1;

    public insidePhone = false;
    public insidePhoneElse = false;

    public enterPhone() {
        this.insidePhone = true;
    }
    // Remember to update this when adding new \ifsomething macros
    public elseMacro() {
        if (this.insidePhone) {
            this.insidePhone = false;
            this.insidePhoneElse = true;
        }
    }
    public fiMacro() {
        if (this.insidePhone || this.insidePhoneElse) {
            this.insidePhone = false;
            this.insidePhoneElse = false;
        }
    }

    constructor(nodes: LatexNode[]) {
        this.nodes = nodes;
        this.index = 0;
        this.song = new Song();

        this.parse();
    }

    public textBuffer: string = "";
    public flushText = (): void => {
        const text = this.textBuffer.trim();

        // sometimes there are multiple newlines in the buffer
        if (text.includes("\n")) {
            const parts = text.split("\n");
            for (let i = 0; i < parts.length; i++) {
                this.textBuffer = parts[i];
                this.flushText();
            }
            return;
        }

        if (this.insideVerse && this.verseIndex !== -1) {
            const verse = this.song.verses[this.verseIndex];
            if (verse.lines.length > 0 && verse.lines[verse.lines.length - 1].text === "") {
                const line = verse.lines[verse.lines.length - 1];
                line.text = text;
            } else {
                const line = new Line();
                line.text = text;
                verse.lines.push(line);
            }
        } else {
            Logger.warn(`NodeWalker - flushText called while not inside a verse. Ignoring text: ${text}`);
        }
        this.textBuffer = "";
    }

    public addNotes = (notes: string): void => {
        if (!this.insideVerse || this.verseIndex === -1) {
            Logger.warn(`NodeWalker - addNotes called while not inside a verse - this shouldn't happen. Ignoring notes: ${notes}`);
            return;
        }

        const verse = this.song.verses[this.verseIndex];

        if (notes === "^") {
            // repeat notes from previous verse
            verse.needsRepeatNodes = true;
        }

        if (verse.lines.length === 0 || verse.lines[verse.lines.length - 1].notes) {
            const line = new Line();
            line.notes = notes;
            verse.lines.push(line);
        } else {
            verse.lines[verse.lines.length - 1].notes = notes;
        }
    }

    private copyNotesIfNeeded = (): void => {
        const verse = this.song.verses[this.song.verses.length - 1];
        if (verse.needsRepeatNodes) {
            const other = this.song.findVerse(verse.lines.length, verse.isChorus);
            if (other) {
                verse.copyNotesFrom(other);
                verse.needsRepeatNodes = false;
            } else {
                Logger.warn("Couldn't find another verse to repeat notes from!")
            }
        }

    }

    public beginVerse = (): void => {
        this.insideVerse = true;
        this.verseIndex = this.song.verses.length;
        this.song.verses.push(new Verse())
    }
    public endVerse = (): void => {
        if (this.textBuffer.trim()) {
            this.flushText();
        }
        this.copyNotesIfNeeded();
        this.insideVerse = false;
        this.verseIndex = -1;
    }

    public beginChorus = (): void => {
        this.insideVerse = true;
        this.verseIndex = this.song.verses.length;
        const chorus = new Verse();
        chorus.isChorus = true;
        this.song.verses.push(chorus);
    }
    public endChorus = (): void => {
        this.endVerse();
    }

    private parse(): void {
        this.textBuffer = "";

        for (this.index = 0; this.index < this.nodes.length; this.index++) {
            const node = this.nodes[this.index];

            if (node.kind === "macro" && MacroHandler.canHandleMacro(node.name)) {
                if (this.insidePhoneElse && node.name !== "fi") {
                    continue;
                }

                const res = MacroHandler.handleMacro(node, this.song, this);
                if (res) {
                    this.textBuffer += res;
                }
            }

            if (this.insidePhoneElse) {
                continue;
            }


            let nodeText = "";
            if (node.kind === "chars") {
                nodeText = node.content;
            } else if (node.kind === "specials") {
                nodeText = node.chars;
            }

            this.textBuffer += nodeText
            if (this.textBuffer.endsWith("\n")) {
                this.flushText();
            }
        }
    }

    getSong(): Song {
        return this.song;
    }
}
export default NodeWalker;