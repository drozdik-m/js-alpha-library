import { RecaptchaV2 } from "../src/RecaptchaV2";

document.addEventListener("DOMContentLoaded", function ()
{
    let recaptcha1 = new RecaptchaV2("recaptcha1", "6LcTYRAUAAAAAPPL_zx6mJBG9shbysJXwLepTBgt");

    document.getElementById("recaptcha1Reset").addEventListener("click", function ()
    {
        recaptcha1.Reset();
    });

    recaptcha1.OnStateChange.Add(function (e)
    {
        console.log("Validated: " + e.Validated());
    });
});