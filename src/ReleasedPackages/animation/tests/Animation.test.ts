import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { Linear } from "@drozdik.m/lerp/dist/Linear";
import { Animation } from "../src/Animation";

let unitTest = new UnitTest("Animation");

unitTest.AddAsyncTestCase("Animation events", function (Done, Fail)
{
    let animation = new Animation(1000, Linear);
    (animation as any).fps = 10;

    let start = 0;
    let end = 0;
    let render = 0;
    let frame = 0;

    animation.OnStart.Add(function (caller, args)
    {
        start++;
        try
        {
            Assert.AreEqual(0, args.Value());
        }
        catch
        {
            Fail();
        }
    });

    animation.OnFrame.Add(function (caller, args)
    {
        frame++;
        try
        {
            Assert.AreEqual(frame * 100, args.Value());
        }
        catch
        {
            Fail();
        }
    });

    animation.OnRender.Add(function (caller, args)
    {
        render++;
        try
        {
            
        }
        catch
        {
            Fail();
        }
    });

    animation.OnEnd.Add(function (caller, args)
    {
        end++;
        try
        {
            Assert.AreEqual(1000, args.Value());
            Assert.AreEqual(1, start);
            Assert.AreEqual(10, frame);
            Assert.AreEqual(12, render);
            Assert.AreEqual(1, end);

            Done();
        }
        catch
        {
            Fail();
        }
    });

    animation.Start(0, 1000);
});

unitTest.AddAsyncTestCase("Pause and continue", function (Done, Fail)
{
    let animation = new Animation(1000, Linear);
    (animation as any).fps = 10;

    let start = 0;
    let end = 0;
    let render = 0;
    let frame = 0;

    animation.OnStart.Add(function (caller, args)
    {
        start++;
        try
        {
            Assert.AreEqual(0, args.Value());
        }
        catch
        {
            Fail();
        }
    });

    animation.OnFrame.Add(function (caller, args)
    {
        frame++;
        try
        {
            
            Assert.AreEqual(frame * 100, args.Value());
        }
        catch
        {
            Fail();
        }
    });

    animation.OnRender.Add(function (caller, args)
    {
        render++;
        try
        {

        }
        catch
        {
            Fail();
        }
    });

    animation.OnEnd.Add(function (caller, args)
    {
        end++;
        try
        {
            Assert.AreEqual(1000, args.Value());
            Assert.AreEqual(2, start);
            Assert.AreEqual(10, frame); 
            Assert.AreEqual(13, render);
            Assert.AreEqual(1, end);

            Done();
        }
        catch
        {
            Fail();
        }
    });

    animation.Start(0, 1000);
    setTimeout(function ()
    {
        animation.Pause().Continue();
    }, 550);
});

unitTest.Run();