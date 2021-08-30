import { BrowserTestAgent } from "@drozdik.m/web-unit-test";
import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { LoadingAnimation } from "../../src/LoadingAnimation";


let unitTest = new UnitTest("Loading Animation");


unitTest.AddSyncTestCase("Show", function ()
{
    Assert.IsNull(document.getElementById("fullscreenLoadingScreen"));

    LoadingAnimation.Show();
    Assert.IsNotNull(document.getElementById("fullscreenLoadingScreen"));
});

unitTest.AddSyncTestCase("Hide", function ()
{
    Assert.IsNotNull(document.getElementById("fullscreenLoadingScreen"));

    LoadingAnimation.Hide();
    Assert.IsNotNull(document.getElementById("fullscreenLoadingScreen"));
});

let browserTestAgent = new BrowserTestAgent(unitTest);
browserTestAgent.Run();