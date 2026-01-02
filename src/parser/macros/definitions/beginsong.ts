import {AddMacroArgs} from "../types.js";
import {LatexCharsNode, LatexGroupNode, LatexMacroArgumentGroup, LatexMacroArgumentOptional} from "latexenc";
import {isArtistType} from "../../../types/ArtistType.js";
import Logger from "../../../helpers/logger.js";
import {Artist} from "../../../types/Artist.js";
import trimChar from "../../../helpers/trimChar.js";

const beginsong: AddMacroArgs = [
    "beginsong",
    [
        {type: "group"},
        {type: "optional"}
    ],
    (node, song) => {
        // parse title
        const charsNode = (node.arguments[0] as LatexMacroArgumentGroup).nodes[0];
        song.title = (charsNode as LatexCharsNode).content;

        // parse artists
        try {
            // it's in the style of [something=, data, by=, data]
            // const artistsNode = (node.arguments[1] as LatexMacroArgumentOptional).nodes[1] as LatexGroupNode;
            let artistsNode: LatexGroupNode|null = null;
            const nodes = (node.arguments[1] as LatexMacroArgumentOptional).nodes;
            for (let i = 0; i < nodes.length; i += 2) {
                let typeNode = nodes[i];
                if (typeNode.kind === "chars" && typeNode.content.trim().toLowerCase() === "by=") {
                    artistsNode = nodes[i + 1] as LatexGroupNode;
                    break;
                }
            }

            if (artistsNode === null) {
                Logger.warn(`No 'by=' (artists) field found in beginsong macro optional argument for song ${song.title}.`);
                throw new Error("No 'by=' field found in beginsong macro optional argument.");
            }
            let content: string = "";
            for (const n of artistsNode.children) {
                if (n.kind === "chars") {
                    content += n.content;
                }
            }
            const infoParts = content.split(";").map(part => part.trim());
            for (const part of infoParts) {
                // they should be similar to: "orig. muz. Artist Name"
                // so we split by the last period
                const lastDotIndex = part.lastIndexOf(".");
                if (lastDotIndex !== -1) {
                    const role = part.substring(0, lastDotIndex).trim();
                    const name = part.substring(lastDotIndex + 1).trim();
                    if (!isArtistType(role)) {
                        Logger.warn(`Unknown artist role: "${role}", in beginsong macro. This artist will be skipped!!`);
                        continue;
                    }
                    if (name.length > 0) {
                        const artist = new Artist(name, role)
                        song.artists.push(artist);
                    }
                }
            }
        } catch (e) {
            // pass
        }

        // index= (alternative title)
        try {
            let indexNode: LatexGroupNode|null = null;
            const nodes = (node.arguments[1] as LatexMacroArgumentOptional).nodes;
            for (let i = 0; i < nodes.length; i += 2) {
                let typeNode = nodes[i];
                if (typeNode.kind === "chars" && trimChar(typeNode.content, ",").trim().toLowerCase() === "index=") {
                    indexNode = nodes[i + 1] as LatexGroupNode;
                    break;
                }
            }

            if (indexNode !== null) {
                let content: string = "";

                for (const n of indexNode.children) {
                    if (n.kind === "chars") {
                        content += n.content;
                    }
                }
                song.altTitle = content.trim();
            }
        } catch (e) {
            Logger.error(`Error parsing index (alternative title) in beginsong macro for song ${song.title}: ${e}`);
        }
    },
]
export default beginsong;