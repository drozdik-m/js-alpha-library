import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { BrowserTestAgent } from "@drozdik.m/web-unit-test";

let unitTest = new UnitTest("On Scroll To");

unitTest.AddTestCase("Empty test", function ()
{
    //TODO

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
        1
    </div>

    <div id="block11" class="block" style="background-color: antiquewhite;">
        2
    </div>

    <div id="block2" class="block" style="background-color: brown;">
        3
    </div>

    <div id="block3" class="block" style="background-color: darkviolet;">
        4
    </div>

    <div id="block4" class="block" style="background-color: black;">
        5
    </div>

    `);

    let browserTestAgent = new BrowserTestAgent(unitTest);
    browserTestAgent.Run();
});

