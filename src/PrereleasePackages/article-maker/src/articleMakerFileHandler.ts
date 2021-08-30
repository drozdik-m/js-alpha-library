import { Map } from "./map/map";
import "@drozdik.m/string-extensions/ExtractNameFromPath"

//--------------------------------------------------
//----------ARTICLE MAKER FILE HANDLER--------------
//--------------------------------------------------

export class ArticleMakerFileHandler
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    //IDs
    makerId: string;
    id: string;
    fileIdExtension: string = "FileHandler";

    //Name
    inputName: string;

    //Inputs
    inputs: Map<string, string> = new Map<string, string>();

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    constructor(makerId: string, handlerId: string, inputName: string)
    {
        this.makerId = makerId;
        this.id = handlerId;
        this.inputName = inputName;

        //Make input wrapper
        let $maker = $("#" + makerId);
        $maker.append(`<div id="${this.id}" class="articleFileHandler"></div>`);
    }

    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------

    /**
    * Adds new file to handle
    * @param inputId Input ID
    */
    RegisterInput(inputId: string)
    {
        this.inputs.Insert(inputId, "");
    }

    /**
    * Handles file input change
    * @param inputId Input ID
    */
    HandleFileInput(inputId: string)
    {
        let $input = $("#" + inputId);
        if ($input.length == 0)
            return;

        //Input is empty
        if ($input.prop("value") == "")
            return;

        //Remove old input
        let $handler = $("#" + this.id);
        let $inputInHandler = $handler.find("#" + inputId + this.fileIdExtension);
        if ($inputInHandler.length != 0)
            $inputInHandler.remove();

        //Clone new input
        $input.clone().prop("name", this.inputName).prop("id", inputId + this.fileIdExtension).appendTo($handler);

        //Save new file name
        let value: string = $input.prop("value");
        this.inputs.Update(this.inputs.Find(inputId), value.ExtractNameFromPath());
    }

    /**
     * Removes an input
     * @param inputId Input ID
     */
    RemoveInput(inputId: string)
    {
        let $handler = $("#" + this.id);
        let $inputInHandler = $handler.find("#" + inputId + this.fileIdExtension);
        if ($inputInHandler.length != 0)
            $inputInHandler.remove();
        this.inputs.Remove(this.inputs.Find(inputId));
    }

    /**
    * Generates HTML preview of this file handler
    */
    GeneratePreviewHTML(headingText: string)
    {
        //Empty handler
        let nonEmptyInputs = 0;
        for (let it = this.inputs.Begin(); !it.IsAtEnd(); it.Next())
            if (it.Value() != "")
                nonEmptyInputs++;
        if (nonEmptyInputs == 0)
            return "";

        //Some values
        let html = `<div class="articleMakerFilePreview"><p class="articleMakerFilePreviewHeading">${headingText}</p><ul>`;
        for (let it = this.inputs.Begin(); !it.IsAtEnd(); it.Next())
            if (it.Value() != "")
                html += `<li>${it.Value()}</li>`;
        html += `</ul></div>`;
        return html;
    }
}