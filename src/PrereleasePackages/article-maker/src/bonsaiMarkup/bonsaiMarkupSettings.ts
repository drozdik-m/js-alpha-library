import { ValuePair } from "@drozdik.m/pair";
import "@drozdik.m/string-extensions/ReplaceAll";

//--------------------------------------------------
//----------BONSAI MARKUP SETTINGS------------------
//--------------------------------------------------
export class BonsaiMarkupSettings
{
    //ESCAPE MARKUP
    static escapeCharMarkup: string = "/";
    static escapeCharHTML: string = `<span class="escapeChar"></span>`;

    //TEMP MARKUP
    static tempMarkup: string = "&temp;";

    //ENTITIES
    static entitiesList: ValuePair<string, string>[] = [
        new ValuePair<string, string>("<", "&lt;"),
        new ValuePair<string, string>(">", "&gt;"),
        new ValuePair<string, string>("\"", "&quot;"),
        new ValuePair<string, string>("'", "&apos;"),
        new ValuePair<string, string>("¢", "&cent;"),
        new ValuePair<string, string>("£", "&pound;"),
        new ValuePair<string, string>("¥", "&yen;"),
        new ValuePair<string, string>("€", "&euro;"),
        new ValuePair<string, string>("©", "&copy;"),
        new ValuePair<string, string>("®", "&reg;")
        //new Pair<string, string>("&", "&amp;")
    ]

    /**
     * Replaces all special characters in markup text to HTML entities
     * @param markup Markup string
     */
    static markupToHTMLEntities(markup: string)
    {
        for (let i = 0; i < this.entitiesList.length; i++)
            markup = markup.ReplaceAll(this.entitiesList[i].first, this.entitiesList[i].second);
        return markup;
    }
    /**
     * Replaces all HTML entities in HTML string to markup text
     * @param html HTML string
     */
    static HTMLEntitiesToMarkup(html: string)
    {
        for (let i = 0; i < this.entitiesList.length; i++)
            html = html.ReplaceAll(this.entitiesList[i].second, this.entitiesList[i].first);
        return html;
    }

    /**
     * Returns escaped characters, good for Regex search
     * @param markup Markup to translate
     */
    static markupToRegexFriendly(markup: string)
    {
        markup = markup.ReplaceAll("\\*", "\\*");
        markup = markup.ReplaceAll("\\[", "\\[");
        markup = markup.ReplaceAll("\\]", "\\]");
        markup = markup.ReplaceAll("\\(", "\\(");
        markup = markup.ReplaceAll("\\)", "\\)");
        markup = markup.ReplaceAll("\\|", "\\|");

        return markup;
    }

}