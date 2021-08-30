import { DimensionsHelper } from "@drozdik.m/dimensions-helper";

export class DimensionsRatio
{
    //--------------------------------------------------
    //----------PROPERTIES------------------------------
    //--------------------------------------------------
    private dimensionsHelper: DimensionsHelper;
    private element: HTMLElement;

    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    /**
     * Creates active container for providing
     * @param element
     */
    constructor(element: HTMLElement)
    {
        this.element = element;
        this.dimensionsHelper = new DimensionsHelper(this.element);
    }

    //--------------------------------------------------
    //----------RATIOS----------------------------------
    //--------------------------------------------------
    /**
     * Sets height of the element by given ratio and its width
     * @param widthRatio Width ratio
     * @param heightRatio Height ratio
     */
    ByWidth(widthRatio: number, heightRatio: number)
    {
        let targetHeight = this.dimensionsHelper.Width() / widthRatio * heightRatio;
        this.dimensionsHelper.SetHeight(targetHeight);
    }

    /**
     * Sets width of the element by given ratio and its height
     * @param widthRatio Width ratio
     * @param heightRatio Height ratio
     */
    ByHeight(widthRatio: number, heightRatio: number)
    {
        let targetWidth = this.dimensionsHelper.Height() / heightRatio * widthRatio;
        this.dimensionsHelper.SetWidth(targetWidth);
    }

    //--------------------------------------------------
    //----------RATIOS STATICS--------------------------
    //--------------------------------------------------
    /**
     * Sets height of the element by given ratio and its width
     * @param element Target element
     * @param widthRatio Width ratio
     * @param heightRatio Height ratio
     */
    static ByWidth(element: HTMLElement, widthRatio: number, heightRatio: number)
    {
        let dimensionsHelper = new DimensionsHelper(element);
        let targetHeight = dimensionsHelper.Width() / widthRatio * heightRatio;
        dimensionsHelper.SetHeight(targetHeight);
    }

    /**
     * Sets width of the element by given ratio and its height
     * @param element Target element
     * @param widthRatio Width ratio
     * @param heightRatio Height ratio
     */
    static ByHeight(element: HTMLElement, widthRatio: number, heightRatio: number)
    {
        let dimensionsHelper = new DimensionsHelper(element);
        let targetWidth = dimensionsHelper.Height() / heightRatio * widthRatio;
        dimensionsHelper.SetWidth(targetWidth);
    }
}

