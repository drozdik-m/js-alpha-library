import { UnitTest, Assert } from "../src/UnitTest";


let unitTest = new UnitTest("Assert Test");

unitTest.AddTestCase("Fail assert", function ()
{
    let err = false;

    try
    {
        Assert.Fail();
        err = true;
    }
    catch (e)
    {

    }

    if (err)
        throw "Fail failed";
});

unitTest.AddTestCase("Basic assert", function ()
{
    Assert.Assert(true);

    try
    {
        Assert.Assert(false);
        Assert.Fail();
    }
    catch (e)
    {

    }

});

unitTest.AddTestCase("Equal assert", function ()
{
    Assert.AreEqual("1", "1");
    try { Assert.AreEqual("1", "2"); Assert.Fail() } catch { }

    Assert.AreNotEqual("1", "2");
    try { Assert.AreNotEqual("1", "1"); Assert.Fail() } catch { }

});

unitTest.AddTestCase("Same assert", function ()
{
    Assert.AreSame("s", "a");
    try { Assert.AreSame("s", 1); Assert.Fail() } catch { }

    Assert.AreNotSame("s", {});
    try { Assert.AreNotSame(true, false); Assert.Fail() } catch { }

});

unitTest.AddTestCase("Null assert", function ()
{
    Assert.IsNull(null);
    try { Assert.IsNull(false); Assert.Fail() } catch { }

    Assert.IsNotNull({});
    try { Assert.IsNotNull(null); Assert.Fail() } catch { }

});

unitTest.AddTestCase("Define assert", function ()
{
    let undefinedVariable: any;
    let definedVariable: any = false;

    Assert.IsUndefined(undefinedVariable);
    try { Assert.IsUndefined(definedVariable); Assert.Fail() } catch { }

    Assert.IsDefined(definedVariable);
    try { Assert.IsDefined(undefinedVariable); Assert.Fail() } catch { }

});

unitTest.AddTestCase("Boolean assert", function ()
{
    Assert.IsTrue(true);
    try { Assert.IsTrue(false); Assert.Fail() } catch { }

    Assert.IsFalse(false);
    try { Assert.IsFalse(true); Assert.Fail() } catch { }
});

unitTest.AddTestCase("Error count", function ()
{
    Assert.ResetErrorCount();
    Assert.AreEqual(0, Assert.ErrorCount());

    try { Assert.IsFalse(true); Assert.Fail() } catch { }
    try { Assert.IsFalse(true); Assert.Fail() } catch { }
    try { Assert.IsFalse(true); Assert.Fail() } catch { }

    Assert.AreEqual(3, Assert.ErrorCount());
});


unitTest.Run();
