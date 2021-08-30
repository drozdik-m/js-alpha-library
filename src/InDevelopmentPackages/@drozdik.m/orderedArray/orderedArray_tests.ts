import { Testing } from "assert-testing";
import { OrderedArray } from "../orderedArray/orderedArray";


function TestOrderedArray()
{
    let testing = new Testing("Ordered Array");
    testing.StartTestingLog();

    //INSERT TEST
    let orderedArray1 = new OrderedArray<number>();
    orderedArray1.Insert(5);
    orderedArray1.Insert(6);
    orderedArray1.Insert(7);
    orderedArray1.Insert(8);
    orderedArray1.Insert(4);
    orderedArray1.Insert(3);
    orderedArray1.Insert(7);
    orderedArray1.Insert(1);
    orderedArray1.Insert(2);
    orderedArray1.Insert(-1);
    orderedArray1.Insert(0);
    orderedArray1.Insert(10);
    orderedArray1.Insert(10);
    orderedArray1.Insert(4);
    orderedArray1.Insert(10);
    orderedArray1.Insert(9);
    let number = -1;
    for (let item = orderedArray1.Begin(); !item.IsAtEnd(); item.Next())
    {
        testing.Assert(item.Value() == number);
        number++;
    }
    testing.Assert(number == 11);
    testing.Assert(orderedArray1.Begin().Value() == -1);
    testing.Assert(orderedArray1.End().Value() == 10);
    orderedArray1.Clear();
    testing.Assert(orderedArray1.Empty());
    testing.Assert(orderedArray1.Size() == 0);

    //FIND
    let orderedArray2 = new OrderedArray<string>();
    orderedArray2.Insert("5");
    orderedArray2.Insert("6");
    orderedArray2.Insert("7");
    orderedArray2.Insert("0");
    orderedArray2.Insert("8");
    orderedArray2.Insert("4");
    orderedArray2.Insert("3");
    orderedArray2.Insert("1");
    orderedArray2.Insert("2");
    orderedArray2.Insert("2");
    orderedArray2.Insert("-1");
    orderedArray2.Insert("0");
    orderedArray2.Insert("1");
    orderedArray2.Insert("9");
    number = -1;
    for (let item = orderedArray2.Begin(); !item.IsAtEnd(); item.Next())
    {
        testing.Assert(item.Value() == number.toString());
        number++;
    }
    testing.Assert(number == 10);

    testing.Assert(orderedArray2.Find("-1").Value() == "-1");
    testing.Assert(orderedArray2.Find("9").Value() == "9");
    testing.Assert(orderedArray2.Find("11") == null);
    let orderedArrayIterator1 = orderedArray2.Find("9");
    testing.Assert(!orderedArrayIterator1.IsAtEnd());
    orderedArrayIterator1.Next();
    testing.Assert(orderedArrayIterator1.IsAtEnd());

    //REMOVE
    let orderedArray3 = new OrderedArray<boolean>();
    orderedArray3.Insert(true);
    orderedArray3.Insert(false);
    orderedArray3.Insert(true);
    orderedArray3.Insert(false);
    testing.Assert(orderedArray3.Size() == 2);
    orderedArray3.Remove(orderedArray3.Find(true));
    testing.Assert(orderedArray3.Size() == 1);
    testing.Assert(orderedArray3.Begin().Value() == false);
    testing.Assert(!orderedArray3.Empty());
    orderedArray3.Remove(orderedArray3.Find(false));
    testing.Assert(orderedArray3.Size() == 0);
    testing.Assert(orderedArray3.Empty());

    testing.EndTestingLog();
}
(<any>window).TestOrderedArray = TestOrderedArray;
