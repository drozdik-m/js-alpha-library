import { BrowserTest } from "@drozdik.m/web-unit-test";

let browserTest = new BrowserTest(
    BrowserTest.GetHTMLPath(),
    "dist/tests/OnScrollTo/OnScrollToAgent.browser.js",
    BrowserTest.GetCSSPath()
);

browserTest.Run(7000); 