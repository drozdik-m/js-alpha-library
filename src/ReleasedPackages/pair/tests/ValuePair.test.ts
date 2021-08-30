import { ValuePair } from "../src/ValuePair";
import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { IComparable } from "@drozdik.m/common-interfaces/IComparable";
import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";

let unitTest = new UnitTest("Value Pair");

unitTest.AddTestCase("Empty Constructor", function ()
{
    let pair1 = new ValuePair<any, any>();

    Assert.IsNull(pair1.first);
    Assert.IsNull(pair1.second);
    Assert.IsNull(pair1.First());
    Assert.IsNull(pair1.Second());
});


unitTest.AddTestCase("Constructor", function ()
{
    let pair1 = new ValuePair<number, string>(1, "2");

    Assert.AreEqual(1, pair1.first);
    Assert.AreEqual("2", pair1.second);
    Assert.AreEqual(1, pair1.First());
    Assert.AreEqual("2", pair1.Second());
});

unitTest.AddTestCase("Getter, Setter", function ()
{
    let pair1 = new ValuePair<number, string>(1, "2");

    Assert.AreEqual(1, pair1.first);
    Assert.AreEqual("2", pair1.second);
    Assert.AreEqual(1, pair1.First());
    Assert.AreEqual("2", pair1.Second());

    pair1.SetFirst(2);
    pair1.SetSecond("3");

    Assert.AreEqual(2, pair1.first);
    Assert.AreEqual("3", pair1.second);
    Assert.AreEqual(2, pair1.First());
    Assert.AreEqual("3", pair1.Second());
});

unitTest.AddTestCase("Clone", function ()
{
    let pair = new ValuePair<number, number>(1, 2);

    let pairCopy = pair.Clone();
    pairCopy.SetFirst(11);
    pairCopy.SetSecond(22);

    Assert.AreEqual(1, pair.First());
    Assert.AreEqual(2, pair.Second());
    Assert.AreEqual(11, pairCopy.First());
    Assert.AreEqual(22, pairCopy.Second());

});

unitTest.AddTestCase("Clone, IClonable", function ()
{
    class FooCmp implements IComparable<FooCmp>, IClonable<FooCmp>
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
                return a.number - b.number;
            }
        }
        Clone(): FooCmp
        {
            return new FooCmp(this.number);
        }
    }

    let foocmp1 = new FooCmp(1);
    let foocmp2 = new FooCmp(2);
    let foocmp3 = new FooCmp(3);
    let foocmp4 = new FooCmp(4);
    let pair = new ValuePair<FooCmp, FooCmp>(foocmp1, foocmp2);

    let pairCopy = pair.Clone();
    pairCopy.First().number = 11;
    pairCopy.Second().number = 22;

    Assert.AreEqual(1, pair.First().number);
    Assert.AreEqual(2, pair.Second().number);
    Assert.AreEqual(11, pairCopy.First().number);
    Assert.AreEqual(22, pairCopy.Second().number);

});

unitTest.Run();