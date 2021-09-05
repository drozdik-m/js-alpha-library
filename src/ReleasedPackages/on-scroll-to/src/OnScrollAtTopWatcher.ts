import { WindowEvents, ScrollArgs } from "@drozdik.m/window-events";
import { OnScrollWatcherArgs } from "../args/OnScrollWatcherArgs";
import { OnScrollWatcher } from "./OnScrollTo";

/**
 * Element watcher triggering callback when the element is above or at the top of the screen
 * */
export class OnScrollAtTopWatcher extends OnScrollWatcher
{
    protected OnScreenChange(windowEvents: WindowEvents, scrollArgs: ScrollArgs): void {

        let rect = this.element.getBoundingClientRect();

        if (rect.top <= 0)
            this.OnScroll.Invoke(this, new OnScrollWatcherArgs(this.element));
    }
    
}