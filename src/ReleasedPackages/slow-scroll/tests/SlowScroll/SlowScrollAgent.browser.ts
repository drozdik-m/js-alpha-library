import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { BrowserTestAgent } from "@drozdik.m/web-unit-test";
import { SlowScroll } from "../../src/SlowScroll";

let unitTest = new UnitTest("Slow Scroll");

unitTest.AddAsyncTestCase("Scroll to an achor and to top", function (Done, Fail)
{
    SlowScroll.AnchorScroll("slowScroll");
    let link = document.getElementById("toBlock2");

    var clickEvent = new Event("click");
    clickEvent.initEvent("click");
    link.dispatchEvent(clickEvent);

    setTimeout(function ()
    {
        try
        {
            console.log(document.documentElement.scrollTop);
            Assert.IsTrue(document.documentElement.scrollTop > 100);
            SlowScroll.ToTop();

            setTimeout(function ()
            {
                try
                {
                    
                    console.log(document.documentElement.scrollTop);
                    Assert.AreEqual(0, document.documentElement.scrollTop);
                    Done();
                }
                catch
                {
                    Fail();
                }
                
            }, 750);
        }
        catch
        {
            Fail();
        }
    }, 750);

});


document.addEventListener("DOMContentLoaded", function ()
{
    document.documentElement.insertAdjacentHTML("beforeend", `
    <style>
        .block{
            height: 50rem;
        }
    </style>
    <div id="block1" class="block" style="background-color: aqua;">
        <a href="#block2" id="toBlock2" class="slowScroll">Scroll</a>
    </div>

    <div id="block2" class="block" style="background-color: brown;">
        <a href="#block3" class="slowScroll">Scroll</a>
    </div>

    <div id="block3" class="block" style="background-color: darkviolet;">
        <a href="#block1" class="slowScroll">Scroll</a>
    </div>


    `);

    let browserTestAgent = new BrowserTestAgent(unitTest);
    browserTestAgent.Run();
});

