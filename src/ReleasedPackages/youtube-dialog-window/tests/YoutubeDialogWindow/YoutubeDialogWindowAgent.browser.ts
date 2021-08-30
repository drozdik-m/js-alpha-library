import { BrowserTestAgent } from "@drozdik.m/web-unit-test";
import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { YoutubeDialogWindow } from "../../src/YoutubeDialogWindow";

let unitTest = new UnitTest("Youtube dialog window");


unitTest.AddSyncTestCase("", function ()
{
    
});

let browserTestAgent = new BrowserTestAgent(unitTest);
browserTestAgent.Run();