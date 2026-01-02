const trimChar = (str: string, char: string): string => {
    var start = 0;
    var end = str.length;

    while (start < end && str[start] === char) {
        ++start;
    }
    while (end > start && str[end - 1] === char) {
        --end;
    }

    return (start > 0 || end < str.length) ? str.substring(start, end) : str;
}
export default trimChar;