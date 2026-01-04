import type {AddMacroArgs} from "../types.js";

const beginchorus: AddMacroArgs = [
    "beginchorus",
    [],
    (node, song, walker) => {
        walker.beginChorus();
    },
]
export default beginchorus;