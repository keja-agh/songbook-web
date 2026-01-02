import {createDefaultParsingContext, createDefaultTextContext, LatexNode} from "latexenc";
import {AddMacro, MacroArgumentSpec, MacroHandlerFunc} from "./types.js";
import * as macros from "./definitions/index.js";
import Song from "../../types/Song.js";

class MacroHandlerClass implements AddMacro {
    ParsingContext = createDefaultParsingContext();
    macroHandlers: {[key: string]: Function} = {};

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

    handleMacro(node: LatexNode, song: Song) {
        if (node.kind !== "macro") {
            throw new Error(`Node is not a macro: ${node.kind}`);
        }
        const handler = this.macroHandlers[node.name];
        if (handler) {
            handler(node, song);
        }
    }
}

const MacroHandler = new MacroHandlerClass();
Object.values(macros).forEach((args) => {
    MacroHandler.addMacro.apply(MacroHandler, args);
});

export default MacroHandler;