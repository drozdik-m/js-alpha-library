

interface String
{
    /**
     * Tells if your string ends with input string
     * @param comparedString What should the string end with?
     * @returns True if the string ends with input string, else false
     */
    EndsWith(comparedString: string): boolean;
}

//--------------------------------------------------
//---------ENDS WITH--------------------------------
//--------------------------------------------------
String.prototype.EndsWith = function (compareString: string): boolean
{
    let currentString = this;

    //Input string is longer that current string
    if (compareString.length > currentString.length)
        return false;

    //Iterate and check if all chars are equal
    for (let i = currentString.length - 1, j = compareString.length - 1; i >= 0 && j >= 0; i-- , j--)
    {
        //Found mistake
        if (currentString[i] !== compareString[j])
            return false;
    }

    //It's a match
    return true;
};