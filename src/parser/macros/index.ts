import {createDefaultParsingContext, createDefaultTextContext, type LatexNode} from "latexenc";
import type {AddMacro, MacroArgumentSpec, MacroHandlerFunc} from "./types.js";
import * as macros from "./definitions";
import Song from "../../types/Song.js";
import NodeWalker from "../nodeWalker.js";

class MacroHandlerClass implements AddMacro {
    ParsingContext = createDefaultParsingContext();
    macroHandlers: {[key: string]: MacroHandlerFunc} = {};

    addMacro(name: string, args: MacroArgumentSpec[], handler: MacroHandlerFunc) {
        if (this.macroHandlers[name]) {
            throw new Error(`Macro ${name} is already defined`);
        }

        this.ParsingContext.addMacro({
            name,
            arguments: args
        });
        this.macroHandlers[name] = handler;
    }

    canHandleMacro(name: string): boolean {
        return !!this.macroHandlers[name];
    }

    handleMacro(node: LatexNode, song: Song, walker: NodeWalker) {
        if (node.kind !== "macro") {
            throw new Error(`Node is not a macro: ${node.kind}`);
        }
        const handler = this.macroHandlers[node.name];
        if (handler) {
            return handler(node, song, walker);
        }
    }
}

const MacroHandler = new MacroHandlerClass();
Object.values(macros).forEach((args) => {
    MacroHandler.addMacro.apply(MacroHandler, args);
});

export default MacroHandler;