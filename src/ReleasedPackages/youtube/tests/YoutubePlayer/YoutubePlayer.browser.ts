import { BrowserTestAgent } from "@drozdik.m/web-unit-test";
import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { YoutubePlayer } from "../../src/YoutubePlayer";


let unitTest = new UnitTest("Youtube Player");

document.getElementsByTagName("body").item(0).innerHTML = `
<div id="player1"></div>
<div id="player2"></div>
`;

unitTest.AddAsyncTestCase("Create and check YouTube iframe", function (Done, Fail)
{
    try
    {
        Assert.AreEqual(document.getElementById("player1").innerHTML, "");
        let player = new YoutubePlayer("player1");
    }
    catch
    {
        Fail();
    }

    let interval = setInterval(function ()
    {
        if (document.getElementById("player1").tagName == "IFRAME")
        {
            clearInterval(interval);
            Done();
        }
    }, 50);
});


unitTest.AddAsyncTestCase("Create and check YouTube iframe after", function (Done, Fail)
{

    setTimeout(function ()
    {
        try
        {
            Assert.AreEqual(document.getElementById("player2").innerHTML, "");
            let player = new YoutubePlayer("player2");
        }
        catch
        {
            Fail();
        }

        let interval = setInterval(function ()
        {
            if (document.getElementById("player2").tagName == "IFRAME")
            {
                clearInterval(interval);
                Done();
            }
        }, 50);
    }, 2500);
});


let browserTestAgent = new BrowserTestAgent(unitTest);
browserTestAgent.Run();