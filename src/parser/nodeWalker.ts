import {LatexNode} from "latexenc";
import MacroHandler from "./macros/index.js";
import Song from "../types/Song.js";

class NodeWalker {
    private index: number;
    private readonly nodes: LatexNode[];
    private readonly song: Song;

    constructor(nodes: LatexNode[]) {
        this.nodes = nodes;
        this.index = 0;
        this.song = new Song();

        this.parse();
    }

    private parse(): void {
        for (this.index = 0; this.index < this.nodes.length; this.index++) {
            const node = this.nodes[this.index];
            if (node.kind === "macro" && MacroHandler.canHandleMacro(node.name)) {
                MacroHandler.handleMacro(node, this.song);
            }
        }
    }

    getSong(): Song {
        return this.song;
    }
}
export default NodeWalker;