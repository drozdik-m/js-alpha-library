import { ArticleMakerItem } from "../articleMakerItem";
import { ArticleMakerInput_TextInput } from "../inputs/articleMakerInput_TextInput";
import { ArticleMakerInput_Textarea } from "../inputs/articleMakerInput_Textarea";
import { TemporaryElement } from "../temporaryElement/temporaryElement";
import { ArticleMakerLanguage } from "../articleMakerLanguage";


//ID: 4
export class ArticleMakerItem_Quotation extends ArticleMakerItem
{
    content: ArticleMakerInput_Textarea;
    author: ArticleMakerInput_TextInput;

    constructor(name: string = "", articleMakerId: string)
    {
        super(name, articleMakerId);
        this.typeId = 4;
        this.typeName = ArticleMakerLanguage.GetWord("Quotation - Name");

        //Content
        this.content = new ArticleMakerInput_Textarea("cite", ArticleMakerLanguage.GetWord("Quotation - Text"), articleMakerId);
        this.AddInput(this.content);

        //Author
        this.author = new ArticleMakerInput_TextInput("author", ArticleMakerLanguage.GetWord("Quotation - Author"), articleMakerId);
        this.AddInput(this.author);
    }

    GeneratePreview()
    {
        return `<p>${ArticleMakerLanguage.GetWord("Quotation - Text")}: ${this.content.GetValue()}</p>
                <p>${ArticleMakerLanguage.GetWord("Quotation - Author")}: ${this.author.GetValue()}</p>`;
    }

    GenerateHTML()
    {
        return `<blockquote data-item-type-id="${this.typeId}" data-item-name="${this.nameInput.GetValue()}"><p>${this.content.GetValue()}</p><cite>${this.author.GetValue()}</cite></blockquote>`;
    }

    ParseFromHTML(html: string): ArticleMakerItem
    {
        let tempElement = new TemporaryElement();
        let $tempDiv = $("#" + tempElement.GetId());
        $tempDiv.append(html);

        let $theElement = $tempDiv.children();

        this.content.SetValue($theElement.find("> p").html());
        this.author.SetValue($theElement.find("> cite").html());

        tempElement.Destroy();
        return this;
    }

}