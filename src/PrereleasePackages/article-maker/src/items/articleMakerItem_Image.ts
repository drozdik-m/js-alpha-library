import { ArticleMakerItem } from "../articleMakerItem";
import { ArticleMakerInput_File } from "../inputs/articleMakerInput_File";
import { ArticleMakerInput_TextInput } from "../inputs/articleMakerInput_TextInput";
import { ArticleMakerFileHandler } from "../articleMakerFileHandler";
import { TemporaryElement } from "../temporaryElement/temporaryElement";
import { ArticleMakerLanguage } from "../articleMakerLanguage";

//ID: 5
export class ArticleMakerItem_Image extends ArticleMakerItem
{
    file: ArticleMakerInput_File;
    //file: ArticleMakerInput_TextInput;

    description: ArticleMakerInput_TextInput;
    alt: ArticleMakerInput_TextInput;
    title: ArticleMakerInput_TextInput;

    constructor(name: string = "", articleMakerId: string, fileHandler: ArticleMakerFileHandler)
    {
        super(name, articleMakerId);
        this.typeId = 5;
        this.typeName = ArticleMakerLanguage.GetWord("Image - Name");

        //File
        this.file = new ArticleMakerInput_File("path", ArticleMakerLanguage.GetWord("Image - Path"), articleMakerId, fileHandler);
        this.AddInput(this.file);

        //For lameass BonsaiAlpha web:
        //File
        //this.file = new ArticleMakerInput_TextInput("path", ArticleMakerLanguage.GetWord("Image - Path"), articleMakerId);
        //this.AddInput(this.file);

        //Description
        this.description = new ArticleMakerInput_TextInput("description", ArticleMakerLanguage.GetWord("Image - Description"), articleMakerId);
        this.AddInput(this.description);

        //Alt
        this.alt = new ArticleMakerInput_TextInput("alt", ArticleMakerLanguage.GetWord("Image - Alt"), articleMakerId);
        this.AddInput(this.alt);
    }

    GeneratePreview()
    {
        return `<p>${ArticleMakerLanguage.GetWord("Image - Name")}: ${this.file.GetValue()}</p>
            <p>${ArticleMakerLanguage.GetWord("Image - Description")}: ${this.description.GetValue()}</p>
            <p>${ArticleMakerLanguage.GetWord("Image - Alt short")}: ${this.alt.GetValue()}</p>`;
    }

    GenerateHTML()
    {
        return `<figure data-item-type-id="${this.typeId}" data-item-name="${this.nameInput.GetValue()}">` +
            `<img src="${this.file.GetValue()}" alt="${this.alt.GetValue()}" title="${this.alt.GetValue()}" />` +
            `<figcaption>${this.description.GetValue()}</figcaption>` +
            `</figure>`;
    }

    ParseFromHTML(html: string): ArticleMakerItem
    {
        let tempElement = new TemporaryElement();
        let $tempDiv = $("#" + tempElement.GetId());
        $tempDiv.append(html);

        this.file.SetValue($tempDiv.find("img").prop("src").extractNameFromPath());
        this.description.SetValue($tempDiv.find("figcaption").html());
        this.alt.SetValue($tempDiv.find("img").prop("alt"));

        tempElement.Destroy();
        return this;
    }

}