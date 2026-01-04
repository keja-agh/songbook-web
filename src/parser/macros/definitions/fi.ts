import {AddMacroArgs} from "../types.js";

const fi: AddMacroArgs = [
    "fi",
    [],
    (node, song, walker) => {
        walker.fiMacro();
    },
]
export default fi;