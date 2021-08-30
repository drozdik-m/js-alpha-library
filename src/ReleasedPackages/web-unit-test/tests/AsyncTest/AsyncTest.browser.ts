import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { BrowserTestAgent } from "../../src/BrowserTestAgent";


let unitTest = new UnitTest("Async test");

unitTest.AddSyncTestCase("Sync test case", function ()
{
    Assert.IsTrue(true);
});

unitTest.AddAsyncTestCase("Async test case", function (Done)
{
    setTimeout(function ()
    {
        Done();
    }, 500);
});

let browserAgent = new BrowserTestAgent(unitTest);
browserAgent.Run();
