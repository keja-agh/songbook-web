import type {AddMacroArgs} from "../types.js";

const endVerse: AddMacroArgs = [
    "endverse",
    [],
    (node, song, walker) => {
        walker.endVerse();
    },
]
export default endVerse;