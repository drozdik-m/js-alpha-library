import { PrimitiveContainer } from "../src/PrimitiveContainer";
import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";
import { IComparable } from "@drozdik.m/common-interfaces/IComparable";
import { IComparator } from "@drozdik.m/common-interfaces/IComparator";


let unitTest = new UnitTest("Primitive Container");

unitTest.AddTestCase("Value property", function ()
{
    let container = new PrimitiveContainer<string>("teststring");
    Assert.AreEqual(container.value, "teststring");
    container.value = "teststring1";
    Assert.AreEqual(container.value, "teststring1");
});

unitTest.AddTestCase("Getter & setter", function ()
{
    let container = new PrimitiveContainer<string>("teststring");
    container.SetValue("primitive ma ass");
    Assert.AreEqual(container.value, "primitive ma ass");
    Assert.AreEqual(container.GetValue(), "primitive ma ass");
});

unitTest.AddTestCase("Clone", function ()
{
    let container = new PrimitiveContainer<string>("primitive ma ass");
    let container1 = container.Clone();
    container1.SetValue("i lik mimz");
    Assert.AreEqual(container.value, "primitive ma ass");
    Assert.AreEqual(container.GetValue(), "primitive ma ass");
    Assert.AreEqual(container1.value, "i lik mimz");
    Assert.AreEqual(container1.GetValue(), "i lik mimz");
});

unitTest.AddTestCase("Clear", function ()
{
    let container1 = new PrimitiveContainer<string>("i lik mimz");
    container1.Clear();
    Assert.IsNull(container1.value);
    Assert.IsNull(container1.GetValue());
    
});

unitTest.AddTestCase("Dispose", function ()
{
    let container = new PrimitiveContainer<string>("test text");
    container.Dispose();
    Assert.IsNull(container.value);
    Assert.IsNull(container.GetValue());
});




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
            return b.number - a.number;
        }
    }
    Clone(): FooCmp
    {
        return new FooCmp(this.number);
    }
}


unitTest.AddTestCase("Comparator", function ()
{
    let container2 = new PrimitiveContainer<FooCmp>(new FooCmp(1));
    let container2Clone1 = container2.Clone();
    container2Clone1.GetValue().number = -1;
    Assert.AreEqual(container2.GetValue().number, 1);
    Assert.AreEqual(container2Clone1.GetValue().number, -1);
});


unitTest.Run();
