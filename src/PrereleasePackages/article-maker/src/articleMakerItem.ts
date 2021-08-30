import { ArticleMakerInput } from "./articleMakerInput";
import { ArticleMakerInput_TextInput } from "./inputs/articleMakerInput_TextInput";
import { ArticleMakerLanguage } from "./articleMakerLanguage";
import { Event } from "@drozdik.m/event";

//--------------------------------------------------
//----------ARTICLE MAKER ITEM----------------------
//--------------------------------------------------
export abstract class ArticleMakerItem
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    //Item IDs
    id: number = -1;
    articleMakerId: string;

    //Item type
    typeId: number = -1;
    typeName: string = "";

    //Item order
    order: number = -1;

    //Open status
    isOpen = false;

    //Inputs
    inputs: ArticleMakerInput[] = [];
    nameInput: ArticleMakerInput_TextInput;

    //Callbacks
    OnRemove: Event<ArticleMakerItem, null> = new Event<ArticleMakerItem, null>();

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    constructor(name: string, articleMakerId: string)
    {
        this.articleMakerId = articleMakerId;

        //Name input
        this.nameInput = new ArticleMakerInput_TextInput("name", ArticleMakerLanguage.GetWord("Item - Name"), articleMakerId);
        this.nameInput.SetValue(name);
        this.inputs.push(this.nameInput);
    }

    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------

    /**
     * Returns HTML of a new panel
     * @param blockName Name of the panel
     * @param blockType Panel type
     * @returns HTML of a panel
     */
    GeneratePanelHTML(): string
    {
        //Preview
        let previewStyle = "";
        if (this.isOpen)
            previewStyle += "display: block;";
        else
            previewStyle += "display: none;";

        //Classes
        let itemClasses = "";
        if (this.isOpen)
            itemClasses += "openedItem ";
        else
            itemClasses += "closedItem ";

        return `<div class="itemControlPanel ${itemClasses}" data-item-type-id="${this.typeId}" data-item-order-id=${this.order} > \
            <div class="itemTopPanel"> \
                <p class="itemName">${this.nameInput.GetValue()}</p> \
                <div class="itemControlIcons"> \
                    <div class="itemPanelIcon itemPanelEdit" title="${ArticleMakerLanguage.GetWord("Item - Edit")}">&nbsp;</div> \
                    <div class="itemPanelIcon itemPanelDragAndDrop" title="${ArticleMakerLanguage.GetWord("Item - Move")}">&nbsp;</div> \
                    <div class="itemPanelIcon itemPanelOpenOrClosePreview" title="${ArticleMakerLanguage.GetWord("Item - Preview")}">&nbsp;</div> \
                    <div class="itemPanelIcon itemPanelDelete" title="${ArticleMakerLanguage.GetWord("Item - Delete")}">&nbsp;</div> \
                </div> \
            </div> \
            <div class="itemPreview" style=\"${previewStyle}\"> \
                ${this.GeneratePreview()}
            </div> \
        </div>`;
    }

    /**
    * Returns HTML of inputs of this item
    * @return HTML of inputs of this item
    */
    GetInputsHTML(): string
    {
        let returnString = "";
        for (let i = 0; i < this.inputs.length; i++)
            returnString += this.inputs[i].GenerateHTML();
        return returnString;
    }

    /**
     * Saves input values
     * @param parentId Parent ID
     */
    SaveValues()
    {
        for (let i = 0; i < this.inputs.length; i++)
            this.inputs[i].SaveValue();
    }

    /**
     * Tells if inputs (not cached values) have valid syntax
     */
    CheckInputsSyntax(): boolean
    {
        for (let i = 0; i < this.inputs.length; i++)
            if (!this.inputs[i].CheckSyntax())
                return false;
        return true;
    }

    /**
     * Function called when the intem is added into the Article items array
     * @param order Order number
     * @param id Id number
     */
    InsertIntoArticleMaker(order: number, id: number)
    {
        this.order = order;
        this.id = id;
    }

    /**
    * Function called on complete removal
    */
    Remove()
    {
        this.OnRemove.Invoke(this, null);
        for (let i = 0; i < this.inputs.length; i++)
            this.inputs[i].Remove();
    }

    /**
    * Function called on save
    */
    DestroyInputs()
    {
        for (let i = 0; i < this.inputs.length; i++)
            this.inputs[i].Destroy();
    }

    /**
     * Adds new input
     * @param input The input to add
     */
    AddInput(input: ArticleMakerInput)
    {
        this.inputs.push(input);
    }

    /**
    * Generates HTML preview of the element
    * @returns HTML preview of the element
    */
    abstract GeneratePreview(): string;

    /**
    * Generates HTML for the content
    * @returns Result HTML
    */
    abstract GenerateHTML(): string;

    /**
     * Fills the object with related data
     * @param html Content source from HTML
     * @returns Reference to this object
     */
    abstract ParseFromHTML(html: string): ArticleMakerItem;

}

