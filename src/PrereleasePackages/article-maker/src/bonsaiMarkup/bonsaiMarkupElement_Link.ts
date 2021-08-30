import { BonsaiMarkupSettings } from "./bonsaiMarkupSettings";
import { BonsaiMarkupElement_Paired } from "./bonsaiMarkupElement_Paired";
import { ValuePair } from "@drozdik.m/pair";

export class BonsaiMarkupElement_Link extends BonsaiMarkupElement_Paired
{
    linkUrlSyntax: ValuePair<string, string> = new ValuePair<string, string>("[", "]");
    titleSyntax: ValuePair<string, string> = new ValuePair<string, string>("{", "}");
    targetSyntax: ValuePair<string, string> = new ValuePair<string, string>("|", "|");

    constructor(markupSyntax: ValuePair<string, string> = new ValuePair<string, string>("@@", "@@"),
        htmlSyntax: ValuePair<string, string> = new ValuePair<string, string>("<a", "</a>"))
    {
        super(markupSyntax, htmlSyntax);
    }

    ToHTML(markup: string): string
    {
        let object = this;

        //Translate unescaped syntax to temporary character
        markup = this.TranslateUnescapedSyntaxToTempCharacter_ToHTML(markup);

        //Translate temporary characters to HTML syntax
        markup = markup.replace(new RegExp(`${BonsaiMarkupSettings.tempMarkup}((?!${BonsaiMarkupSettings.tempMarkup}).)*${BonsaiMarkupSettings.tempMarkup}`, "g"), function (match)
        {
            //Inner text (without border markup syntax)
            let innerText = match.slice(BonsaiMarkupSettings.tempMarkup.length, match.length - BonsaiMarkupSettings.tempMarkup.length);

            //Replace all unescaped bracket syntax with "bracket + tempChar"
            //innerText = innerText.replace(`^${BonsaiMarkupSettings.markupToRegexFriendly(object.linkUrlSyntax.first)}`, `${object.linkUrlSyntax.first}${BonsaiMarkupSettings.tempMarkup}`);
            //innerText = innerText.replace(`([^${BonsaiMarkupSettings.escapeCharMarkup}])(${BonsaiMarkupSettings.markupToRegexFriendly(object.linkUrlSyntax.first)}`, `$1${object.linkUrlSyntax.first}${BonsaiMarkupSettings.tempMarkup}`);

            //Link
            let outerLink = innerText.match(new RegExp(`${BonsaiMarkupSettings.markupToRegexFriendly(object.linkUrlSyntax.first)}((?!${BonsaiMarkupSettings.markupToRegexFriendly(object.linkUrlSyntax.second)}).)*${BonsaiMarkupSettings.markupToRegexFriendly(object.linkUrlSyntax.second)}`));
            let link = null;
            if (outerLink != null)
            {
                link = outerLink[0].slice(object.linkUrlSyntax.first.length, outerLink[0].length - object.linkUrlSyntax.second.length);
                innerText = innerText.replace(new RegExp(BonsaiMarkupSettings.markupToRegexFriendly(outerLink[0])), "");
            }

            //Title
            let outerTitle = innerText.match(new RegExp(`${BonsaiMarkupSettings.markupToRegexFriendly(object.titleSyntax.first)}((?!${BonsaiMarkupSettings.markupToRegexFriendly(object.titleSyntax.second)}).)*${BonsaiMarkupSettings.markupToRegexFriendly(object.titleSyntax.second)}`));
            let title = null;
            if (outerTitle != null)
            {
                title = outerTitle[0].slice(object.titleSyntax.first.length, outerTitle[0].length - object.titleSyntax.second.length);
                innerText = innerText.replace(new RegExp(BonsaiMarkupSettings.markupToRegexFriendly(outerTitle[0])), "");
            }

            //Target
            let outerTarget = innerText.match(new RegExp(`${BonsaiMarkupSettings.markupToRegexFriendly(object.targetSyntax.first)}((?!${BonsaiMarkupSettings.markupToRegexFriendly(object.targetSyntax.second)}).)*${BonsaiMarkupSettings.markupToRegexFriendly(object.targetSyntax.second)}`));
            let target = null;
            if (outerTarget != null)
            {
                target = outerTarget[0].slice(object.targetSyntax.first.length, outerTarget[0].length - object.targetSyntax.second.length);
                innerText = innerText.replace(new RegExp(BonsaiMarkupSettings.markupToRegexFriendly(outerTarget[0])), "");
            }

            //Build HTML
            let finalString = object.htmlSyntax.first;

            if (link != null)
                finalString += ` href="${link}"`;

            if (title != null)
                finalString += ` title="${title}"`;
            else if (link != null)
                finalString += ` title="Link: ${link}"`;

            if (target != null)
                finalString += ` target="${target}"`;
            else if (link != null)
                finalString += ` target="_blank"`;

            finalString += `>${innerText}${object.htmlSyntax.second}`;

            return finalString;
        }); 

        //Translate escape characters
        markup = this.TranslateEscapeCharacters_ToHTML(markup);
        
        return markup;
    }

    ToMarkup(html: string): string
    {
        let object = this;

        //Translate syntax
        html = html.replace(new RegExp(`${this.htmlSyntax.first}((?!${this.htmlSyntax.second}).)*${this.htmlSyntax.second}`, "g"), function (match)
        {
            //Link
            let linkReg = match.match(new RegExp(`href="[^"]*"`));
            let link: string = null;
            if (linkReg != null)
                link = linkReg[0].slice(6, linkReg[0].length - 1);

            //Title
            let titleReg = match.match(new RegExp(`title="[^"]*"`));
            let title: string = null;
            if (titleReg != null)
                title = titleReg[0].slice(7, titleReg[0].length - 1);

            //Target
            let targetReg = match.match(new RegExp(`target="[^"]*"`));
            let target: string = null;
            if (targetReg != null)
                target = targetReg[0].slice(8, targetReg[0].length - 1);

            //Content
            let contentReg = match.match(new RegExp(`>(.)*${object.htmlSyntax.second}`));
            let content = "";
            if (contentReg != null)
                content = contentReg[0].slice(1, contentReg[0].length - object.htmlSyntax.second.length);

            let parameters = "";
            if (link != null)
                parameters += `${object.linkUrlSyntax.first}${link}${object.linkUrlSyntax.second}`;
            if (title != null)
                parameters += `${object.titleSyntax.first}${title}${object.titleSyntax.second}`;
            if (target != null)
                parameters += `${object.targetSyntax.first}${target}${object.targetSyntax.second}`;

            return `${object.markupSyntax.first}${parameters}${content}${object.markupSyntax.second}`;
        });

        //Translate escape characters
        html = this.TranslateEscapeCharacters_ToMarkup(html);

        return html;
    }
}