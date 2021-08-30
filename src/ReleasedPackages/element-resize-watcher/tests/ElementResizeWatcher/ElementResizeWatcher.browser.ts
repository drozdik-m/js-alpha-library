import { BrowserTestAgent } from "@drozdik.m/web-unit-test";
import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { ElementResizeWatcher } from "../../src/ElementResizeWatcher";


let unitTest = new UnitTest("Element Resize Watcher");

document.getElementsByTagName("body").item(0).innerHTML = `
<div id="wrapper">
    <div id="element">&nbsp;</div>
</div>
<style>

#wrapper {
    height: 100px;
    width: 100px;
}

#element{
    height: 50px;
    width: 50px;
    max-width: 100%;
}

</style>
`;

unitTest.AddSyncTestCase("No resize", function ()
{
    let i = 0;
    let element = document.getElementById("element");
    let wrapper = document.getElementById("wrapper");

    let watcher = new ElementResizeWatcher(element);
    watcher.OnResize.Add(function ()
    {
        i++;
    });

    wrapper.style.width = "60px";
    Assert.AreEqual(0, i);
});

unitTest.AddSyncTestCase("The element resize", function ()
{
    let i = 0;
    let element = document.getElementById("element");
    let wrapper = document.getElementById("wrapper");

    let watcher = new ElementResizeWatcher(element);
    watcher.OnResize.Add(function ()
    {
        i++;
    });

    element.style.width = "10px";
    window.dispatchEvent(new Event("resize"));
    element.style.width = "50px";
    window.dispatchEvent(new Event("resize"));
    Assert.AreEqual(2, i);
});


unitTest.AddSyncTestCase("Wrapper resize", function ()
{
    let i = 0;
    let element = document.getElementById("element");
    let wrapper = document.getElementById("wrapper");

    let watcher = new ElementResizeWatcher(element);
    watcher.OnResize.Add(function ()
    {
        i++;
    });

    wrapper.style.width = "10px";
    window.dispatchEvent(new Event("resize"));
    wrapper.style.width = "100px";
    Assert.AreEqual(1, i);
});

let browserTestAgent = new BrowserTestAgent(unitTest);
browserTestAgent.Run();