import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { Option } from "../src/Option";
import { OptionError } from "../errors/OptionError";

let unitTest = new UnitTest("Option");

unitTest.AddTestCase("Is defined", function ()
{
    let option1 = new Option<number>(1);
    let option2 = new Option<string>("yep");
    let option3 = new Option<object>({});

    Assert.IsTrue(option1.IsDefined());
    Assert.IsTrue(option2.IsDefined());
    Assert.IsTrue(option3.IsDefined());

    let undefined;
    Assert.IsFalse(new Option<any>(undefined).IsDefined());
    Assert.IsFalse(new Option<null>(null).IsDefined());
});

unitTest.AddTestCase("Is empty", function ()
{
    let option1 = new Option<number>(1);
    let option2 = new Option<string>("yep");
    let option3 = new Option<object>({});

    Assert.IsFalse(option1.IsEmpty());
    Assert.IsFalse(option2.IsEmpty());
    Assert.IsFalse(option3.IsEmpty());

    let undefined;
    Assert.IsTrue(new Option<any>(undefined).IsEmpty());
    Assert.IsTrue(new Option<null>(null).IsEmpty());
});

unitTest.AddTestCase("Get value", function ()
{
    let option1 = new Option<number>(1);
    let option2 = new Option<string>("yep");
    let option3 = new Option<object>({});
    let undefined;
    let option4 = new Option<any>(undefined);
    let option5 = new Option<null>(null)

    Assert.AreEqual(1, option1.Get());
    Assert.AreEqual("yep", option2.Get());
    Assert.IsTrue(typeof option3.Get() == "object");

    try
    {
        option4.Get();
        Assert.Fail();
    }
    catch (e)
    {
        
    }

    try
    {
        option5.Get();
        Assert.Fail();
    }
    catch (e)
    {

    }
});

unitTest.Run();

