import { BrowserTestAgent } from "@drozdik.m/web-unit-test";
import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { DialogWindow } from "../../src/DialogWindow";

let unitTest = new UnitTest("Dialog window");

document.body.insertAdjacentHTML("beforeend", `
        <div id="dialog1">

        </div>
`);

unitTest.AddAsyncTestCase("Open and close", function (Done, Fail)
{
    let dialog = new DialogWindow("dialog1");

    Assert.IsFalse(document.getElementById("dialog1").parentElement.classList.contains("opened"));

    dialog.Open();

    setTimeout(function ()
    {
        try
        {
            Assert.IsTrue(document.getElementById("dialog1").parentElement.classList.contains("opened"));
            Done();
        }
        catch
        {
            Fail();
        }
    }, 100);
});

let browserTestAgent = new BrowserTestAgent(unitTest);
browserTestAgent.Run();