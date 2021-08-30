import { BonsaiMarkupElement } from "./bonsaiMarkupElement";
import { BonsaiMarkupSettings } from "./bonsaiMarkupSettings";
import { ValuePair } from "@drozdik.m/pair";

//--------------------------------------------------
//----------PAIRED MARKUP ELEMENTS------------------
//--------------------------------------------------
export class BonsaiMarkupElement_Paired extends BonsaiMarkupElement
{
    markupSyntax: ValuePair<string, string>;
    htmlSyntax: ValuePair<string, string>;

    constructor(markupSyntax: ValuePair<string, string>, htmlSyntax: ValuePair<string, string>)
    {
        super();
        this.isPaired = true;
        this.markupSyntax = markupSyntax;
        this.htmlSyntax = htmlSyntax;
    }

    protected TranslateUnescapedSyntaxToTempCharacter_ToHTML(markup: string): string
    {
        for (let i: string[] = [this.markupSyntax.first, this.markupSyntax.second]; i.length > 0; i.pop())
        {
            markup = markup.replace(new RegExp(`([^${BonsaiMarkupSettings.escapeCharMarkup}])(${BonsaiMarkupSettings.markupToRegexFriendly(i[i.length - 1])})`, "g"), `$1${BonsaiMarkupSettings.tempMarkup}`);
            markup = markup.replace(new RegExp(`^${BonsaiMarkupSettings.markupToRegexFriendly(i[i.length - 1])}`), BonsaiMarkupSettings.tempMarkup);
        }

        return markup;
    }
    protected TranslateEscapeCharacters_ToHTML(markup: string): string
    {
        for (let i: string[] = [this.markupSyntax.first, this.markupSyntax.second]; i.length > 0; i.pop())
            markup = markup.replace(new RegExp(`(${BonsaiMarkupSettings.escapeCharMarkup})(${BonsaiMarkupSettings.markupToRegexFriendly(i[i.length - 1])})`, "g"), `${BonsaiMarkupSettings.escapeCharHTML}$2`);

        return markup;
    }
    ToHTML(markup: string): string
    {
        let object = this;

        //Translate unescaped syntax to temporary character
        markup = this.TranslateUnescapedSyntaxToTempCharacter_ToHTML(markup);

        //Translate temporary characters to HTML syntax
        let isStartingTag = false;
        markup = markup.replace(new RegExp(BonsaiMarkupSettings.tempMarkup, "g"), function (x)
        {
            isStartingTag = !isStartingTag;
            if (isStartingTag)
                return object.htmlSyntax.first;
            return object.htmlSyntax.second;
        });

        //Translate escape characters
        markup = this.TranslateEscapeCharacters_ToHTML(markup);

        return markup;
    }


    protected TranslateEscapeCharacters_ToMarkup(html: string): string
    {
        return html.replace(new RegExp(BonsaiMarkupSettings.escapeCharHTML, "g"), BonsaiMarkupSettings.escapeCharMarkup);
    }
    ToMarkup(html: string): string
    {
        //Translate syntax
        html = html.replace(new RegExp(this.htmlSyntax.first, "g"), this.markupSyntax.first);
        html = html.replace(new RegExp(this.htmlSyntax.second, "g"), this.markupSyntax.second);

        //Translate escape characters
        html = this.TranslateEscapeCharacters_ToMarkup(html);

        return html;
    }

}