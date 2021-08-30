import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import { ComparatorHandler } from "@drozdik.m/comparator-handler";

//--------------------------------------------------
//---------REMOVE ALL DUPLICATES--------------------
//--------------------------------------------------
Array.prototype.removeDuplicates = function (comparatorF: IComparator<any> = null): Array<any>
{
    let comparator = new ComparatorHandler(comparatorF);

    //Iterate in array and remove all duplicates of this item
    for (let i = 0; i < this.length; i++)
    {
        //Iterate next elements of the array
        let offset = 0;
        for (let j = i + 1; j < this.length; j++)
        {
            //Shift
            this[j - offset] = this[j];

            //Compare
            if (comparator.Compare(this[j], this[i]) == 0)
                offset++;
        }

        //Scrap the last elements
        this.length -= offset;
    }

    //Return this
    return this;
};



