import {type ArtistType, ArtistTypeLabels} from "./ArtistType.js";
import {type Serializable, staticImplements} from "../interfaces/serializable.js";

@staticImplements<Serializable>()
export class Artist {
    name: string;
    role: ArtistType;

    get roleLabel(): string {
        return ArtistTypeLabels[this.role];
    }

    constructor(name: string, type: ArtistType) {
        this.name = name;
        this.role = type;
    }

    toJSON(): string {
        return JSON.stringify({
            name: this.name,
            type: this.role,
        });
    }
    static fromJSON(json: string): Artist {
        const data = JSON.parse(json);
        return new Artist(data.name, data.type);
    }
}