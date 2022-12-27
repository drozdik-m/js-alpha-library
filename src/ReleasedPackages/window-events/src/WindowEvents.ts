import { Event } from "@drozdik.m/event";
import { ResizeArgs } from "../args/ResizeArgs";
import { ScrollArgs } from "../args/ScrollArgs";
import { WindowEventArgs } from "../args/WindowEventArgs";

export { WindowEventArgs, ResizeArgs, ScrollArgs };

export class WindowEvents
{
    public static OnDOMReady = new Event<WindowEvents, WindowEventArgs>();
    public static OnLoad = new Event<WindowEvents, WindowEventArgs>();
    public static OnResize = new Event<WindowEvents, ResizeArgs>();
    public static OnScroll = new Event<WindowEvents, ScrollArgs>();
    public static OnScrollAndResize = new Event<WindowEvents, ScrollArgs>();

    private static initialized = false;


    /**
     * Initializes the window events (only once)
     * */
    static Initialize()
    {
        //Init lock
        if (WindowEvents.initialized)
            return;
        WindowEvents.initialized = true;

        //On DOM ready
        document.addEventListener("DOMContentLoaded", function ()
        {
            WindowEvents.OnDOMReady.Invoke(WindowEvents, new WindowEventArgs(window.document.body));
        });

        //On document load
        window.addEventListener("load", function ()
        {
            WindowEvents.OnLoad.Invoke(WindowEvents, new WindowEventArgs(window.document.body));
        });

        //On document resize
        window.addEventListener("resize", function ()
        {
            WindowEvents.InvokeResize();
        });

        //On document scroll
        window.addEventListener("scroll", function ()
        {
            WindowEvents.InvokeScroll();
        });
    }

    /**
     * Invokes resize event
     * */
    static InvokeResize(): void
    {
        WindowEvents.OnResize.Invoke(WindowEvents, new WindowEventArgs(window.document.body));
        WindowEvents.OnScrollAndResize.Invoke(WindowEvents, new WindowEventArgs(window.document.body));
    }

    /**
     * Invokes scroll event
     * */
    static InvokeScroll(): void
    {
        WindowEvents.OnScroll.Invoke(WindowEvents, new WindowEventArgs(window.document.body));
        WindowEvents.OnScrollAndResize.Invoke(WindowEvents, new WindowEventArgs(window.document.body));
    }

    /**
     * Returns window width
     * */
    static Width(): number
    {
        return document.documentElement.clientWidth
            || window.innerWidth
            || document.body.clientWidth;
    }

    /**
     * Returns window height
     * */
    static Height(): number
    {
        return window.innerHeight
            || document.body.clientHeight; 
    }

}
WindowEvents.Initialize();