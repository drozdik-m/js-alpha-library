import { DimensionsHelper } from "@drozdik.m/dimensions-helper";

export class WindowEventArgs
{
    private element: HTMLElement;

    constructor(element: HTMLElement)
    {
        this.element = element;
    }

    /**
     * Returns new Dimensions helper
     * */
    DimensionsHelper(): DimensionsHelper
    {
        return new DimensionsHelper(this.element);
    }

    /**
     * Returns element
     * */
    Element(): HTMLElement
    {
        return this.element;
    }

    /**
     * Returns scrollTop value
     * */
    ScrollTop(): number
    {
        return this.element.scrollTop;
    }
}