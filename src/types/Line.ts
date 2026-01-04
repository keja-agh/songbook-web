import {Serializable, staticImplements} from "../interfaces/serializable.js";

@staticImplements<Serializable>()
class Line {
    text: string;
    notes?: string;

    constructor(text: string = "", notes?: string) {
        this.text = text;
        this.notes = notes;
    }

    toJSON(): string {
        return JSON.stringify({
            text: this.text,
            notes: this.notes,
        });
    }

    static fromJSON(json: string): Line {
        const obj = JSON.parse(json);
        return new Line(obj.text, obj.notes);
    }
}

export default Line;