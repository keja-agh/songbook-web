import type {AddMacroArgs} from "../types.js";
import type {LatexCharsNode, LatexGroupNode, LatexMacroArgumentGroup} from "latexenc";

const clist: AddMacroArgs = [
    "clist",
    [
        {type: "group"},
    ],
    (node, song, walker) => {
        const groupNode = (node.arguments[0] as LatexMacroArgumentGroup)
        if (groupNode.nodes.length == 1) {
            // notes are to be repeated from previous verses
            walker.addNotes("^");
        } else {
            // we can extract notes easily
            const notes = ((groupNode.nodes[1] as LatexGroupNode).children[0] as LatexCharsNode).content;
            walker.addNotes(notes);
        }
    },
]
export default clist;