
export class FormInputArgs
{
    private element: HTMLElement;

    /**
     * Form input arguments 
     * @param element Tracked element
     */
    constructor(element: HTMLElement)
    {
        this.element = element;
    }

    /**
     * Returns the element
     * */
    Element(): HTMLElement
    {
        return this.element;
    }

    /**
     * Returns the elements ID
     * */
    Id(): string
    {
        return this.element.id;
    }
    
}