import Song from "../../types/Song";

class SongsProviderClass {
    songs: Song[];

    constructor() {
        this.songs = $state([]);

        this.loadSongs();
    }

    async loadSongs(): Promise<void> {
        const res = await fetch("/songs.json");
        const songsJson = await res.json();
        this.songs = [];
        for (const songData of songsJson) {
            const song = Song.fromJSON(songData);
            this.songs.push(song);
        }
    }

    getSongs(): Song[] {
        return this.songs;
    }

    getSongByTitle(title: string): Song | undefined {
        return this.songs.find(song => song.title === title);
    }
}

const SongsProvider = new SongsProviderClass();
export default SongsProvider;