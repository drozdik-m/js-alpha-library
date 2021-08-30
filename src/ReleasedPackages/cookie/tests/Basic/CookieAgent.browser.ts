import { BrowserTestAgent } from "@drozdik.m/web-unit-test";
import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { Cookie } from "../../src/Cookie";

let unitTest = new UnitTest("Cookie");

unitTest.AddTestCase("New empty cookie", function ()
{
    let cookie1 = new Cookie("cookie1");
    cookie1.Delete();
    Assert.IsNull(cookie1.Get());
    Assert.IsNull(cookie1.GetCached());
});

unitTest.AddTestCase("Get and set", function ()
{
    let cookie1 = new Cookie("cookie1");
    cookie1.Delete();
    Assert.IsNull(cookie1.Get());
    Assert.IsNull(cookie1.GetCached());
    cookie1.Set("ahoyy");
    Assert.AreEqual("ahoyy", cookie1.Get());
    Assert.AreEqual("ahoyy", cookie1.GetCached());
});

unitTest.AddTestCase("Get and set - more cookies", function ()
{
    let cookie1 = new Cookie("cookie1");
    cookie1.Set("ahoy");
    Assert.AreEqual("ahoy", cookie1.Get());
    Assert.AreEqual("ahoy", cookie1.GetCached());

    let cookie2 = new Cookie("cookie2");
    cookie2.Set("ahoyy");
    Assert.AreEqual("ahoyy", cookie2.Get());
    Assert.AreEqual("ahoyy", cookie2.GetCached());

    let cookie3 = new Cookie("cookie3");
    cookie3.Set("ahoyyy");
    Assert.AreEqual("ahoyyy", cookie3.Get());
    Assert.AreEqual("ahoyyy", cookie3.GetCached());

    for (let i = 0; i < 5; i++)
    {
        Assert.AreEqual("ahoy", cookie1.Get());
        Assert.AreEqual("ahoy", cookie1.GetCached());
        Assert.AreEqual("ahoyy", cookie2.Get());
        Assert.AreEqual("ahoyy", cookie2.GetCached());
        Assert.AreEqual("ahoyyy", cookie3.Get());
        Assert.AreEqual("ahoyyy", cookie3.GetCached());
    }
});

unitTest.AddTestCase("Semicolon", function ()
{
    let cookie4 = new Cookie("cookie4");
    cookie4.Delete();
    cookie4.Set("semi;semi");
    Assert.AreEqual("semi;semi", cookie4.Get());
    Assert.AreEqual("semi;semi", cookie4.GetCached());

});

unitTest.AddTestCase("Cache", function ()
{
    let cookie5 = new Cookie("cookie5");
    cookie5.Set("text1");
    Assert.AreEqual("text1", cookie5.Get());
    Assert.AreEqual("text1", cookie5.GetCached());

    let cookie55 = new Cookie("cookie5");
    cookie55.Set("text2");

    Assert.AreEqual("text1", cookie5.GetCached());
    Assert.AreEqual("text2", cookie5.Get());

    cookie55.Set("text3");

    Assert.AreEqual("text2", cookie5.GetCached());
    cookie5.RefreshCache();
    Assert.AreEqual("text3", cookie5.GetCached());
});

unitTest.AddTestCase("Delete", function ()
{
    let cookie6 = new Cookie("cookie6");
    cookie6.Set("ops1");
    Assert.AreEqual("ops1", cookie6.Get());
    Assert.AreEqual("ops1", cookie6.GetCached());

    cookie6.Delete();

    Assert.IsNull(cookie6.Get());
    Assert.IsNull(cookie6.GetCached());
});

unitTest.AddTestCase("Exists", function ()
{
    let cookie7 = new Cookie("cookie7");
    cookie7.Set("ops2");
    Assert.AreEqual("ops2", cookie7.Get());
    Assert.AreEqual("ops2", cookie7.GetCached());

    Assert.IsTrue(cookie7.Exists());
    Assert.IsTrue(cookie7.ExistsCached());

    cookie7.Delete();
    Assert.IsFalse(cookie7.Exists());
    Assert.IsFalse(cookie7.ExistsCached());

    cookie7.Delete();
});

unitTest.AddTestCase("Exists cached", function ()
{
    let cookie8 = new Cookie("cookie8");
    let cookie88 = new Cookie("cookie8");
    cookie8.Delete();
    cookie88.Delete();
    cookie8.Set("ops2");
    Assert.AreEqual("ops2", cookie8.Get());
    Assert.AreEqual("ops2", cookie8.GetCached());

    Assert.IsTrue(cookie8.Exists());
    Assert.IsTrue(cookie8.ExistsCached());
    Assert.IsFalse(cookie88.ExistsCached());

    cookie88.Set("ops22");

    cookie8.Delete();
    Assert.IsFalse(cookie8.Exists());
    Assert.IsFalse(cookie8.ExistsCached());
    Assert.IsTrue(cookie88.ExistsCached());

    cookie8.Delete();
});

