

interface String
{
    /**
     * Returns file extensions if the string has one
     */
    ExtractFileExtension(): string;
}

//--------------------------------------------------
//---------ENDS WITH--------------------------------
//--------------------------------------------------
String.prototype.ExtractFileExtension = function (): string
{
    let filePath: string = this;

    //String is empty
    if (filePath.length == 0)
        return "";

    //String ends with "."
    if (filePath.charAt(filePath.length - 1) == ".")
        return "";

    let split = filePath.split(".");

    //No dots
    if (split.length <= 1)
        return "";

    return split[split.length - 1];
    
};