import { KeyValuePair } from "../src/KeyValuePair";
import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { IComparable } from "@drozdik.m/common-interfaces/IComparable";
import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";

let unitTest = new UnitTest("KeyValue Pair");

unitTest.AddTestCase("Empty Constructor", function ()
{
    let pair1 = new KeyValuePair<any, any>();

    Assert.IsNull(pair1.Key());
    Assert.IsNull(pair1.value);
    Assert.IsNull(pair1.Value());    
});


unitTest.AddTestCase("Constructor", function ()
{
    let pair1 = new KeyValuePair<number, string>(1, "2");

    Assert.AreEqual(1, pair1.Key());
    Assert.AreEqual("2", pair1.value);
    Assert.AreEqual("2", pair1.Value()); 
});

unitTest.AddTestCase("Getter, Setter", function ()
{
    let pair1 = new KeyValuePair<number, string>(1, "2");

    Assert.AreEqual(1, pair1.Key());
    Assert.AreEqual("2", pair1.value);
    Assert.AreEqual("2", pair1.Value()); 

    pair1.SetValue("3");

    Assert.AreEqual(1, pair1.Key());
    Assert.AreEqual("3", pair1.value);
    Assert.AreEqual("3", pair1.Value()); 
});

unitTest.AddTestCase("Clone", function ()
{
    let pair = new KeyValuePair<number, number>(1, 2);

    let pairCopy = pair.Clone();
    pairCopy.SetValue(22);

    Assert.AreEqual(1, pair.Key());
    Assert.AreEqual(2, pair.Value());
    Assert.AreEqual(1, pairCopy.Key());
    Assert.AreEqual(22, pairCopy.Value());

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
    let pair = new KeyValuePair<FooCmp, FooCmp>(foocmp1, foocmp2);

    let pairCopy = pair.Clone();
    pairCopy.Key().number = 11;
    pairCopy.Value().number = 22;

    Assert.AreEqual(1, pair.Key().number);
    Assert.AreEqual(2, pair.Value().number);
    Assert.AreEqual(11, pairCopy.Key().number);
    Assert.AreEqual(22, pairCopy.Value().number);

});

unitTest.Run();