
//--------------------------------------------------
//---------REMOVE INDEXES---------------------------
//--------------------------------------------------
Array.prototype.removeItemsAt = function (indexes: number[]): any[]
{
    //Empty input
    if (indexes.length == 0)
        return this;

    //Iterate in array and find all occurences of input elements
    let offset = 0;
    for (let i = 0; i < this.length; i++)
    {
        this[i - offset] = this[i];

        //Iterate input elements and check match
        for (let j = 0; j < indexes.length; j++)
        {
            if (indexes[j] == i)
            {
                offset++;
                break;
            }
        }

    }

    //Scrap the last elements
    this.length -= offset;

    //Return this
    return this;
}