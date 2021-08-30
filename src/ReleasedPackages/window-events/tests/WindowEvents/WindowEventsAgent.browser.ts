import { BrowserTestAgent } from "@drozdik.m/web-unit-test";
import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { WindowEvents } from "../../src/WindowEvents";

let unitTest = new UnitTest("Window Events");

unitTest.AddAsyncTestCase("DOM load", function (Done, Fail)
{
    WindowEvents.OnDOMReady.Add(function ()
    {
        Done();
    });
});

unitTest.AddAsyncTestCase("Page load", function (Done, Fail)
{
    WindowEvents.OnLoad.Add(function ()
    {
        Done();
    });
});

unitTest.AddAsyncTestCase("Resize", function (Done, Fail)
{
    let i = 0;
    WindowEvents.OnResize.Add(function ()
    {
        i++;
    });

    WindowEvents.OnDOMReady.Add(function ()
    {
        let event = document.createEvent("Event");
        event.initEvent("resize", true, true);
        window.dispatchEvent(event);

        try
        {
            Assert.AreNotEqual(0, i);
        }
        catch
        {
            Fail();
        }

        Done();
    });
});

unitTest.AddAsyncTestCase("Scroll", function (Done, Fail)
{
    let i = 0;
    WindowEvents.OnScroll.Add(function ()
    {
        i++;
    });

    WindowEvents.OnDOMReady.Add(function ()
    {
        let event = document.createEvent("Event");
        event.initEvent("scroll", true, true);
        window.dispatchEvent(event);

        try
        {
            Assert.AreNotEqual(0, i);
        }
        catch
        {
            Fail();
        }

        Done();
    });
});


let browserTestAgent = new BrowserTestAgent(unitTest);
browserTestAgent.Run();
