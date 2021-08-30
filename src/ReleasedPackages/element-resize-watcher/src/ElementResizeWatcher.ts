import { DimensionsHelper } from "@drozdik.m/dimensions-helper";
import { WindowEvents, ResizeArgs } from "@drozdik.m/window-events";
import { Event } from "@drozdik.m/event";

export class ElementResizeWatcher
{
    OnResize = new Event<ElementResizeWatcher, ResizeArgs>();

    private element: HTMLElement;
    private dimensionsHelper: DimensionsHelper;
    private width: number = -1;
    private height: number = -1;

    /**
     * Resize watcher calls event only when width or height of the element has changed
     * @param element The element to track
     */
    constructor(element: HTMLElement)
    {
        this.element = element;
        this.dimensionsHelper = new DimensionsHelper(this.element);

        let object = this;
        WindowEvents.OnResize.Add(function ()
        {
            if (object.HasChanged())
                object.OnResize.Invoke(object, new ResizeArgs(object.element));
        });

    }

    /**
     * Checks if the elements dimensions has changes and if so, it updates stored info
     * @returns True if element has changed, else false
     * */
    private HasChanged(): boolean
    {
        if (this.dimensionsHelper.Width() != this.width ||
            this.dimensionsHelper.Height() != this.height)
        {
            this.width = this.dimensionsHelper.Width();
            this.height = this.dimensionsHelper.Height();
            return true;
        }

        return false;
    }
}