unitTest.AddTestCase("Combined test", function ()
{
    //Testing cookies
    let testingCookie1 = new Cookie("testingCookie1");
    let testingCookie2 = new Cookie("testingCookie2");
    let testingCookie3 = new Cookie("testingCookie3");

    testingCookie1.Delete();
    testingCookie2.Delete();
    testingCookie3.Delete();

    //Basic Get/Set
    Assert.Assert(testingCookie1.Get() == null);
    Assert.Assert(testingCookie1.GetCached() == null);
    testingCookie1.Set("testingCookieValue1");
    Assert.Assert(testingCookie1.Get() == "testingCookieValue1");
    Assert.Assert(testingCookie1.GetCached() == "testingCookieValue1");

    Assert.Assert(testingCookie2.Get() == null);
    Assert.Assert(testingCookie2.GetCached() == null);
    testingCookie2.Set("testingCookieValue2");
    Assert.Assert(testingCookie2.Get() == "testingCookieValue2");
    Assert.Assert(testingCookie2.GetCached() == "testingCookieValue2");

    Assert.Assert(testingCookie1.Get() == "testingCookieValue1");
    Assert.Assert(testingCookie1.GetCached() == "testingCookieValue1");

    testingCookie3.Set("testingCookieValue3");
    Assert.Assert(testingCookie3.Get() == "testingCookieValue3");
    Assert.Assert(testingCookie3.GetCached() == "testingCookieValue3");
    Assert.Assert(testingCookie2.Get() == "testingCookieValue2");
    Assert.Assert(testingCookie2.GetCached() == "testingCookieValue2");
    Assert.Assert(testingCookie1.Get() == "testingCookieValue1");
    Assert.Assert(testingCookie1.GetCached() == "testingCookieValue1");

    testingCookie1.Set("testingCookieValue11");
    testingCookie2.Set("testingCookieValue22");
    testingCookie3.Set("testingCookieValue33");
    Assert.Assert(testingCookie3.GetCached() == "testingCookieValue33");
    Assert.Assert(testingCookie3.Get() == "testingCookieValue33");
    Assert.Assert(testingCookie2.GetCached() == "testingCookieValue22");
    Assert.Assert(testingCookie2.Get() == "testingCookieValue22");
    Assert.Assert(testingCookie1.GetCached() == "testingCookieValue11");
    Assert.Assert(testingCookie1.Get() == "testingCookieValue11");

    //Delete 
    Assert.Assert(testingCookie1.Exists());
    testingCookie1.Delete();
    Assert.Assert(!testingCookie1.Exists());
    Assert.Assert(testingCookie1.Get() == null);
    Assert.Assert(testingCookie1.GetCached() == null);
    Assert.Assert(testingCookie3.GetCached() == "testingCookieValue33");
    Assert.Assert(testingCookie3.Get() == "testingCookieValue33");
    Assert.Assert(testingCookie2.GetCached() == "testingCookieValue22");
    Assert.Assert(testingCookie2.Get() == "testingCookieValue22");

    Assert.Assert(testingCookie2.Exists());
    Assert.Assert(testingCookie2.ExistsCached());
    testingCookie2.Delete();
    testingCookie3.Delete();
    Assert.Assert(!testingCookie2.Exists());
    Assert.Assert(!testingCookie2.ExistsCached());
    Assert.Assert(testingCookie2.Get() == null);
    Assert.Assert(testingCookie2.GetCached() == null);
    Assert.Assert(testingCookie3.Get() == null);
    Assert.Assert(testingCookie3.GetCached() == null);

    //Cache
    let testingCookie11 = new Cookie("testingCookie1");
    testingCookie11.Set("test1");
    testingCookie1.Set("test1");
    Assert.Assert(testingCookie11.ExistsCached());
    Assert.Assert(testingCookie1.ExistsCached());
    testingCookie11.Set("test2");
    Assert.Assert(testingCookie1.GetCached() == "test1");
    Assert.Assert(testingCookie1.Get() == "test2");
    testingCookie1.Delete();
    Assert.Assert(testingCookie11.GetCached() == "test2");
    Assert.Assert(testingCookie11.Get() == null);
    Assert.Assert(testingCookie11.GetCached() == null);
});

let browserTestAgent = new BrowserTestAgent(unitTest);
browserTestAgent.Run();