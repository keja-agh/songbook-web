import {expect, test, vi} from "vitest";
import Song from "./Song.js";

test("Song can be serialized and deserialized", () => {
    const song = Song.exampleSong();

    const toJsonSpy = vi.fn(song.toJSON.bind(song));

    const json = toJsonSpy();
    expect(toJsonSpy).toHaveReturned();

    const deserializedSpy = vi.fn(Song.fromJSON.bind(Song, json));
    const deserializedSong = deserializedSpy();
    expect(deserializedSpy).toHaveReturned();

    expect(deserializedSong).toBeInstanceOf(Song);
    expect(deserializedSong).toEqual(song);
})