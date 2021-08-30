

interface String
{
    /**
     * Takes youtube video URL and extracts only youtube video ID
     * @returns Youtube video ID
     */
    ExtractYoutubeId(): string;
}

//--------------------------------------------------
//---------EXTRACT YOUTUBE ID-----------------------
//--------------------------------------------------
String.prototype.ExtractYoutubeId = function (): string
{
    const indexOfStart = this.lastIndexOf("v=") + 2;
    if (indexOfStart === "-1")
        return null;

    let resultId = "";
    for (let i = indexOfStart; this[i] !== "&" && i < this.length; i++)
    {
        resultId += this[i];
    }

    return resultId;
}