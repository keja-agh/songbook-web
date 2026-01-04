import {Artist} from "./Artist.js";
import {Serializable, staticImplements} from "../interfaces/serializable.js";
import Verse from "./Verse.js";
import Line from "./Line.js";

@staticImplements<Serializable>()
class Song {
    title: string = "";
    altTitle?: string;
    artists: Artist[] = [];

    verses: Verse[] = [];

    // finds first verse with given line count and isChorus flag (for notes reuse)
    findVerse(lineCount: number, isChorus: boolean = false): Verse | null {
        for (const verse of this.verses) {
            if (verse.lines.length === lineCount && verse.isChorus === isChorus) {
                return verse;
            }
        }
        return null;
    }

    toJSON(): string {
        return JSON.stringify({
            title: this.title,
            altTitle: this.altTitle,
            artists: this.artists,
            verses: this.verses,
        });
    }
    static fromJSON(json: string): Song {
        const obj = JSON.parse(json);
        const song = new Song();
        song.title = obj.title;
        song.altTitle = obj.altTitle;
        song.artists = obj.artists.map((artistObj: any) => Artist.fromJSON(artistObj));
        song.verses = obj.verses.map((verseObj: any) => Verse.fromJSON(verseObj));
        return song;
    }

    static exampleSong(): Song {
        const song = new Song();
        song.title = "Example Song";
        song.altTitle = "An Example Alternative Title";
        const artist = new Artist("Example Artist", "sł");
        song.artists.push(artist);
        const verse1 = new Verse([new Line("This is the first line."), new Line("This is the second line.")], false);
        const verse2 = new Verse([new Line("This is the chorus line one."), new Line("This is the chorus line two.")], true);
        song.verses.push(verse1, verse2);
        return song;
    }
}
export default Song;