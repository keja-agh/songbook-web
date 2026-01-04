import type {AddMacroArgs} from "../types.js";
import type {LatexMacroArgumentGroup} from "latexenc";

const textit: AddMacroArgs = [
    "textit",
    [
        {type: "group"},
    ],
    (node, song) => {
        let text = "";
        const nodes = (node.arguments[0] as LatexMacroArgumentGroup).nodes
        for (const n of nodes) {
            if (n.kind === "chars") {
                text += n.content;
            } else if (n.kind === "specials") {
                text += n.chars;
            }
        }

        text = text.replaceAll(",,", "\"")
        text = text.replaceAll("''", "\"")

        return `*${text}*\n`;
    },
]
export default textit;