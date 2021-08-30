import { ArticleMakerInput } from "../articleMakerInput";
import { ArticleMakerFileHandler } from "../articleMakerFileHandler";
import { UUID } from "@drozdik.m/uuid";
import { ArticleMakerLanguage } from "../articleMakerLanguage";
import * as $ from "jquery";

export class ArticleMakerInput_File extends ArticleMakerInput
{
    fileHandler: ArticleMakerFileHandler;

    constructor(name: string, label: string, articleMakerId: string, fileHandler: ArticleMakerFileHandler)
    {
        super(name + "-" + UUID.Create().ToString(), label, articleMakerId);
        this.fileHandler = fileHandler;
        fileHandler.RegisterInput(this.id);

        const object = this;
        this.OnDestroy.Add(function ()
        {
            object.fileHandler.HandleFileInput(object.id);
        });
        this.OnRemove.Add(function ()
        {
            object.fileHandler.RemoveInput(object.id);
        });
    }

    GenerateHTML(): string
    {

        let currentFile = "";
        if (this.value !== "")
            currentFile = `<span class="inputDescription">${ArticleMakerLanguage.GetWord("Files input - Current file")}: ${this.value}</span>`;

        return `
            <div class="articleMakerItemInput formBlock">
                <label for="${this.id}">${this.label}</label>
                <input type="file" id="${this.id}" />
                ${currentFile}
            </div>
        `;
    }

    ReadValue(): string
    {
        const $parent = $("#" + this.articleMakerId);
        const $input = $parent.find("#" + this.id);

        let value = this.GetValue();
        if ($input.prop("value") !== "")
            value = $input.prop("value").extractNameFromPath();

        return value;
    }
}