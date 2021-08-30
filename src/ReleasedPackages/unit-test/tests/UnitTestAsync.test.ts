import { UnitTest, Assert } from "../src/UnitTest";


let unitTest = new UnitTest("Assert Test");

unitTest.AddAsyncTestCase("Basic timeout 1", function (Done: Function)
{
    setTimeout(function ()
    {
        Done();
    }, 1000);
});

unitTest.AddSyncTestCase("Basic sync 1", function ()
{
    Assert.IsTrue(true);
});

unitTest.AddAsyncTestCase("Basic timeout 2", function (Done: Function)
{
    setTimeout(function ()
    {
        Done();
    }, 500);
});

unitTest.AddSyncTestCase("Basic sync 2", function ()
{
    Assert.IsTrue(true);
    //Assert.IsTrue(false);
});

unitTest.AddAsyncTestCase("Basic timeout 3", function (Done: Function, Fail: Function)
{
    setTimeout(function ()
    {
        //Assert.Fail();
        //Fail();
        Done();
    }, 1500);
});

unitTest.Run(10000);