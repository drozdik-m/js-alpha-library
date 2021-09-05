import { OnScrollAtBottomWatcher } from "../src/OnScrollAtBottomWatcher";
import { OnScrollAtBottomWatcherOnce } from "../src/OnScrollAtBottomWatcherOnce";
import { OnScrollAtTopWatcher } from "../src/OnScrollAtTopWatcher";
import { OnScrollAtTopWatcherOnce } from "../src/OnScrollAtTopWatcherOnce";


document.addEventListener("DOMContentLoaded", function ()
{
    let watcher1 = new OnScrollAtTopWatcher(document.getElementById("block2"));
    watcher1.OnScroll.Add(function ()
    {
        console.log("OnScrollAtTopWatcher: #block2");
    });

    let watcher2 = new OnScrollAtBottomWatcher(document.getElementById("block2"));
    watcher2.OnScroll.Add(function ()
    {
        console.log("OnScrollAtBottomWatcher: #block2");
    });

    let watcher3 = new OnScrollAtTopWatcherOnce(document.getElementById("block2"));
    watcher3.OnScroll.Add(function ()
    {
        console.log("OnScrollAtTopWatcherOnce: #block3");
    });

    let watcher4 = new OnScrollAtBottomWatcherOnce(document.getElementById("block2"));
    watcher4.OnScroll.Add(function ()
    {
        console.log("OnScrollAtBottomWatcherOnce: #block3");
    });
});