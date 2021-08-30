

interface String
{
    /**
    * Extracts full file name with extension from file path
    * @returns file name (f.e. filename.jpg)
    */
    ExtractNameFromPath(): string
}

//--------------------------------------------------
//---------EXTRACT NAME FROM PATH-------------------
//--------------------------------------------------
String.prototype.ExtractNameFromPath = function (): string
{
    let splitArray = this.split("\\");
    return splitArray[splitArray.length - 1];
}