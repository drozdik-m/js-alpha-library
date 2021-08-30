import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import "./RemoveAllItems";


//--------------------------------------------------
//---------REMOVE ALL ELEMENTS----------------------
//--------------------------------------------------
Array.prototype.removeAllOccurrences = function (element: any[], comparatorF: IComparator<any> = null): any[]
{
    return this.removeAllItems([element], comparatorF);
}

