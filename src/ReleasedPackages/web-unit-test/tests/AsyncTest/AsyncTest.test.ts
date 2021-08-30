import { BrowserTest } from "../../src/BrowserTest";

let browserTest = new BrowserTest("browser/index.html",
    "dist/tests/AsyncTest/AsyncTest.browser.js",
    "dist/browser/style.css");
browserTest.Run();
