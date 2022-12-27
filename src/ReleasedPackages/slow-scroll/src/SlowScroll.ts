import { Animation } from "@drozdik.m/animation";

//--------------------------------------------------
//----------SLOW SCROLL-----------------------------
//--------------------------------------------------
export class SlowScroll
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    private static offset = 0;

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    /**
    * Constructor that sets events for .slowScroll
    */
    constructor()
    {
        console.warn("SlowScroll is static class, new instance should not be created");
    }

    //--------------------------------------------------
    //---------OFFSET-----------------------------------
    //--------------------------------------------------
    /**
     * Sets new offset for scrolling
     * @param newOffset New offset value
     */
    SetOffset(newOffset: number)
    {
        SlowScroll.offset = newOffset;
    }

    //--------------------------------------------------
    //---------ANCHOR SCROLL----------------------------
    //--------------------------------------------------
    /**
     * Initializes anchor slow scroll
     * @param className Target links class (default = "slowScroll")
     */
    static AnchorScroll(className: string = "slowScroll")
    {
        let elements = document.getElementsByClassName(className);

        for (let i = 0; i < elements.length; i++)
        {
            let element = elements.item(i);
            element.addEventListener("click", function (e)
            {
                e.preventDefault ? e.preventDefault() : (e.returnValue = false);
                let targetSelector = element.getAttribute("href");
                SlowScroll.To(document.querySelector(targetSelector));

            });
        }
    }

    //--------------------------------------------------
    //----------SCROLLS---------------------------------
    //--------------------------------------------------
    /**
     * Scrolls to position from tom
     * @param top Target scroll px from top
     */
    static ToPx(top: number)
    {
        //Init animation
        let animation = new Animation();
        animation.OnRender.Add(function (caller, args)
        {
            document.documentElement.scrollTop = args.Value();
            document.body.scrollTop = args.Value();
        });
        animation.Start(document.documentElement.scrollTop, top - SlowScroll.offset);

    }

    /**
     * Scrolls to an element
     * @param element Target element
     */
    static To(element: HTMLElement)
    {
        let rect = element.getBoundingClientRect();
        let scrollTop = document.documentElement.scrollTop ?
            document.documentElement.scrollTop : document.body.scrollTop;
        let elementTop = rect.top + scrollTop;

        SlowScroll.ToPx(elementTop);
    }

    /**
     * Scrolls to the first element matching the selector )if there is any)
     * @param selector Target selector
     */
    static ToFirst(selector: string)
    {
        let element = document.querySelector(selector) as HTMLElement;
        if (element)
            SlowScroll.To(element);
    }

    /**
    * Scrolls to top
    */
    static ToTop()
    {
        SlowScroll.ToPx(0);
    }
}
