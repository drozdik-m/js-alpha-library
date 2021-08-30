import { ArticleMakerItem_List } from "./articleMakerItem_List";
import { ArticleMakerLanguage } from "../articleMakerLanguage";


//ID: 7
export class ArticleMakerItem_UnorderedList extends ArticleMakerItem_List
{
    constructor(name: string = "", articleMakerId: string)
    {
        super(name, articleMakerId);
        this.typeId = 7;
        this.typeName = ArticleMakerLanguage.GetWord("Unordered list - Name");
    }

    GeneratePreview()
    {
        return `<ul>${this.GetListItemsFromTextareaString(this.content.GetValue())}</ul>`;
    }

    GenerateHTML()
    {
        return `<ul data-item-type-id="${this.typeId}" data-item-name="${this.nameInput.GetValue()}">${this.GetListItemsFromTextareaString(this.content.GetValue())}</ul>`;
    }

}