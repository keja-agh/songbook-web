import type {AddMacroArgs} from "../types.js";
import type {LatexCharsNode, LatexMacroArgumentGroup} from "latexenc";

const rep: AddMacroArgs = [
    "rep",
    [
        {type: "group"},
    ],
    (node, song) => {
        const amount = ((node.arguments[0] as LatexMacroArgumentGroup).nodes[0] as LatexCharsNode).content
        return `(x${amount})`;
    },
]
export default rep;