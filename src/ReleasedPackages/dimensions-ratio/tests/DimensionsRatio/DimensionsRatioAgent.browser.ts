import { BrowserTestAgent } from "@drozdik.m/web-unit-test";
import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { DimensionsRatio } from "../../src/DimensionsRatio";
import { DimensionsHelper } from "@drozdik.m/dimensions-helper";

let unitTest = new UnitTest("Dimensions Ratio");

document.body.insertAdjacentHTML("beforeend", `
        <div id="div1"></div>
        <div id="div2"></div>
<style>

#div1 {
    height: 50px;
    width: 100px;
}

#div2 {
    height: 50px;
    width: 100px;
}

</style>
`);

unitTest.AddSyncTestCase("ByBidth 1:1", function ()
{
    let ratio = new DimensionsRatio(document.getElementById("div1"));
    ratio.ByWidth(1, 1);

    let dimHelper = new DimensionsHelper(document.getElementById("div1"));
    Assert.AreEqual(100, dimHelper.Height());
    Assert.AreEqual(100, dimHelper.Width());
});

unitTest.AddSyncTestCase("ByBidth 16:9", function ()
{
    let ratio = new DimensionsRatio(document.getElementById("div1"));
    ratio.ByWidth(16, 9);

    let dimHelper = new DimensionsHelper(document.getElementById("div1"));
    Assert.AreEqual(56, Math.floor(dimHelper.Height()));
    Assert.AreEqual(100, dimHelper.Width());
});

unitTest.AddSyncTestCase("ByBidth 1:1 static", function ()
{
    DimensionsRatio.ByWidth(document.getElementById("div1"), 1, 1)

    let dimHelper = new DimensionsHelper(document.getElementById("div1"));
    Assert.AreEqual(100, dimHelper.Height());
    Assert.AreEqual(100, dimHelper.Width());
});

unitTest.AddSyncTestCase("ByBidth 16:9 static", function ()
{
    DimensionsRatio.ByWidth(document.getElementById("div1"), 16, 9);

    let dimHelper = new DimensionsHelper(document.getElementById("div1"));
    Assert.AreEqual(56, Math.floor(dimHelper.Height()));
    Assert.AreEqual(100, dimHelper.Width());
});

unitTest.AddSyncTestCase("ByHeight 1:1", function ()
{
    let ratio = new DimensionsRatio(document.getElementById("div2"));
    ratio.ByHeight(1, 1);

    let dimHelper = new DimensionsHelper(document.getElementById("div2"));
    Assert.AreEqual(50, dimHelper.Height());
    Assert.AreEqual(50, dimHelper.Width());
});

unitTest.AddSyncTestCase("ByHeight 16:9", function ()
{
    let ratio = new DimensionsRatio(document.getElementById("div2"));
    ratio.ByHeight(16, 9);

    let dimHelper = new DimensionsHelper(document.getElementById("div2"));
    Assert.AreEqual(50, dimHelper.Height());
    Assert.AreEqual(88, Math.floor(dimHelper.Width()));
});

unitTest.AddSyncTestCase("ByHeight 1:1 static", function ()
{
    DimensionsRatio.ByHeight(document.getElementById("div2"), 1, 1);

    let dimHelper = new DimensionsHelper(document.getElementById("div2"));
    Assert.AreEqual(50, dimHelper.Height());
    Assert.AreEqual(50, dimHelper.Width());
});

unitTest.AddSyncTestCase("ByHeight 16:9 static", function ()
{
    DimensionsRatio.ByHeight(document.getElementById("div2"), 16, 9);

    let dimHelper = new DimensionsHelper(document.getElementById("div2"));
    Assert.AreEqual(50, dimHelper.Height());
    Assert.AreEqual(88, Math.floor(dimHelper.Width()));
});

document.addEventListener("DOMContentLoaded", function ()
{
    let browserTestAgent = new BrowserTestAgent(unitTest);
    browserTestAgent.Run();
});