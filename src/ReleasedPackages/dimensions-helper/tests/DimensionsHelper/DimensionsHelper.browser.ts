import { BrowserTestAgent } from "@drozdik.m/web-unit-test";
import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { DimensionsHelper } from "../../src/DimensionsHelper";

let unitTest = new UnitTest("Dimensions Helper");

document.body.insertAdjacentHTML("beforeend", `
        <div id="div1"></div>

<style>

#div1 {
    height: 1px;
    width: 2px;
    padding-top: 3px;
    padding-bottom: 4px;
    padding-left: 5px;
    padding-right: 6px;
    margin-top: 7px;
    margin-bottom: 8px;
    margin-left: 9px;
    margin-right: 10px;
    border: 1px solid black;
    border-left-width: 11px;
    border-right-width: 12px;
    border-top-width: 13px;
    border-bottom-width: 14px;
}

</style>
`);

unitTest.AddSyncTestCase("Height, Width", function ()
{
    let dimensionHelper = new DimensionsHelper(document.getElementById("div1"));
    Assert.AreEqual(1, dimensionHelper.Height());
    Assert.AreEqual(2, dimensionHelper.Width());
});

unitTest.AddSyncTestCase("Height padding, Width padding", function ()
{
    let dimensionHelper = new DimensionsHelper(document.getElementById("div1"));
    Assert.AreEqual(8, dimensionHelper.HeightWithPadding());
    Assert.AreEqual(13, dimensionHelper.WidthWithPadding());
});

unitTest.AddSyncTestCase("Height border, Width border", function ()
{
    let dimensionHelper = new DimensionsHelper(document.getElementById("div1"));
    Assert.AreEqual(35, dimensionHelper.HeightWithBorder());
    Assert.AreEqual(36, dimensionHelper.WidthWithBorder());
});

unitTest.AddSyncTestCase("Height margin, Width margin", function ()
{
    let dimensionHelper = new DimensionsHelper(document.getElementById("div1"));
    Assert.AreEqual(50, dimensionHelper.HeightWithMargin());
    Assert.AreEqual(55, dimensionHelper.WidthWithMargin());
});

unitTest.AddSyncTestCase("Change style", function ()
{
    let dimensionHelper = new DimensionsHelper(document.getElementById("div1"));
    Assert.AreEqual(1, dimensionHelper.Height());
    Assert.AreEqual(2, dimensionHelper.Width());
    Assert.AreEqual(8, dimensionHelper.HeightWithPadding());
    Assert.AreEqual(13, dimensionHelper.WidthWithPadding());
    Assert.AreEqual(35, dimensionHelper.HeightWithBorder());
    Assert.AreEqual(36, dimensionHelper.WidthWithBorder());
    Assert.AreEqual(50, dimensionHelper.HeightWithMargin());
    Assert.AreEqual(55, dimensionHelper.WidthWithMargin());


    document.body.insertAdjacentHTML("beforeend", `
    <style>

    #div1 {
        height: 2px;
        width: 3px;
        padding-top: 4px;
        padding-bottom: 5px;
        padding-left: 6px;
        padding-right: 7px;
        margin-top: 8px;
        margin-bottom: 9px;
        margin-left: 10px;
        margin-right: 11px;
        border: 1px solid black;
        border-left-width: 12px;
        border-right-width: 13px;
        border-top-width: 14px;
        border-bottom-width: 15px;
    }

    </style>
    `);

    Assert.AreEqual(2, dimensionHelper.Height());
    Assert.AreEqual(3, dimensionHelper.Width());
    Assert.AreEqual(11, dimensionHelper.HeightWithPadding());
    Assert.AreEqual(16, dimensionHelper.WidthWithPadding());
    Assert.AreEqual(40, dimensionHelper.HeightWithBorder());
    Assert.AreEqual(41, dimensionHelper.WidthWithBorder());
    Assert.AreEqual(57, dimensionHelper.HeightWithMargin());
    Assert.AreEqual(62, dimensionHelper.WidthWithMargin());

    document.body.insertAdjacentHTML("beforeend", `
    <style>

    #div1 {
            height: 1px;
        width: 2px;
        padding-top: 3px;
        padding-bottom: 4px;
        padding-left: 5px;
        padding-right: 6px;
        margin-top: 7px;
        margin-bottom: 8px;
        margin-left: 9px;
        margin-right: 10px;
        border: 1px solid black;
        border-left-width: 11px;
        border-right-width: 12px;
        border-top-width: 13px;
        border-bottom-width: 14px;
    }

    </style>
    `);
});

unitTest.AddSyncTestCase("Set height, width", function ()
{
    let dimensionHelper = new DimensionsHelper(document.getElementById("div1"));
    Assert.AreEqual(1, dimensionHelper.Height());
    Assert.AreEqual(2, dimensionHelper.Width());
    Assert.AreEqual(8, dimensionHelper.HeightWithPadding());
    Assert.AreEqual(13, dimensionHelper.WidthWithPadding());
    Assert.AreEqual(35, dimensionHelper.HeightWithBorder());
    Assert.AreEqual(36, dimensionHelper.WidthWithBorder());
    Assert.AreEqual(50, dimensionHelper.HeightWithMargin());
    Assert.AreEqual(55, dimensionHelper.WidthWithMargin());

    dimensionHelper.SetHeight(2);
    dimensionHelper.SetWidth(3);

    Assert.AreEqual(2, dimensionHelper.Height());
    Assert.AreEqual(3, dimensionHelper.Width());
    Assert.AreEqual(9, dimensionHelper.HeightWithPadding());
    Assert.AreEqual(14, dimensionHelper.WidthWithPadding());
    Assert.AreEqual(36, dimensionHelper.HeightWithBorder());
    Assert.AreEqual(37, dimensionHelper.WidthWithBorder());
    Assert.AreEqual(51, dimensionHelper.HeightWithMargin());
    Assert.AreEqual(56, dimensionHelper.WidthWithMargin());
});

document.addEventListener("DOMContentLoaded", function ()
{
    let browserTestAgent = new BrowserTestAgent(unitTest);
    browserTestAgent.Run();
});