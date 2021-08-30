

interface String
{
    /**
     * Replaces all occurences of a substring
     * @param whatToReplace What will be replaced
     * @param replacement Replacement
     * @returns New string with replaced substrings
     */
    ReplaceAll(whatToReplace: string, replacement: string): string;
}

//--------------------------------------------------
//---------REPLACE ALL------------------------------
//--------------------------------------------------
String.prototype.ReplaceAll = function (whatToReplace: string, replacement: string): string
{
    let string = this;
    string = string.replace(new RegExp(whatToReplace, "g"), replacement);
    return string;
};
