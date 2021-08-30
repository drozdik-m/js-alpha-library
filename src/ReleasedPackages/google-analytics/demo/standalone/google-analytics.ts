import { GoogleAnalytics } from "../../src/GoogleAnalytics";
import { StorageType } from "../../src/StorageType";

document.addEventListener("DOMContentLoaded", function ()
{
    const googleAnalytics = new GoogleAnalytics("UA-84978206-4", StorageType.Local, true);
    googleAnalytics.StartTracking();
});