import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { AjaxRequest } from "../src/AjaxRequest";
import { HTTPMethod } from "../src/HTTPMethod";
import { AjaxParameter } from "../src/Ajax";

let unitTest = new UnitTest("AjaxRequest");

unitTest.AddTestCase("GetFulllUrl, basic", function ()
{
    let request = new AjaxRequest(HTTPMethod.GET, "target/");
    
    Assert.AreEqual("target/", request.GetFullUrl());
});

unitTest.AddTestCase("GetFulllUrl, basic 2", function ()
{
    let request = new AjaxRequest(HTTPMethod.GET, "target/some");

    Assert.AreEqual("target/some", request.GetFullUrl());
});

unitTest.AddTestCase("GetFulllUrl, '/'", function ()
{
    let request = new AjaxRequest(HTTPMethod.GET, "target");

    Assert.AreEqual("target", request.GetFullUrl());
});


unitTest.AddTestCase("GetFulllUrl, empty", function ()
{
    let request = new AjaxRequest(HTTPMethod.GET, "");

    Assert.AreEqual("", request.GetFullUrl());
});

unitTest.AddTestCase("GetFulllUrl, one parameter", function ()
{
    let request = new AjaxRequest(HTTPMethod.GET, "", [
        new AjaxParameter("nam", "valu")
    ]);

    Assert.AreEqual("/?nam=valu", request.GetFullUrl());
});

unitTest.AddTestCase("GetFulllUrl, multiple parameters", function ()
{
    let request = new AjaxRequest(HTTPMethod.GET, "", [
        new AjaxParameter("nam", "valu"),
        new AjaxParameter("one", "two"),
        new AjaxParameter("three", "four")
    ]);

    Assert.AreEqual("/?nam=valu&one=two&three=four", request.GetFullUrl());
});

unitTest.Run();

