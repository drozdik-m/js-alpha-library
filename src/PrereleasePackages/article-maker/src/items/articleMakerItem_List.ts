import { ArticleMakerItem } from "../articleMakerItem";
import { TemporaryElement } from "../temporaryElement/temporaryElement";
import { ArticleMakerInput_Textarea } from "../inputs/articleMakerInput_Textarea";
import { ArticleMakerLanguage } from "../articleMakerLanguage";

export abstract class ArticleMakerItem_List extends ArticleMakerItem
{
    content: ArticleMakerInput_Textarea;

    constructor(name: string = "", articleMakerId: string)
    {
        super(name, articleMakerId);

        //Content
        this.content = new ArticleMakerInput_Textarea("items", ArticleMakerLanguage.GetWord("List - Items"), articleMakerId);
        this.AddInput(this.content);
    }

    GetListItemsFromTextareaString(textareaString: string): string
    {
        let items = textareaString.split("\n");
        let itemsHTML = "";
        for (let i = 0; i < items.length; i++)
            if (items[i] != " " && items[i] != "")
                itemsHTML += `<li>${items[i]}</li>`;
        return itemsHTML;
    }

    ParseFromHTML(html: string): ArticleMakerItem
    {
        let tempElement = new TemporaryElement();
        let $tempDiv = $("#" + tempElement.GetId());
        $tempDiv.append(html);

        let $theElement = $tempDiv.children();

        let object = this;
        let value = "";
        let elementsCount = $theElement.find("li").length;
        $theElement.find("li").each(function (i)
        {
            value += $(this).html();
            if (i != elementsCount - 1)
                value += "\n";
        });
        this.content.SetValue(value);

        tempElement.Destroy();
        return this;
    }
}