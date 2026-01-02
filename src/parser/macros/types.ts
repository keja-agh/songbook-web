import {LatexMacroNode} from "latexenc";

export type MacroArgumentType = 'group' | 'optional' | 'star' | 'token';
export interface MacroArgumentSpec {
    type: MacroArgumentType;
}

export type MacroHandlerFunc = (node: LatexMacroNode, song: Song) => void;


export interface AddMacro {
    addMacro(name: string, args: MacroArgumentSpec[], handler: MacroHandlerFunc): void;
}
export type AddMacroArgs = [name: string, args: MacroArgumentSpec[], handler: MacroHandlerFunc];