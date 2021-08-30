import { BrowserTestAgent } from "@drozdik.m/web-unit-test";
import { UnitTest, Assert } from "@drozdik.m/unit-test";

let unitTest = new UnitTest("Article Maker");

unitTest.AddTestCase("Empty case", function ()
{
    
});

let browserTestAgent = new BrowserTestAgent(unitTest);
browserTestAgent.Run();