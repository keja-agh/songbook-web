import {Artist} from "./Artist.js";
import {Serializable, staticImplements} from "../interfaces/serializable.js";

@staticImplements<Serializable>()
class Song {
    title: string = "";
    altTitle?: string;
    artists: Artist[] = [];

    toJSON(): string {
        return JSON.stringify({
            title: this.title,
            altTitle: this.altTitle,
            artists: this.artists.map(artist => artist.toJSON()),
        });
    }
    static fromJSON(json: string): Song {
        const obj = JSON.parse(json);
        const song = new Song();
        song.title = obj.title;
        song.altTitle = obj.altTitle;
        song.artists = obj.artists.map((artistObj: any) => Artist.fromJSON(artistObj));
        return song;
    }
}
export default Song;