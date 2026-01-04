import {AddMacroArgs} from "../types.js";

const elseMacro: AddMacroArgs = [
    "else",
    [],
    (node, song, walker) => {
        walker.elseMacro();
    },
]
export default elseMacro;