import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { BrowserTestAgent } from "../../src/BrowserTestAgent";


let unitTest = new UnitTest("Minor DOM test");


unitTest.AddTestCase("Just running", function ()
{
    Assert.IsTrue(true);
});

unitTest.AddTestCase("Detect \"testHere\"", function ()
{
    Assert.IsNotNull(document.getElementById("testHere"));
});

unitTest.AddTestCase("Create new element", function ()
{
    let newDiv = document.createElement("div");
    newDiv.id = "newDiv";
    document.body.insertBefore(newDiv, document.getElementById("testHere"));
    Assert.IsNotNull(document.getElementById("testHere"));
    Assert.IsNotNull(document.getElementById("newDiv"));
});

let browserAgent = new BrowserTestAgent(unitTest);
browserAgent.Run();
