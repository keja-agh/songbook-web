import {type Serializable, staticImplements} from "../interfaces/serializable.js";
import Line from "./Line.js";

@staticImplements<Serializable>()
class Verse {
    lines: Line[];
    isChorus: boolean;

    needsRepeatNodes: boolean = false;

    constructor(lines: Line[] = [], isChorus: boolean = false) {
        this.lines = lines;
        this.isChorus = isChorus;
    }

    copyNotesFrom(other: Verse): void {
        if (other.lines.length !== this.lines.length) {
            throw new Error("Cannot copy notes from verse with different number of lines.");
        }
        for (let i = 0; i < this.lines.length; i++) {
            this.lines[i].notes = other.lines[i].notes;
        }
    }

    toJSON(): string {
        return JSON.stringify({
            lines: this.lines,
            isChorus: this.isChorus,
        });
    }

    static fromJSON(json: string): Verse {
        const obj = JSON.parse(json);
        return new Verse((obj.lines as string[]).map(l => Line.fromJSON(l)), obj.isChorus);
    }
}

export default Verse;