import { ArticleMakerItem_Paragraph } from "./articleMakerItem_Paragraph";
import { ArticleMakerLanguage } from "../articleMakerLanguage";

//ID: 1
export class ArticleMakerItem_ImportantText extends ArticleMakerItem_Paragraph
{
    constructor(name: string, articleMakerId: string)
    {
        super(name, articleMakerId);
        this.typeId = 1;
        this.typeName = ArticleMakerLanguage.GetWord("Important text - Name");
    }

    GenerateHTML()
    {
        return `<p class="importantText" data-item-type-id="${this.typeId}" data-item-name="${this.nameInput.GetValue()}">${this.content.GetValue()}</p>`;
    }

}