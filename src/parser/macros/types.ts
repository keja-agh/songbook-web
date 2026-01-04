import {LatexMacroNode} from "latexenc";
import Song from "../../types/Song.js";
import NodeWalker from "../nodeWalker.js";

export type MacroArgumentType = 'group' | 'optional' | 'star' | 'token';
export interface MacroArgumentSpec {
    type: MacroArgumentType;
}

/// if the handler returns a string, it will replace the macro node with that string (treat it as text)
export type MacroHandlerFunc = (node: LatexMacroNode, song: Song, walker: NodeWalker) => void|string;


export interface AddMacro {
    addMacro(name: string, args: MacroArgumentSpec[], handler: MacroHandlerFunc): void;
}
export type AddMacroArgs = [name: string, args: MacroArgumentSpec[], handler: MacroHandlerFunc];