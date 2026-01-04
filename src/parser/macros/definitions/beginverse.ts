import {AddMacroArgs} from "../types.js";

const beginVerse: AddMacroArgs = [
    "beginverse",
    [],
    (node, song, walker) => {
        walker.beginVerse();
    },
]
export default beginVerse;