import { ResizeArgs } from "@drozdik.m/window-events";

export class OnScrollWatcherArgs
{
    private element: HTMLElement;

    constructor(element: HTMLElement)
    {
        this.element = element;
    }

    /**
     * Gets the element that has been scrolled on
     * */
    GetElement(): HTMLElement
    {
        return this.element;
    }
}