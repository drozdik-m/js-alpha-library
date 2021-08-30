import { ArticleMakerItem } from "../articleMakerItem";
import { TemporaryElement } from "../temporaryElement/temporaryElement";
import { ArticleMakerInput_Select } from "../inputs/articleMakerInput_Select";
import { ValuePair } from "@drozdik.m/pair";
import { ArticleMakerLanguage } from "../articleMakerLanguage";

//ID: 6
export class ArticleMakerItem_Divider extends ArticleMakerItem
{
    lineType: ArticleMakerInput_Select;

    constructor(name: string = "", articleMakerId: string)
    {
        super(name, articleMakerId);
        this.typeId = 6;
        this.typeName = ArticleMakerLanguage.GetWord("Divider - Name");

        //Line type
        this.lineType = new ArticleMakerInput_Select("type", "Druh", articleMakerId,
            [
                new ValuePair<string, string>("line", ArticleMakerLanguage.GetWord("Divider - Line")),
                new ValuePair<string, string>("transitionLine", ArticleMakerLanguage.GetWord("Divider - Transition line")),
                new ValuePair<string, string>("dotted", ArticleMakerLanguage.GetWord("Divider - Dots"))
            ]
        );
        this.AddInput(this.lineType);
    }

    GeneratePreview()
    {
        return ``;
    }

    GenerateHTML()
    {
        return `<div class="divider ${this.lineType.GetValue()}" data-item-type-id="${this.typeId}" data-item-name="${this.nameInput.GetValue()}"></div>`;
    }

    ParseFromHTML(html: string): ArticleMakerItem
    {
        let tempElement = new TemporaryElement();
        let $tempDiv = $("#" + tempElement.GetId());
        $tempDiv.append(html);

        let $theElement = $tempDiv.children();

        let listOfClasses = $theElement.attr("class").split(" ");
        this.lineType.SetValue(listOfClasses[listOfClasses.length - 1]);

        tempElement.Destroy()
        return this;
    }

}
