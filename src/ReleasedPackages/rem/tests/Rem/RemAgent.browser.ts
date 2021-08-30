import { UnitTest, Assert } from "@drozdik.m/unit-test"
import { BrowserTestAgent } from "@drozdik.m/web-unit-test"
import { Rem } from "../../src/Rem";

let unitTest = new UnitTest("Rem");


unitTest.AddSyncTestCase("Rem 16px", function ()
{
    window.document.body.style.fontSize = "16px";
    Rem.Recalculate();
    Assert.AreEqual(16, Rem.InPx());
});

unitTest.AddSyncTestCase("Rem 14px", function ()
{
    window.document.body.style.fontSize = "14px";
    Rem.Recalculate();
    Assert.AreEqual(14, Rem.InPx());
});

unitTest.AddSyncTestCase("Rem 12px", function ()
{
    window.document.body.style.fontSize = "12px";
    Rem.Recalculate();
    Assert.AreEqual(12, Rem.InPx());
});

unitTest.AddSyncTestCase("Rem 10px", function ()
{
    window.document.body.style.fontSize = "10px";
    Rem.Recalculate();
    Assert.AreEqual(10, Rem.InPx());
});


let browserTestAgent = new BrowserTestAgent(unitTest);
browserTestAgent.Run();