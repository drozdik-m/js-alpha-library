import { GoogleTagWebStream } from "../src/GoogleTag";
import { StorageType } from "../src/StorageType";

document.addEventListener("DOMContentLoaded", function ()
{
    const googleAnalytics = new GoogleTagWebStream("G-597EYKW04M", StorageType.Cookie, true);
    googleAnalytics.StartTracking();
});