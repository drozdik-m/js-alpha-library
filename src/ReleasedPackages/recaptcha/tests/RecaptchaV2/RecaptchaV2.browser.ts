import { BrowserTestAgent } from "@drozdik.m/web-unit-test";
import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { RecaptchaV2 } from "../../src/recaptchaV2";


let unitTest = new UnitTest("Recaptcha V2");

document.getElementsByTagName("body").item(0).innerHTML = `
<div id="recaptcha1"></div>
<div id="recaptcha2"></div>
<div id="recaptcha3"></div>
<div id="recaptcha4"></div>
`;

unitTest.AddAsyncTestCase("Create and check RecaptchaV2", function (Done, Fail)
{

    try
    {
        Assert.AreEqual(document.getElementById("recaptcha1").innerHTML, "");
        let recaptcha = new RecaptchaV2("recaptcha1", "6LcTYRAUAAAAAPPL_zx6mJBG9shbysJXwLepTBgt");
    }
    catch
    {
        Fail();
    }

    let interval = setInterval(function ()
    {
        if (document.getElementById("recaptcha1").innerHTML != "")
        {
            clearInterval(interval);
            Done();
        }
    }, 50);
});


unitTest.AddAsyncTestCase("Create and check RecaptchaV2 after", function (Done, Fail)
{

    setTimeout(function ()
    {
        try
        {
            Assert.AreEqual(document.getElementById("recaptcha2").innerHTML, "");
            let recaptcha = new RecaptchaV2("recaptcha2", "6LcTYRAUAAAAAPPL_zx6mJBG9shbysJXwLepTBgt");
        }
        catch
        {
            Fail();
        }

        let interval = setInterval(function ()
        {
            if (document.getElementById("recaptcha2").innerHTML != "")
            {
                clearInterval(interval);
                Done();
            }
        }, 50);
    }, 2500);
});


//<script src="https://www.google.com/recaptcha/api.js?onload=CaptchaCallback&render=explicit" async defer></script>

let browserTestAgent = new BrowserTestAgent(unitTest);
browserTestAgent.Run();