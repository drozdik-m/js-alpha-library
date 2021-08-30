import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { BrowserTestAgent } from "../../src/BrowserTestAgent";


let unitTest = new UnitTest("Basic browser test");

unitTest.AddTestCase("Run and close", function ()
{
    Assert.IsTrue(true);
});

let browserAgent = new BrowserTestAgent(unitTest);
browserAgent.Run();
