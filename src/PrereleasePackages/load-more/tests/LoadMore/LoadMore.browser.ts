import { UnitTest } from "@drozdik.m/unit-test"
import { BrowserTestAgent } from "@drozdik.m/web-unit-test"

let unitTest = new UnitTest("Load more");

document.body.insertAdjacentHTML("beforeend", `
        
`);


unitTest.AddSyncTestCase("No tests", function ()
{
    
});

let browserTestAgent = new BrowserTestAgent(unitTest);
browserTestAgent.Run();