

export class DimensionsHelper
{
    //--------------------------------------------------
    //----------PROPERTIES------------------------------
    //--------------------------------------------------
    private element: HTMLElement;
    private style: CSSStyleDeclaration;

    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    /**
     * Creates active container for providing
     * @param element
     */
    constructor (element: HTMLElement)
    {
        this.element = element;
        this.style = getComputedStyle(element);
    }

    //--------------------------------------------------
    //----------WIDTH/HEIGHT----------------------------
    //--------------------------------------------------
    /**
     * Returns width of the element
     * */
    public Width(): number
    {
        return parseInt(this.style.width);
    }

    /**
     * Returns height of the element
     * */
    public Height(): number
    {
        return parseInt(this.style.height);
    }

    /**
     * Sets new width to the element
     * @param width New width
     */
    public SetWidth(width: number): void
    {
        this.element.style.width = width + "px";
    }

    /**
     * Sets new height to the element
     * @param height New height
     */
    public SetHeight(height: number): void
    {
        this.element.style.height = height + "px";
    }

    //--------------------------------------------------
    //----------PADDING---------------------------------
    //--------------------------------------------------
    /**
     * Returns width with padding of the element
     * */
    public WidthWithPadding(): number
    {
        return this.element.clientWidth;
    }

    /**
     * Returns height with padding of the element
     * */
    public HeightWithPadding(): number
    {
        return this.element.clientHeight;
    }

    //--------------------------------------------------
    //----------BORDER----------------------------------
    //--------------------------------------------------
    /**
     * Returns width with padding and border of the element
     * */
    public WidthWithBorder(): number
    {
        return this.element.offsetWidth;
    }

    /**
     * Returns height with padding and border of the element
     * */
    public HeightWithBorder(): number
    {
        return this.element.offsetHeight;
    }

    //--------------------------------------------------
    //----------MARGIN----------------------------------
    //--------------------------------------------------
    /**
     * Returns width with padding, border and margin of the element
     * */
    public WidthWithMargin(): number
    {
        let marginLeft = parseInt(this.style.marginLeft);
        let marginRight = parseInt(this.style.marginRight);
        return this.WidthWithBorder() + marginLeft + marginRight;
    }

    /**
     * Returns height with padding, border and margin of the element
     * */
    public HeightWithMargin(): number
    {
        let marginTop = parseInt(this.style.marginTop);
        let marginBottom = parseInt(this.style.marginBottom);
        return this.HeightWithBorder() + marginTop + marginBottom;
    }
}