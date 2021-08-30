import { BrowserTestAgent } from "@drozdik.m/web-unit-test";
import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { CookiesController } from "@drozdik.m/cookies-controller";
import { CookiesBar } from "../../src/CookiesBar";

let unitTest = new UnitTest("Cookies Bar");

document.body.insertAdjacentHTML("beforeend", `
        <div id="cookiesBar" class="cookiesBar">
            <div class="cookiesBarInner">
                <p class="cookiesBarText">Prohlížením této stránky souhlasíte s užíváním <a href="#" target="_blank" title="Informace o cookies">cookies</a></p>
                <button type="button" class="cookiesBarButton">V pořádku</button>
            </div>
        </div>
`);

unitTest.AddAsyncTestCase("Confirm bar", function (Done, Fail)
{
    document.addEventListener("DOMContentLoaded", function ()
    {
        let controller = new CookiesController();
        controller.Forbid();

        let bar = new CookiesBar(document.getElementById("cookiesBar"), controller);
        let clickEvent = document.createEvent("Event");
        clickEvent.initEvent("click", true, true);
        document.querySelector("#cookiesBar .cookiesBarButton").dispatchEvent(clickEvent);

        try
        {
            Assert.IsTrue(controller.AllowedToUse());
        }
        catch
        {
            Fail();
        }

        let interval = setInterval(function ()
        {
            if (!document.getElementById("cookiesBar"))
            {
                clearInterval(interval);
                Done();
            }
        }, 50);
    });
    

});

let browserTestAgent = new BrowserTestAgent(unitTest);
browserTestAgent.Run();