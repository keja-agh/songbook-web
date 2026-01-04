import {LatexParsingContext, LatexWalker} from "latexenc";
import MacroHandler from "./macros";
import NodeWalker from "./nodeWalker.js";
import Song from "../types/Song.js";
import Logger from "../helpers/logger.js";

class ParserClass {
    parsingContext: LatexParsingContext = MacroHandler.ParsingContext;

    prepareForParsing(file: string): string {
        return file.replace(/\\\[([^\]]+)]/g, '\\chord{$1}');
    }

    parse(file: string, skipPreparation = false): Song {
        if (!skipPreparation) {
            file = this.prepareForParsing(file);
        }
        const walker = new LatexWalker(file, {context: this.parsingContext});
        const nodes = walker.getNodes();

        const Walker = new NodeWalker(nodes);
        const song = Walker.getSong();
        Logger.debug(`Parsing sucess for ${song.title}.`);
        return song;
    }
}

const Parser = new ParserClass();
export default Parser;