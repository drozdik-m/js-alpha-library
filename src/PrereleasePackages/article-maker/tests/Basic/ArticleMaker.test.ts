import { BrowserTest } from "@drozdik.m/web-unit-test";

let browserTest = new BrowserTest(
    BrowserTest.GetHTMLPath(),
    "dist/tests/Basic/CookieAgent.browser.js",
    BrowserTest.GetCSSPath()
);

browserTest.Run();