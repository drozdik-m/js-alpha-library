import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import { ComparatorHandler } from "@drozdik.m/comparator-handler";


//--------------------------------------------------
//---------REMOVE ALL ELEMENTS----------------------
//--------------------------------------------------
Array.prototype.removeAllItems = function (elements: any[], comparatorF: IComparator<any> = null): any[]
{
    //Empty input
    if (elements.length == 0)
        return this;

    let comparator = new ComparatorHandler(comparatorF);

    //Iterate in array and find all occurences of input elements
    let offset = 0;
    for (let i = 0; i < this.length; i++)
    {
        this[i - offset] = this[i];

        //Iterate input elements and check match
        for (let j = 0; j < elements.length; j++)
        {
            if (comparator.Compare(elements[j], this[i]) == 0)
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


