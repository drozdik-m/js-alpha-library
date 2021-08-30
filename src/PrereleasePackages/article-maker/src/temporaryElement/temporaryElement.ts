import { UUID } from "@drozdik.m/uuid";

//--------------------------------------------------
//----------TEMPORARY ELEMENT-----------------------
//--------------------------------------------------
export class TemporaryElement
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    private id: string;


    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    constructor(id: string = "")
    {
        //ID
        this.id = id;
        if (this.id === "")
            this.id = UUID.Create().ToString();

        //Instantiate
        this.Create();
    }

    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------

    /**
    * Creates the element
    */
    Create()
    {
        $("body").append(`<div id="${this.id}" style="display:none;"></div>`);
    }

    /**
    * Returns elements ID
    */
    GetId(): string
    {
        return this.id;
    }

    /**
    * Clear the element
    */
    Clear()
    {
        let $element = $("#" + this.id);
        $element.empty();
    }

    /**
    * Removes the element
    */
    Destroy()
    {
        let $element = $("#" + this.id);
        $element.remove();
    }

}