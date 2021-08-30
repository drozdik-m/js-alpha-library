import { BonsaiMarkupElement } from "./bonsaiMarkupElement";
import { BonsaiMarkupSettings } from "./bonsaiMarkupSettings";


//--------------------------------------------------
//----------UNPAIRED MARKUP ELEMENTS----------------
//--------------------------------------------------
export class BonsaiMarkupElement_Unpaired extends BonsaiMarkupElement
{
    markupSyntax: string;
    htmlSyntax: string;

    constructor(markupSyntax: string, htmlSyntax: string)
    {
        super();
        this.isPaired = false;
        this.markupSyntax = markupSyntax;
        this.htmlSyntax = htmlSyntax;
    }

    ToHTML(markup: string): string
    {
        //Translate syntax
        markup = markup.replace(new RegExp(`([^${BonsaiMarkupSettings.escapeCharMarkup}])(${BonsaiMarkupSettings.markupToRegexFriendly(this.markupSyntax)})`, "g"), `$1${this.htmlSyntax}`);
        markup = markup.replace(new RegExp(`^${BonsaiMarkupSettings.markupToRegexFriendly(this.markupSyntax)}`), this.htmlSyntax);

        //Translate escape chars
        markup = markup.replace(new RegExp(`(${BonsaiMarkupSettings.escapeCharMarkup})(${BonsaiMarkupSettings.markupToRegexFriendly(this.markupSyntax)})`, "g"), `${BonsaiMarkupSettings.escapeCharHTML}$2`);

        return markup;
    }

    ToMarkup(html: string): string
    {
        //Translate syntax
        html = html.replace(new RegExp(`(${this.htmlSyntax})`, "g"), `${this.markupSyntax}`);

        //Translate escape chars
        html = html.replace(new RegExp(BonsaiMarkupSettings.escapeCharHTML, "g"), BonsaiMarkupSettings.escapeCharMarkup);

        return html;
    }
}