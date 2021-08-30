
import { BrowserTest } from "@drozdik.m/web-unit-test";

let browserTest = new BrowserTest(
    BrowserTest.GetHTMLPath(),
    "dist/tests/RecaptchaV2/RecaptchaV2.browser.js",
    BrowserTest.GetCSSPath()
);

browserTest.Run(7000); 