import { BrowserTest } from "@drozdik.m/web-unit-test";

let browserTest = new BrowserTest(
    BrowserTest.GetHTMLPath(),
    "dist/tests/CookiesController/CookiesControllerAgent.browser.js",
    BrowserTest.GetCSSPath()
);

browserTest.Run();