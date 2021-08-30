
import { BrowserTest } from "@drozdik.m/web-unit-test";

let browserTest = new BrowserTest(
    BrowserTest.GetHTMLPath(),
    "dist/tests/LoadingAnimation/LoadingAnimation.browser.js",
    BrowserTest.GetCSSPath()
);

browserTest.Run(10000); 