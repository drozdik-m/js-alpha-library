import { ArticleMakerItem } from "../articleMakerItem";
import { ArticleMakerInput_Textarea } from "../inputs/articleMakerInput_Textarea";
import { ArticleMakerLanguage } from "../articleMakerLanguage";
import { TemporaryElement } from "../temporaryElement/temporaryElement";
import { ArticleMakerInput } from "../articleMakerInput";

//ID: 0
export class ArticleMakerItem_Paragraph extends ArticleMakerItem
{
    content: ArticleMakerInput;

    constructor(name: string, articleMakerId: string)
    {
        super(name, articleMakerId);
        this.typeId = 0;
        this.typeName = ArticleMakerLanguage.GetWord("Paragraph - Name");

        //Content
        this.content = new ArticleMakerInput_Textarea("text", ArticleMakerLanguage.GetWord("Text"), this.articleMakerId, true);
        this.AddInput(this.content);
    }

    GeneratePreview()
    {
        return `<p>${this.content.GetValue()}</p>`;
    }

    GenerateHTML()
    {
        return `<p data-item-type-id="${this.typeId}" data-item-name="${this.nameInput.GetValue()}">${this.content.GetValue()}</p>`;
    }

    ParseFromHTML(html: string): ArticleMakerItem
    {
        let tempElement = new TemporaryElement();
        let $element = $("#" + tempElement.GetId());
        $element.append(html);

        let $paragraph = $element.find("p");
        this.content.SetValue($paragraph.html());

        tempElement.Destroy();
        return this;
    }

}