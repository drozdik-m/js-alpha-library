import { ArticleMakerItem } from "../articleMakerItem";
import { ArticleMakerInput_File } from "../inputs/articleMakerInput_File";
import { ArticleMakerInput_TextInput } from "../inputs/articleMakerInput_TextInput";
import { ArticleMakerFileHandler } from "../articleMakerFileHandler";
import { TemporaryElement } from "../temporaryElement/temporaryElement";
import { ArticleMakerInput_Select } from "../inputs/articleMakerInput_Select";
import { ValuePair } from "@drozdik.m/pair";
import { ArticleMakerLanguage } from "../articleMakerLanguage";

//ID: 11
export class ArticleMakerItem_File extends ArticleMakerItem
{
    file: ArticleMakerInput_File;
    fileName: ArticleMakerInput_TextInput;
    description: ArticleMakerInput_TextInput;
    color: ArticleMakerInput_Select;

    constructor(name: string = "", articleMakerId: string, fileHandler: ArticleMakerFileHandler)
    {
        super(name, articleMakerId);
        this.typeId = 11;
        this.typeName = ArticleMakerLanguage.GetWord("File - Name");

        //File
        this.file = new ArticleMakerInput_File("path", ArticleMakerLanguage.GetWord("File - Path"), articleMakerId, fileHandler);
        this.AddInput(this.file);

        //Title
        this.fileName = new ArticleMakerInput_TextInput("fileName", ArticleMakerLanguage.GetWord("File - Title"), articleMakerId);
        this.AddInput(this.fileName);

        //Description
        this.description = new ArticleMakerInput_TextInput("description", ArticleMakerLanguage.GetWord("File - Description"), articleMakerId);
        this.AddInput(this.description);

        //Color
        this.color = new ArticleMakerInput_Select("color", ArticleMakerLanguage.GetWord("File - Color"), articleMakerId, [
            new ValuePair<string, string>("", ArticleMakerLanguage.GetWord("Default")),
            new ValuePair<string, string>("fileIconGreen", ArticleMakerLanguage.GetWord("Green")),
            new ValuePair<string, string>("fileIconGrey", ArticleMakerLanguage.GetWord("Grey")),
            new ValuePair<string, string>("fileIconLightBlue", ArticleMakerLanguage.GetWord("Light blue")),
            new ValuePair<string, string>("fileIconBlue", ArticleMakerLanguage.GetWord("Blue")),
            new ValuePair<string, string>("fileIconYellow", ArticleMakerLanguage.GetWord("Yellow")),
            new ValuePair<string, string>("fileIconBrown", ArticleMakerLanguage.GetWord("Brown")),
            new ValuePair<string, string>("fileIconRed", ArticleMakerLanguage.GetWord("Red")),
            new ValuePair<string, string>("fileIconOrange", ArticleMakerLanguage.GetWord("Orange")),
            new ValuePair<string, string>("fileIconWhite", ArticleMakerLanguage.GetWord("White"))
        ]);
        this.AddInput(this.color);

    }

    GeneratePreview()
    {
        return `<p>${ArticleMakerLanguage.GetWord("File - Name")}: ${this.fileName.GetValue()}</p><p>${ArticleMakerLanguage.GetWord("File - Description")}: ${this.description.GetValue()}</p>`;
    }

    GenerateHTML()
    {
        let fileNameArray = this.file.GetValue().split(".");
        let fileExtension = fileNameArray[fileNameArray.length - 1];

        return `<a class="fileLink" href="${this.file.GetValue()}" target="_blank" title="${this.nameInput.GetValue()}" data-item-type-id="${this.typeId}" data-item-name="${this.nameInput.GetValue()}">` +
            `<div class="file">` +
            `<div class="fileIcon ${this.color.GetValue()}">.${fileExtension}</div>` +
            `<div class="fileText">` +
            `<span class="fileName">${this.fileName.GetValue()}</span>` +
            `<span class="fileDescription">${this.description.GetValue()}</span>` +
            `</div>` +
            `</div>` +
            `</a>`
    }

    ParseFromHTML(html: string): ArticleMakerItem
    {
        let tempElement = new TemporaryElement();
        let $tempDiv = $("#" + tempElement.GetId());
        $tempDiv.append(html);

        this.file.SetValue($tempDiv.find("a").prop("href").extractNameFromPath());
        this.fileName.SetValue($tempDiv.find(".fileName").html());
        this.description.SetValue($tempDiv.find(".fileDescription").html());

        let classArray = $tempDiv.find(".fileIcon").prop("class").split(" ");
        this.color.SetValue(classArray[classArray.length - 1]);

        tempElement.Destroy();
        return this;
    }

}