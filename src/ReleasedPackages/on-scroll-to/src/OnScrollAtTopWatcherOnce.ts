import { WindowEvents, ScrollArgs } from "@drozdik.m/window-events";
import { OnScrollWatcherArgs } from "../args/OnScrollWatcherArgs";
import { OnScrollWatcher } from "./OnScrollWatcher";

/**
 * Element watcher triggering callback when the element is above or at the top of the screen (only once)
 * */
export class OnScrollAtTopWatcherOnce extends OnScrollWatcher
{
    private triggered: boolean;

    constructor(element: HTMLElement)
    {
        super(element);
        let object = this;
        this.OnScroll.Add(function ()
        {
            object.triggered = true;
        });
    }

    protected OnScreenChange(windowEvents: WindowEvents, scrollArgs: ScrollArgs): void {

        if (this.triggered)
            return;

        let rect = this.element.getBoundingClientRect();

        if (rect.top <= 0)
            this.OnScroll.Invoke(this, new OnScrollWatcherArgs(this.element));
    }
    
}