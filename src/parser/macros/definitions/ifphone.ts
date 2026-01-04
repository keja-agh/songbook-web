import {AddMacroArgs} from "../types.js";

const ifphone: AddMacroArgs = [
    "ifphone",
    [],
    (node, song, walker) => {
        walker.enterPhone();
    },
]
export default ifphone;