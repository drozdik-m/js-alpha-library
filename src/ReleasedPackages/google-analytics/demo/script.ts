import { GoogleAnalytics } from "../src/GoogleAnalytics";
import { StorageType } from "../src/StorageType";

declare const ga: any;
document.addEventListener("DOMContentLoaded", function ()
{
    const gaO = new GoogleAnalytics("UA-84978206-25", StorageType.Local, true);
    gaO.StartTracking();
    ga('set', 'checkProtocolTask', null); // Disable file protocol checking.
    ga('set', 'checkStorageTask', null); // Disable cookie storage checking.
    console.log("Tracking...");
});