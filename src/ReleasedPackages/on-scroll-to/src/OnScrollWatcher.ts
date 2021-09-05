import { Event } from "@drozdik.m/event";
import { ScrollArgs, WindowEvents } from "@drozdik.m/window-events";
import { OnScrollWatcherArgs } from "../args/OnScrollWatcherArgs";

/**
 * Base class for all scroll-triggered element watchers
 * */
export abstract class OnScrollWatcher
{
    public OnScroll = new Event<OnScrollWatcher, OnScrollWatcherArgs>();

    protected element: HTMLElement;

    constructor(element: HTMLElement)
    {
        if (!element)
        {
            console.error("OnScrollWatcher: element is not defined");
            return;
        }

        this.element = element;

        let object = this;

        //Sub to scroll and resize events
        WindowEvents.OnScrollAndResize.Add(function (caller, args)
        {
            object.OnScreenChange(caller, args);
        });

        //Trigger the change now (item may be already on screen)
        this.OnScreenChange(WindowEvents, new ScrollArgs(window.document.body))
    }

    protected abstract OnScreenChange(windowEvents: WindowEvents, scrollArgs: ScrollArgs): void;
}