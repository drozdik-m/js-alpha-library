

//--------------------------------------------------
//----------BONSAI MARKUP ELEMENT-------------------
//--------------------------------------------------
export abstract class BonsaiMarkupElement
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    protected isPaired: boolean;


    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    constructor()
    {

    }


    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------

    /**
     * Transforms text from MarkupSyntax to HTML
     * @param markup Bonsai Markup string
     */
    abstract ToHTML(markup: string): string;

    /**
     * Transforms text from HTML to MarkupSyntax
     * @param html HTML string
     */
    abstract ToMarkup(html: string): string;

}