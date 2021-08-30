import { BrowserTestAgent } from "@drozdik.m/web-unit-test";
import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { CookiesController } from "../../src/CookiesController";
import { Cookie } from "@drozdik.m/cookie";

let unitTest = new UnitTest("Cookies Controller");

unitTest.AddTestCase("Permit", function ()
{
    let permissionCookie = new Cookie("TermsAndConditions");
    permissionCookie.Delete();

    let controller = new CookiesController();
    Assert.IsFalse(controller.AllowedToUse());

    let i = 0;
    controller.OnPermit.Add(function ()
    {
        Assert.IsTrue(controller.AllowedToUse());
        i++;
    });
    controller.Permit();
    Assert.IsTrue(controller.AllowedToUse());
    Assert.AreEqual(1, i);

});


unitTest.AddTestCase("Forbid", function ()
{
    let permissionCookie = new Cookie("TermsAndConditions");
    permissionCookie.Delete();

    let controller = new CookiesController();
    Assert.IsFalse(controller.AllowedToUse());

    let cookie1 = new Cookie("cookie1");
    let cookie2 = new Cookie("cookie2");
    let cookie3 = new Cookie("cookie3");
    cookie1.Set("cookie1");
    cookie2.Set("cookie2");
    cookie3.Set("cookie3");
    controller.Add(cookie1);
    controller.Add(cookie2);
    controller.Add(cookie3);

    let i = 0;
    controller.OnPermit.Add(function ()
    {
        Assert.IsTrue(controller.AllowedToUse());
        i++;
    });
    controller.Permit();
    Assert.IsTrue(controller.AllowedToUse());
    Assert.AreEqual(1, i);

    Assert.IsTrue(cookie1.Exists());
    Assert.IsTrue(cookie2.Exists());
    Assert.IsTrue(cookie3.Exists());

    controller.OnForbid.Add(function ()
    {
        Assert.IsFalse(controller.AllowedToUse());
        i += 2;
    });
    controller.Forbid();
    Assert.IsFalse(controller.AllowedToUse());
    Assert.IsFalse(cookie1.Exists());
    Assert.IsFalse(cookie2.Exists());
    Assert.IsFalse(cookie3.Exists());

});

let browserTestAgent = new BrowserTestAgent(unitTest);
browserTestAgent.Run();