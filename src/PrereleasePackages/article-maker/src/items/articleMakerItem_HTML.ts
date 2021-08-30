import { ArticleMakerItem } from "../articleMakerItem";
import { ArticleMakerFileHandler } from "../articleMakerFileHandler";
import { TemporaryElement } from "../temporaryElement/temporaryElement";
import { ArticleMakerInput_Textarea } from "../inputs/articleMakerInput_Textarea";
import { ArticleMakerLanguage } from "../articleMakerLanguage";


//ID: 10
export class ArticleMakerItem_HTML extends ArticleMakerItem
{
    content: ArticleMakerInput_Textarea;

    constructor(name: string = "", articleMakerId: string)
    {
        super(name, articleMakerId);
        this.typeId = 10;
        this.typeName = ArticleMakerLanguage.GetWord("HTML - Name");

        //Content
        this.content = new ArticleMakerInput_Textarea("htmlCode", ArticleMakerLanguage.GetWord("HTML - Code"), articleMakerId);
        this.AddInput(this.content);
    }

    GeneratePreview()
    {
        return `<p>${this.content.GetValue()}</p>`;
    }

    GenerateHTML()
    {
        return `<div data-item-type-id="${this.typeId}" data-item-name="${this.nameInput.GetValue()}">${this.content.GetValue()}</div>`;
    }

    ParseFromHTML(html: string): ArticleMakerItem
    {
        let tempElement = new TemporaryElement();
        let $tempDiv = $("#" + tempElement.GetId());
        $tempDiv.append(html);

        let $theElement = $tempDiv.children();

        this.content.SetValue($theElement.html());

        tempElement.Destroy();
        return this;
    }

}