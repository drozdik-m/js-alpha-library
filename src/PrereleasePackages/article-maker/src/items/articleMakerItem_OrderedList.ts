import { ArticleMakerItem_List } from "./articleMakerItem_List";
import { ArticleMakerLanguage } from "../articleMakerLanguage";

//ID: 8
export class ArticleMakerItem_OrderedList extends ArticleMakerItem_List
{
    constructor(name: string = "", articleMakerId: string)
    {
        super(name, articleMakerId);
        this.typeId = 8;
        this.typeName = ArticleMakerLanguage.GetWord("Numberec list - Name");
    }

    GeneratePreview()
    {
        return `<ol>${this.GetListItemsFromTextareaString(this.content.GetValue())}</ol>`;
    }

    GenerateHTML()
    {
        return `<ol data-item-type-id="${this.typeId}" data-item-name="${this.nameInput.GetValue()}">${this.GetListItemsFromTextareaString(this.content.GetValue())}</ol>`;
    }

}