import { ComparatorHandler } from "../src/ComparatorHandler";
import { IComparable } from "@drozdik.m/common-interfaces/IComparable";
import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import { UnitTest, Assert } from "@drozdik.m/unit-test";


//-----TESTING CLASSES-----
class NoIComparable
{
    someNumber: number;

    constructor(n: number)
    {
        this.someNumber = n;
    }
}

class YesIComparable implements IComparable<YesIComparable>
{
    someNumber: number;

    constructor(n: number)
    {
        this.someNumber = n;
    }

    GetComparator(): IComparator<YesIComparable> 
    {
        return function (a: YesIComparable, b: YesIComparable)
        {
            if (a.someNumber < b.someNumber)
                return 1;
            if (a.someNumber > b.someNumber)
                return -1;
            return 0;
        }
    }
}


let unitTest = new UnitTest("Comparator handler");

unitTest.AddTestCase("Default comparator", function ()
{
    let comparatorHandler1 = new ComparatorHandler<number>();
    Assert.AreEqual(comparatorHandler1.Compare(1, 2), -1);
    Assert.AreEqual(comparatorHandler1.Compare(2, 1), 1);
    Assert.AreEqual(comparatorHandler1.Compare(1, 1), 0);
});

unitTest.AddTestCase("Explicit comparator", function ()
{
    let comparatorHandler2 = new ComparatorHandler<number>(
        function (a: number, b: number)
        {
            if (a < b)
                return 1;
            if (a > b)
                return -1;
            return 0;
        });
    Assert.AreEqual(comparatorHandler2.Compare(1, 2), 1);
    Assert.AreEqual(comparatorHandler2.Compare(2, 1), -1);
    Assert.AreEqual(comparatorHandler2.Compare(1, 1), 0);
});

unitTest.AddTestCase("Automatic IComparable recognition", function ()
{
    let comparatorHandler3 = new ComparatorHandler<YesIComparable>();
    let object1 = new YesIComparable(1);
    let object2 = new YesIComparable(1);
    let object3 = new YesIComparable(2);
    Assert.AreEqual(comparatorHandler3.Compare(object1, object3), 1);
    Assert.AreEqual(comparatorHandler3.Compare(object3, object1), -1);
    Assert.AreEqual(comparatorHandler3.Compare(object1, object2), 0);
    comparatorHandler3.SetComparator(function (a: YesIComparable, b: YesIComparable)
    {
        return 2;
    });
    Assert.AreEqual(comparatorHandler3.Compare(object1, object3), 1);
    Assert.AreEqual(comparatorHandler3.Compare(object3, object1), 1);
    Assert.AreEqual(comparatorHandler3.Compare(object1, object2), 1);
    comparatorHandler3.SetAutomaticIComparableRecognition(true);
    Assert.AreEqual(comparatorHandler3.Compare(object1, object3), 1);
    Assert.AreEqual(comparatorHandler3.Compare(object3, object1), -1);
    Assert.AreEqual(comparatorHandler3.Compare(object1, object2), 0);
});

unitTest.AddTestCase("Explicit comparator and automatic IComparable recognition", function ()
{
    let object1 = new YesIComparable(1);
    let object2 = new YesIComparable(1);
    let object3 = new YesIComparable(2);
    let comparatorHandler4 = new ComparatorHandler<YesIComparable>(
        function (a: YesIComparable, b: YesIComparable)
        {
            return 2;
        });
    Assert.AreEqual(comparatorHandler4.Compare(object1, object3), 1);
    Assert.AreEqual(comparatorHandler4.Compare(object3, object1), 1);
    Assert.AreEqual(comparatorHandler4.Compare(object1, object2), 1);
});

unitTest.AddTestCase("Clone", function ()
{
    let comparatorHandler4 = new ComparatorHandler<YesIComparable>(
        function (a: YesIComparable, b: YesIComparable)
        {
            return 2;
        });
    let comparatorHandler5 = comparatorHandler4.Clone();
    comparatorHandler5.SetAutomaticIComparableRecognition(true);
    Assert.AreNotEqual((<any>comparatorHandler5).automaticIComparableRecognition, (<any>comparatorHandler4).automaticIComparableRecognition);

});

unitTest.Run();




