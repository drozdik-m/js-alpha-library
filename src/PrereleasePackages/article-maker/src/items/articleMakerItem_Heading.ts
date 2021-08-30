import { ValuePair } from "@drozdik.m/pair";
import { ArticleMakerItem } from "../articleMakerItem";
import { ArticleMakerInput } from "../articleMakerInput";
import { ArticleMakerInput_TextInput } from "../inputs/articleMakerInput_TextInput";
import { ArticleMakerInput_Select } from "../inputs/articleMakerInput_Select";
import { TemporaryElement } from "../temporaryElement/temporaryElement";
import { ArticleMakerLanguage } from "../articleMakerLanguage";

//ID: 3
export class ArticleMakerItem_Heading extends ArticleMakerItem
{
    level: ArticleMakerInput_Select;
    content: ArticleMakerInput_TextInput;

    constructor(name: string = "", articleMakerId: string)
    {
        super(name, articleMakerId);
        this.typeId = 3;
        this.typeName = ArticleMakerLanguage.GetWord("Heading - Name");

        //Level
        this.level = new ArticleMakerInput_Select("level", ArticleMakerLanguage.GetWord("Header - Level"), articleMakerId,
            [
                new ValuePair<string, string>("2", `${ArticleMakerLanguage.GetWord("Header - Level")} 2`),
                new ValuePair<string, string>("3", `${ArticleMakerLanguage.GetWord("Header - Level")} 3`),
                new ValuePair<string, string>("4", `${ArticleMakerLanguage.GetWord("Header - Level")} 4`),
                new ValuePair<string, string>("5", `${ArticleMakerLanguage.GetWord("Header - Level")} 5`),
                new ValuePair<string, string>("6", `${ArticleMakerLanguage.GetWord("Header - Level")} 6`)
            ]
        );
        this.AddInput(this.level);

        //Content
        this.content = new ArticleMakerInput_TextInput("text", ArticleMakerLanguage.GetWord("Text"), articleMakerId);
        this.AddInput(this.content);
    }

    GeneratePreview()
    {
        return `<p class="bold">${this.content.GetValue()}</p>`;
    }

    GenerateHTML()
    {
        return `<h${this.level.GetValue()} data-item-type-id="${this.typeId}" data-item-name="${this.nameInput.GetValue()}">${this.content.GetValue()}</h${this.level.GetValue()}>`;
    }

    ParseFromHTML(html: string): ArticleMakerItem
    {
        let tempElement = new TemporaryElement();
        let $tempDiv = $("#" + tempElement.GetId());
        $tempDiv.append(html);

        let $theElement = $tempDiv.children();

        this.level.SetValue($theElement[0].tagName[1]);
        this.content.SetValue($theElement.html());

        tempElement.Destroy();
        return this;
    }

}