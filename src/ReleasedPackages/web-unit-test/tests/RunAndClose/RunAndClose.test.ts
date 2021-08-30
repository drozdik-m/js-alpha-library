import { BrowserTest } from "../../src/BrowserTest";

let browserTest = new BrowserTest("tests/RunAndClose/index.html",
    "dist/tests/RunAndClose/RunAndClose.browser.js",
    "dist/browser/style.css");
browserTest.Run();