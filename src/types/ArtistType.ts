const artistTypes = ["sł", "sł. trad", "muz. trad", "muz", "muz. oryg", "wyk", "narod"] as const;
export type ArtistType = typeof artistTypes[number];

export const ArtistTypeLabels: Record<ArtistType, string> = {
    "sł": "słowa",
    "sł. trad": "słowa tradycyjne",
    "muz": "muzyka",
    "muz. oryg": "muzyka oryginalna",
    "muz. trad": "muzyka tradycyjna",
    "wyk": "wykonanie",
    "narod": "naród",
} as const;

export function isArtistType(value: string): value is ArtistType {
    return artistTypes.includes(value as ArtistType);
}