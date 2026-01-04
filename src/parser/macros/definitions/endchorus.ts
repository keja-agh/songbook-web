import {AddMacroArgs} from "../types.js";

const endchorus: AddMacroArgs = [
    "endchorus",
    [],
    (node, song, walker) => {
        walker.endChorus();
    },
]
export default endchorus;