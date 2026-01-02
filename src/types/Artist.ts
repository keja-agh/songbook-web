import {ArtistType, ArtistTypeLabels} from "./ArtistType.js";
import {Serializable, staticImplements} from "../interfaces/serializable.js";

@staticImplements<Serializable>()
export class Artist {
    name: string;
    type: ArtistType;

    get typeLabel(): string {
        return ArtistTypeLabels[this.type];
    }

    constructor(name: string, type: ArtistType) {
        this.name = name;
        this.type = type;
    }

    toJSON(): string {
        return JSON.stringify({
            name: this.name,
            type: this.type,
        });
    }
    static fromJSON(json: string): Artist {
        const data = JSON.parse(json);
        return new Artist(data.name, data.type);
    }
}