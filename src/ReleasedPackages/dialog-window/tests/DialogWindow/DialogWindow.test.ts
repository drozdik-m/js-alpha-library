﻿import { BrowserTest } from "@drozdik.m/web-unit-test";

let browserTest = new BrowserTest(
    BrowserTest.GetHTMLPath(),
    "dist/tests/DialogWindow/DialogWindowAgent.browser.js",
    BrowserTest.GetCSSPath()
);

browserTest.Run(5000);