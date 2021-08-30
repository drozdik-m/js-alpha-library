import { WindowEvents } from "../src/WindowEvents";

WindowEvents.OnResize.Add(function ()
{
    console.log("Resize");
});

WindowEvents.OnLoad.Add(function ()
{
    console.log("Load");
});

WindowEvents.OnDOMReady.Add(function ()
{
    console.log("DOM Ready");
});

WindowEvents.OnScroll.Add(function ()
{
    console.log("Scroll");
});