import { ValuePair } from "@drozdik.m/pair";
import { ArticleMakerItem } from "../articleMakerItem";
import { ArticleMakerInput } from "../articleMakerInput";
import { ArticleMakerInput_Textarea } from "../inputs/articleMakerInput_Textarea";
import { ArticleMakerInput_Select } from "../inputs/articleMakerInput_Select";
import { TemporaryElement } from "../temporaryElement/temporaryElement";
import { ArticleMakerLanguage } from "../articleMakerLanguage";

//ID: 13
export class ArticleMakerItem_CodeSnippet extends ArticleMakerItem
{
    language: ArticleMakerInput_Select;
    content: ArticleMakerInput_Textarea;

    constructor(name: string = "", articleMakerId: string)
    {
        super(name, articleMakerId);
        this.typeId = 13;
        this.typeName = ArticleMakerLanguage.GetWord("Code snippet - Name");

        //Level
        this.language = new ArticleMakerInput_Select("language", ArticleMakerLanguage.GetWord("Code snippet - Language"), articleMakerId,
            [
                new ValuePair<string, string>("html", `HTML`),
                new ValuePair<string, string>("css", `CSS`),
                new ValuePair<string, string>("scss", `SCSS`),
                new ValuePair<string, string>("javascript", `JavaScript`),
                new ValuePair<string, string>("typescript", `TypeScript`),
                new ValuePair<string, string>("json", `JSON`),
                new ValuePair<string, string>("cpp", `C++`),
                new ValuePair<string, string>("csharp", `C#`),
                new ValuePair<string, string>("java", `Java`),
                new ValuePair<string, string>("plaintext", `Plain text`),
            ]
        );
        this.AddInput(this.language);

        //Content
        this.content = new ArticleMakerInput_Textarea("code", ArticleMakerLanguage.GetWord("Code snippet - Code"), articleMakerId, true);
        this.AddInput(this.content);
    }

    GeneratePreview()
    {
        return this.GenerateHTML();
    }

    GenerateHTML()
    {
        return `<pre data-item-type-id="${this.typeId}" data-item-name="${this.nameInput.GetValue()}"><code data-article-maker-code-language="${this.language.GetValue()}" class="${this.language.GetValue()}">${this.content.GetValue()}</code></pre>`;
    }

    ParseFromHTML(html: string): ArticleMakerItem
    {
        let tempElement = new TemporaryElement();
        let $tempDiv = $("#" + tempElement.GetId());
        $tempDiv.append(html);

        let $theElement = $tempDiv.children();

        this.language.SetValue($theElement.children().attr("data-article-maker-code-language"));
        this.content.SetValue($theElement.children().html());

        tempElement.Destroy();
        return this;
    }

    
}