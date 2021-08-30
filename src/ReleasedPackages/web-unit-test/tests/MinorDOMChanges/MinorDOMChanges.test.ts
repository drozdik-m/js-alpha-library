import { BrowserTest } from "../../src/BrowserTest";

let browserTest = new BrowserTest("tests/MinorDOMChanges/index.html",
    "dist/tests/MinorDOMChanges/MinorDOMChanges.browser.js",
    "dist/browser/style.css");
browserTest.Run();