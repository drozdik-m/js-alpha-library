import { ArticleMakerItem } from "../articleMakerItem";
import { ArticleMakerInput_File } from "../inputs/articleMakerInput_File";
import { ArticleMakerInput_TextInput } from "../inputs/articleMakerInput_TextInput";
import { ArticleMakerFileHandler } from "../articleMakerFileHandler";
import { ArticleMakerInput_Select } from "../inputs/articleMakerInput_Select";
import { ValuePair } from "@drozdik.m/pair";
import { ArticleMakerLanguage } from "../articleMakerLanguage";
import { TemporaryElement } from "../temporaryElement/temporaryElement";

//ID: 12
export class ArticleMakerItem_BigLink extends ArticleMakerItem
{
    file: ArticleMakerInput_File;
    alt: ArticleMakerInput_TextInput;
    heading: ArticleMakerInput_TextInput;
    description: ArticleMakerInput_TextInput;
    buttonText: ArticleMakerInput_TextInput;
    link: ArticleMakerInput_TextInput;
    buttonColor: ArticleMakerInput_Select;

    constructor(name: string = "", articleMakerId: string, fileHandler: ArticleMakerFileHandler)
    {
        super(name, articleMakerId);
        this.typeId = 12;
        this.typeName = ArticleMakerLanguage.GetWord("Big link - Name");

        //File
        this.file = new ArticleMakerInput_File("path", ArticleMakerLanguage.GetWord("Image - Path"), articleMakerId, fileHandler);
        this.AddInput(this.file);

        //Alt
        this.alt = new ArticleMakerInput_TextInput("alt", ArticleMakerLanguage.GetWord("Image - Description"), articleMakerId);
        this.AddInput(this.alt);

        //Heading
        this.heading = new ArticleMakerInput_TextInput("heading", ArticleMakerLanguage.GetWord("Big link - Heading"), articleMakerId);
        this.AddInput(this.heading);

        //Description
        this.description = new ArticleMakerInput_TextInput("description", ArticleMakerLanguage.GetWord("Big link - Description"), articleMakerId);
        this.AddInput(this.description);

        //Button text
        this.buttonText = new ArticleMakerInput_TextInput("buttonText", ArticleMakerLanguage.GetWord("Big link - Button text"), articleMakerId);
        this.AddInput(this.buttonText);

        //Button color
        this.buttonColor = new ArticleMakerInput_Select("buttonColor", ArticleMakerLanguage.GetWord("Big link - Button color"), articleMakerId, [
            new ValuePair<string, string>("", ArticleMakerLanguage.GetWord("Default")),
            new ValuePair<string, string>("commonButtonGreen", ArticleMakerLanguage.GetWord("Green")),
            new ValuePair<string, string>("commonButtonRed", ArticleMakerLanguage.GetWord("Red")),
            new ValuePair<string, string>("commonButtonYellow", ArticleMakerLanguage.GetWord("Yellow"))
        ]);
        this.AddInput(this.buttonColor);

        //Link
        this.link = new ArticleMakerInput_TextInput("link", ArticleMakerLanguage.GetWord("Bonsai Markup - Add link - Link - Label"), articleMakerId);
        this.AddInput(this.link);

    }

    GeneratePreview()
    {
        return `<p>${this.link.GetValue()}</p><p>${ArticleMakerLanguage.GetWord("Big link - Heading")}: ${this.heading.GetValue()}</p><p>${ArticleMakerLanguage.GetWord("Big link - Description")}: ${this.description.GetValue()}</p>`;
    }

    GenerateHTML()
    {

        return `<div class="bigLink" data-item-type-id="${this.typeId}" data-item-name="${this.nameInput.GetValue()}">` +
            `<figure class="bigLinkImage">` +
            `<img src="${this.file.GetValue()}" alt="${this.alt.GetValue()}" title="${this.alt.GetValue()}" />` +
            `</figure>` +
            `<div class="bigLinkText">` +
            `<span class="bigLinkHeading">${this.heading.GetValue()}</span>` +
            `<span class="bigLinkDescription">${this.description.GetValue()}</span>` +
            `<a href="${this.link.GetValue()}" title="Link: ${this.buttonText.GetValue()}" class="commonButton alignLeft ${this.buttonColor.GetValue()}">${this.buttonText.GetValue()}</a>` +
            `</div>` +
            `</div>`;
    }

    ParseFromHTML(html: string): ArticleMakerItem
    {
        let tempElement = new TemporaryElement();
        let $tempDiv = $("#" + tempElement.GetId());
        $tempDiv.append(html);

        this.file.SetValue($tempDiv.find("img").prop("src").extractNameFromPath());
        this.alt.SetValue($tempDiv.find("img").prop("alt"));
        this.heading.SetValue($tempDiv.find(".bigLinkHeading").html());
        this.description.SetValue($tempDiv.find(".bigLinkDescription").html());
        this.buttonText.SetValue($tempDiv.find(".commonButton").html());
        this.link.SetValue($tempDiv.find(".commonButton").prop("href"));

        let buttonClasses = $tempDiv.find(".commonButton").prop("class").split(" ");
        this.buttonColor.SetValue(buttonClasses[buttonClasses.length - 1]);

        tempElement.Destroy();
        return this;
    }

}