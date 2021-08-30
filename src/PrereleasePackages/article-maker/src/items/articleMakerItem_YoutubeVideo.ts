import { ArticleMakerItem } from "../articleMakerItem";
import { ArticleMakerInput_TextInput } from "../inputs/articleMakerInput_TextInput";
import { TemporaryElement } from "../temporaryElement/temporaryElement";
import { ArticleMakerLanguage } from "../articleMakerLanguage";
import "@drozdik.m/string-extensions/ExtractYoutubeId";

//ID: 9
export class ArticleMakerItem_YoutubeVideo extends ArticleMakerItem
{
    videoLink: ArticleMakerInput_TextInput;

    constructor(name: string = "", articleMakerId: string)
    {
        super(name, articleMakerId);
        this.typeId = 9;
        this.typeName = ArticleMakerLanguage.GetWord("Youtube video - Name");

        //Video link
        this.videoLink = new ArticleMakerInput_TextInput("link", ArticleMakerLanguage.GetWord("Youtube video - Link"), articleMakerId);
        this.AddInput(this.videoLink);
    }

    GeneratePreview()
    {
        return `<p>${ArticleMakerLanguage.GetWord("Youtube video - Link")}: ${this.videoLink.GetValue()}</p>`;
    }

    GenerateHTML()
    {
        return `<div class="youtubeWrapper" data-item-type-id="${this.typeId}" data-item-name="${this.nameInput.GetValue()}"><iframe src="https://www.youtube.com/embed/${this.videoLink.GetValue().ExtractYoutubeId()}" frameborder="0" allowfullscreen></iframe></div>`;
    }

    ParseFromHTML(html: string): ArticleMakerItem
    {
        let tempElement = new TemporaryElement();
        let $tempDiv = $("#" + tempElement.GetId());
        $tempDiv.append(html);

        let $theElement = $tempDiv.children();

        let iframeUrlArray = $theElement.find("iframe").attr("src").split("/");
        this.videoLink.SetValue("https://www.youtube.com/watch?v=" + iframeUrlArray[iframeUrlArray.length - 1]);

        tempElement.Destroy();
        return this;
    }

}
