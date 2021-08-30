import { ArticleMakerItem_Paragraph } from "./articleMakerItem_Paragraph";
import { ArticleMakerLanguage } from "../articleMakerLanguage";

//ID: 2
export class ArticleMakerItem_TextWithSideBorder extends ArticleMakerItem_Paragraph
{
    constructor(name: string, articleMakerId: string)
    {
        super(name, articleMakerId);
        this.typeId = 2;
        this.typeName = ArticleMakerLanguage.GetWord("Text with side line - Name");
    }

    GenerateHTML()
    {
        return `<p class="thickLeftBorder" data-item-type-id="${this.typeId}" data-item-name="${this.nameInput.GetValue()}">${this.content.GetValue()}</p>`;
    }
}