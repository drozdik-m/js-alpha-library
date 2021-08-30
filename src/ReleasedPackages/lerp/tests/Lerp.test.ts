import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { ILerpFunction } from "../ILerpFunction";
import { Linear } from "../Linear";
import { EaseInCirc } from "../EaseInCirc";
import { EaseInCubic } from "../EaseInCubic";
import { EaseOutSine } from "../EaseOutSine";
import { EaseOutQuint } from "../EaseOutQuint";
import { EaseOutQuart } from "../EaseOutQuart";
import { EaseOutQuad } from "../EaseOutQuad";
import { EaseOutExpo } from "../EaseOutExpo";
import { EaseOutCubic } from "../EaseOutCubic";
import { EaseOutCirc } from "../EaseOutCirc";
import { EaseInSine } from "../EaseInSine";
import { EaseInQuint } from "../EaseInQuint";
import { EaseInQuart } from "../EaseInQuart";
import { EaseInQuad } from "../EaseInQuad";
import { EaseInOutSine } from "../EaseInOutSine";
import { EaseInOutQuint } from "../EaseInOutQuint";
import { EaseInOutQuart } from "../EaseInOutQuart";
import { EaseInOutQuad } from "../EaseInOutQuad";
import { EaseInOutExpo } from "../EaseInOutExpo";
import { EaseInOutCubic } from "../EaseInOutCubic";
import { EaseInOutCirc } from "../EaseInOutCirc";
import { EaseInExpo } from "../EaseInExpo";

let unitTest = new UnitTest("Lerp");

function Interpolate(from: number, to: number, lerp: ILerpFunction, callback: Function)
{
    //let interpolationValue = 0.01;
    let targetVal = to;
    let currentFrame = 0;
    let duration = 1000;
    let timeBetweenFrames = 10;

    let animationFrame = function ()
    {
        //console.log("Frame: " + currentFrame);

        currentFrame += timeBetweenFrames;
        let interpolationValue = lerp(from, targetVal, currentFrame, duration);

        //console.log("   value: " + interpolationValue);

        if (currentFrame < duration)
            setTimeout(animationFrame, timeBetweenFrames);
        else
            callback(interpolationValue);
    }
    animationFrame();
}

unitTest.AddAsyncTestCase("Linear", function (Done, Fail)
{
    Interpolate(0, 500, Linear, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, val);
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("EaseInCirc", function (Done, Fail)
{
    Interpolate(0, 500, EaseInCirc, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, val);
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("EaseInCubic", function (Done, Fail)
{
    Interpolate(0, 500, EaseInCubic, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, val);
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("EaseInExpo", function (Done, Fail)
{
    Interpolate(0, 500, EaseInExpo, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, val);
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("EaseInOutCirc", function (Done, Fail)
{
    Interpolate(0, 500, EaseInOutCirc, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, val);
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("EaseInOutCubic", function (Done, Fail)
{
    Interpolate(0, 500, EaseInOutCubic, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, val);
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("EaseInOutExpo", function (Done, Fail)
{
    Interpolate(0, 500, EaseInOutExpo, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, Math.round(val));
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("EaseInOutQuad", function (Done, Fail)
{
    Interpolate(0, 500, EaseInOutQuad, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, val);
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("EaseInOutQuart", function (Done, Fail)
{
    Interpolate(0, 500, EaseInOutQuart, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, val);
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("EaseInOutQuint", function (Done, Fail)
{
    Interpolate(0, 500, EaseInOutQuint, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, val);
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("EaseInOutSine", function (Done, Fail)
{
    Interpolate(0, 500, EaseInOutSine, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, val);
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("EaseInQuad", function (Done, Fail)
{
    Interpolate(0, 500, EaseInQuad, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, val);
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("EaseInQuart", function (Done, Fail)
{
    Interpolate(0, 500, EaseInQuart, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, val);
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("EaseInQuint", function (Done, Fail)
{
    Interpolate(0, 500, EaseInQuint, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, val);
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("EaseInSine", function (Done, Fail)
{
    Interpolate(0, 500, EaseInSine, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, Math.round(val));
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("EaseOutCirc", function (Done, Fail)
{
    Interpolate(0, 500, EaseOutCirc, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, val);
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("EaseOutCubic", function (Done, Fail)
{
    Interpolate(0, 500, EaseOutCubic, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, val);
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("EaseOutExpo", function (Done, Fail)
{
    Interpolate(0, 500, EaseOutExpo, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, Math.round(val));
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("EaseOutQuad", function (Done, Fail)
{
    Interpolate(0, 500, EaseOutQuad, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, val);
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("EaseOutQuart", function (Done, Fail)
{
    Interpolate(0, 500, EaseOutQuart, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, val);
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("EaseOutQuint", function (Done, Fail)
{
    Interpolate(0, 500, EaseOutQuint, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, val);
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("EaseOutSine", function (Done, Fail)
{
    Interpolate(0, 500, EaseOutSine, function (val: number)
    {
        try
        {
            Assert.AreEqual(500, val);
            Done();
        }
        catch
        {
            Fail();
        }
    });
});



unitTest.Run();