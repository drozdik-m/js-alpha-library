import { BrowserTestAgent } from "@drozdik.m/web-unit-test";
import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { CommonDialogWindow } from "../../src/CommonDialogWindow";

let unitTest = new UnitTest("Common dialog window");


unitTest.AddSyncTestCase("Success", function ()
{
    Assert.IsNull(document.getElementById("dialogSuccess"));
    CommonDialogWindow.Success("Success!");
    Assert.IsNotNull(document.getElementById("dialogSuccess"));
});

unitTest.AddSyncTestCase("Error", function ()
{
    Assert.IsNull(document.getElementById("dialogError"));
    CommonDialogWindow.Error("Error!");
    Assert.IsNotNull(document.getElementById("dialogError"));
});

unitTest.AddSyncTestCase("Warning", function ()
{
    Assert.IsNull(document.getElementById("dialogWarning"));
    CommonDialogWindow.Warning("Warning!");
    Assert.IsNotNull(document.getElementById("dialogWarning"));
});

unitTest.AddSyncTestCase("Info", function ()
{
    Assert.IsNull(document.getElementById("dialogInfo"));
    CommonDialogWindow.Info("Info!");
    Assert.IsNotNull(document.getElementById("dialogInfo"));
});

unitTest.AddSyncTestCase("Confirm black", function ()
{
    Assert.IsNull(document.getElementById("dialogGreyConfirmation"));

    let i = 0;
    CommonDialogWindow.BlackConfirm("", function ()
    {
        i++;
    });

    Assert.IsNotNull(document.getElementById("dialogGreyConfirmation"));

    let clickEvent = document.createEvent("Event");
    clickEvent.initEvent("click", true, true);
    document.querySelector("#dialogGreyConfirmation .confirmButton").dispatchEvent(clickEvent);

    Assert.AreEqual(1, i);

    CommonDialogWindow.BlackConfirm("", function ()
    {
        i++;
        i++;
    });

    clickEvent = document.createEvent("Event");
    clickEvent.initEvent("click", true, true);
    document.querySelector("#dialogGreyConfirmation .confirmButton").dispatchEvent(clickEvent);

    Assert.AreEqual(3, i);

});

unitTest.AddSyncTestCase("Confirm red", function ()
{
    Assert.IsNull(document.getElementById("dialogRedConfirmation"));

    let i = 0;
    CommonDialogWindow.RedConfirm("", function ()
    {
        i++;
    });

    Assert.IsNotNull(document.getElementById("dialogRedConfirmation"));

    let clickEvent = document.createEvent("Event");
    clickEvent.initEvent("click", true, true);
    document.querySelector("#dialogRedConfirmation .confirmButton").dispatchEvent(clickEvent);

    Assert.AreEqual(1, i);

    CommonDialogWindow.RedConfirm("", function ()
    {
        i++;
        i++;
    });

    clickEvent = document.createEvent("Event");
    clickEvent.initEvent("click", true, true);
    document.querySelector("#dialogRedConfirmation .confirmButton").dispatchEvent(clickEvent);

    Assert.AreEqual(3, i);

});

unitTest.AddSyncTestCase("Confirm green", function ()
{
    Assert.IsNull(document.getElementById("dialogGreenConfirmation"));

    let i = 0;
    CommonDialogWindow.GreenConfirm("", function ()
    {
        i++;
    });

    Assert.IsNotNull(document.getElementById("dialogGreenConfirmation"));

    let clickEvent = document.createEvent("Event");
    clickEvent.initEvent("click", true, true);
    document.querySelector("#dialogGreenConfirmation .confirmButton").dispatchEvent(clickEvent);

    Assert.AreEqual(1, i);

    CommonDialogWindow.GreenConfirm("", function ()
    {
        i++;
        i++;
    });

    clickEvent = document.createEvent("Event");
    clickEvent.initEvent("click", true, true);
    document.querySelector("#dialogGreenConfirmation .confirmButton").dispatchEvent(clickEvent);

    Assert.AreEqual(3, i);

});

unitTest.AddSyncTestCase("Confirm yellow", function ()
{
    Assert.IsNull(document.getElementById("dialogYellowConfirmation"));

    let i = 0;
    CommonDialogWindow.YellowConfirm("", function ()
    {
        i++;
    });

    Assert.IsNotNull(document.getElementById("dialogYellowConfirmation"));

    let clickEvent = document.createEvent("Event");
    clickEvent.initEvent("click", true, true);
    document.querySelector("#dialogYellowConfirmation .confirmButton").dispatchEvent(clickEvent);

    Assert.AreEqual(1, i);

    CommonDialogWindow.YellowConfirm("", function ()
    {
        i++;
        i++;
    });

    clickEvent = document.createEvent("Event");
    clickEvent.initEvent("click", true, true);
    document.querySelector("#dialogYellowConfirmation .confirmButton").dispatchEvent(clickEvent);

    Assert.AreEqual(3, i);

});

let browserTestAgent = new BrowserTestAgent(unitTest);
browserTestAgent.Run();