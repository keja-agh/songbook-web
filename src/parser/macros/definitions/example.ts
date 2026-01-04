import {AddMacroArgs} from "../types.js";

const exampleMacroDefinition: AddMacroArgs = [
    "macroName",
    [
        {type: "group"},
    ],
    (node, song, walker) => {
        // do something with the macro
    },
]
export default exampleMacroDefinition;