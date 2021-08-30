import { IComparable } from "@drozdik.m/common-interfaces/IComparable";
import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import { DefaultComparator } from "@drozdik.m/default-comparator";
import { Testing } from "@drozdik.m/testing";
import "../src/AllArrayExtensions";


let testing = new Testing("Array extensions");
testing.StartTestingLog();

class FooCmp implements IComparable<FooCmp>
{
    number: number;

    constructor(n: number)
    {
        this.number = n;
    }

    GetComparator(): IComparator<FooCmp>
    {
        return function (a: FooCmp, b: FooCmp): number
        {
            return DefaultComparator<number>(a.number, b.number);
        };
    }
}

//REMOVE DUPLICATES
testing.Assert([1, 2, 3, 4, 1, 2, 3, 4, 4, 1, 2, 3, 4, 1].removeDuplicates().toString() == [1, 2, 3, 4].toString());
testing.Assert([1, 2, 3, 4, 1, 2, 3, 4, 4, 1, 2, 3, 4, 1].removeDuplicates()[3] == 4);
testing.Assert(typeof [1, 2, 3, 4, 1, 2, 3, 4, 4, 1, 2, 3, 4, 1].removeDuplicates()[4] == "undefined");
testing.Assert([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].removeDuplicates().toString() == [1, 2].toString());
testing.Assert([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].removeDuplicates().toString() == [1].toString());
testing.Assert([9, 9, 2, 4, 8, 7, 3, 4, 7, 6, 1, 2, 3, 4, 7, 5, 3, 8, 1, 4, 6, 1, 7, 8, 9, 1, 5,
    8, 8, 7, 6, 1, 5, 4, 3, 1, 7, 8, 6, 4, 9, 5, 3, 1, 1, 1, 7, 5, 4, 1, 3, 4, 2, 1, 8, 6, 1, 4, 8,
    7, 6, 1, 5, 4, 7, 5, 3, 1, 2, 5, 8, 1, 4, 7, 3, 6, 9, 5, 4, 3, 1, 5, 8, 8].removeDuplicates().toString() == [9, 2, 4, 8, 7, 3, 6, 1, 5].toString());
testing.AreEqual([1, 2, 3, 4, 5, 6].removeDuplicates(function (a: number, b: number): number
{
    return 0;
}).toString(), [1].toString());
let arr1 = [
    new FooCmp(1),
    new FooCmp(2),
    new FooCmp(3),
    new FooCmp(4),
    new FooCmp(1),
    new FooCmp(2),
    new FooCmp(3),
    new FooCmp(4),
    new FooCmp(4),
    new FooCmp(1),
    new FooCmp(2),
    new FooCmp(3),
    new FooCmp(4),
    new FooCmp(1)
].removeDuplicates();
testing.AreEqual(arr1[0].number, 1);
testing.AreEqual(arr1[1].number, 2);
testing.AreEqual(arr1[2].number, 3);
testing.AreEqual(arr1[3].number, 4);
testing.IsUndefined(arr1[4]);


//REMOVE ELEMENTS
testing.Assert([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4].removeAllItems([1, 2, 3]).toString() == [4, 4, 4].toString());
testing.Assert([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4].removeAllItems([]).toString() == [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4].toString());
testing.Assert([1, 4, 6, 7, 2, 3, 4, 8, 5, 6, 3, 1, 4, 6, 7, 6, 5, 1, 2, 8, 9, 2, 4, 3].removeAllItems([1, 2, 3, 4, 5]).toString()
    == [6, 7, 8, 6, 6, 7, 6, 8, 9].toString());

let arr2 = [
    new FooCmp(1),
    new FooCmp(1),
    new FooCmp(1),
    new FooCmp(2),
    new FooCmp(2),
    new FooCmp(2),
    new FooCmp(3),
    new FooCmp(3),
    new FooCmp(3),
    new FooCmp(4),
    new FooCmp(4),
    new FooCmp(4)
].removeAllItems(
    [
        new FooCmp(1),
        new FooCmp(2),
        new FooCmp(3)
    ]
);
testing.AreEqual(arr2[0].number, 4);
testing.AreEqual(arr2[1].number, 4);
testing.AreEqual(arr2[2].number, 4);
testing.IsUndefined(arr2[3]);


