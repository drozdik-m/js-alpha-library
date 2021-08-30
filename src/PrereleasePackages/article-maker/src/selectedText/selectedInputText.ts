import * as jQuery from "jquery";

//--------------------------------------------------
//----------SELECTED INDEXES------------------------
//--------------------------------------------------

export class SelectedInputText
{
    public start: number;
    public end: number;
    public inputId: string;

    public selectedText: string;
    public prefix: string;
    public sufix: string

    /**
     * Creates new instance of the object and saves important values. Valid until input is changed.
     * @param inputId Input ID
     */
    constructor(inputId: string)
    {
        this.inputId = inputId; 
        this.Update();
    }

    /**
     * Replaces selected text (saved on object creation)
     */
    ReplaceSelectedText(newText: string)
    {
        //Input
        let $input = $("#" + this.inputId);

        //Replace text 
        $input.prop("value", this.prefix + newText + this.sufix);
    }

    /**
     * Inserts text after start of the selection
     * @param text Text to insert
     */
    InsertAfterStart(text: string)
    {
        //Input
        let $input = $("#" + this.inputId);

        //Replace text 
        $input.prop("value", this.prefix + text + this.selectedText + this.sufix);
    }

    /**
     * Inserts text before start of the selection
     * @param text Text to insert
     */
    InsertBeforeStart(text: string)
    {
        //Input
        let $input = $("#" + this.inputId);

        //Replace text 
        $input.prop("value", text + this.prefix + this.selectedText + this.sufix);
    }

    /**
     * Inserts text before end of the selection
     * @param text Text to insert
     */
    InsertBeforeEnd(text: string)
    {
        //Input
        let $input = $("#" + this.inputId);

        //Replace text 
        $input.prop("value", this.prefix + this.selectedText + text + this.sufix);
    }

    /**
     * Inserts text after end of the selection
     * @param text Text to insert
     */
    InsertAfterEnd(text: string)
    {
        //Input
        let $input = $("#" + this.inputId);

        //Replace text 
        $input.prop("value", this.prefix + this.selectedText + this.sufix + text);
    }

    /**
     * Updates all the values
     */
    Update()
    {
        //Input
        let $input = $("#" + this.inputId);

        //Exceptions
        if ($input.length == 0)
        {
            console.error(`SelectedIndexes(${this.inputId}) - input not found`);
            return;
        }

        //Start and end
        this.start = $input.prop("selectionStart");
        this.end = $input.prop("selectionEnd");

        //Extract selected text
        let inputText = $input.prop("value");
        this.prefix = inputText.substring(0, this.start);
        this.sufix = inputText.substring(this.end, inputText.length);
        this.selectedText = inputText.substring(this.start, this.end);
    }

    /**
     * Nulls all the values
     */
    Clear()
    {
        this.start = 0;
        this.end = 0;
        this.prefix = "";
        this.sufix = "";
        this.selectedText = "";
    }

    /**
     * Selects certain part and updates data
     * @param start Start index
     * @param end End index
     */
    Select(start: number, end: number)
    {
        //Input
        let $input = $("#" + this.inputId);

        //Start and end
        $input.prop("selectionStart", start);
        $input.prop("selectionEnd", end);

        //Update
        this.Update();
    }
}