//REMOVE ELEMENT
testing.Assert([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4].removeAllOccurrences(1).toString() == [2, 2, 2, 3, 3, 3, 4, 4, 4].toString());
testing.Assert([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4].removeAllOccurrences(2).toString() == [1, 1, 1, 3, 3, 3, 4, 4, 4].toString());
testing.Assert([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4].removeAllOccurrences(4).toString() == [1, 1, 1, 2, 2, 2, 3, 3, 3].toString());
testing.Assert([1, 4, 6, 7, 2, 3, 4, 8, 5, 6, 3, 1, 4, 6, 7, 6, 5, 1, 2, 8, 9, 2, 4, 3, 1].removeAllOccurrences(1).toString()
    == [4, 6, 7, 2, 3, 4, 8, 5, 6, 3, 4, 6, 7, 6, 5, 2, 8, 9, 2, 4, 3].toString());
let arr3 = [
    new FooCmp(1),
    new FooCmp(1),
    new FooCmp(1),
    new FooCmp(2),
    new FooCmp(2),
    new FooCmp(2),
    new FooCmp(3),
    new FooCmp(3),
    new FooCmp(3),
    new FooCmp(4),
    new FooCmp(4),
    new FooCmp(4)
].removeAllOccurrences(
    new FooCmp(1)
);

testing.AreEqual(arr3[0].number, 2);
testing.AreEqual(arr3[1].number, 2);
testing.AreEqual(arr3[2].number, 2);
testing.AreEqual(arr3[3].number, 3);
testing.AreEqual(arr3[4].number, 3);
testing.AreEqual(arr3[5].number, 3);
testing.AreEqual(arr3[6].number, 4);
testing.AreEqual(arr3[7].number, 4);
testing.AreEqual(arr3[8].number, 4);


//REMOVE ALL INDEXES
testing.Assert([1, 2, 3, 4, 1, 2, 3, 4, 4, 1, 2, 3, 4, 1].removeItemsAt([0, 1, 2, 3, 4, 5, 6]).toString() == [4, 4, 1, 2, 3, 4, 1].toString());
testing.Assert([1, 2, 3, 4, 1, 2, 3, 4, 4, 1, 2, 3, 4, 1].removeItemsAt([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]).toString() == [].toString());
testing.Assert([1, 2, 3, 4, 1, 2, 3, 4, 4, 1, 2, 3, 4, 1].removeItemsAt([13, 12, 11, 10]).toString() == [1, 2, 3, 4, 1, 2, 3, 4, 4, 1].toString());

//REMOVE INDEX
testing.Assert([1, 2, 3, 4, 1, 2, 3, 4, 4, 1, 2, 3, 4, 1].removeItemAt(0).toString() == [2, 3, 4, 1, 2, 3, 4, 4, 1, 2, 3, 4, 1].toString());
testing.Assert([1, 2, 3, 4, 1, 2, 3, 4, 4, 1, 2, 3, 4, 1].removeItemAt(13).toString() == [1, 2, 3, 4, 1, 2, 3, 4, 4, 1, 2, 3, 4].toString());
testing.Assert([1, 2, 3, 4, 1, 2, 3, 4, 4, 1, 2, 3, 4, 1].removeItemAt(1).toString() == [1, 3, 4, 1, 2, 3, 4, 4, 1, 2, 3, 4, 1].toString());


//SHUFFLE
[1, 2, 3, 4, 1, 2, 3, 4, 4, 1, 2, 3, 4, 1].shuffle();

//FIRST
testing.AreEqual([1, 2, 3, 4].first(), 1);
testing.AreEqual([1].first(), 1);
testing.IsUndefined([].first());

//LAST
testing.AreEqual([1, 2, 3, 4].last(), 4);
testing.AreEqual([1].last(), 1);
testing.IsUndefined([].last());


testing.EndTestingLog();
