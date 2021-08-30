import { Stack } from "@drozdik.m/stack";
import { BonsaiMarkupElement } from "./bonsaiMarkupElement";
import { BonsaiMarkupElement_Unpaired } from "./bonsaiMarkupElement_Unpaired";
import { BonsaiMarkupElement_Paired } from "./bonsaiMarkupElement_Paired";
import { BonsaiMarkupElement_Link } from "./bonsaiMarkupElement_Link";
import { BonsaiMarkupSettings } from "./bonsaiMarkupSettings";
import "../string/string";
import { BonsaiMarkupMarks } from "../bonsaiMarkupSettings/bonsaiMarkupSettings";

//--------------------------------------------------
//----------BONSAI MARKUP---------------------------
//--------------------------------------------------
export class BonsaiMarkup
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    static unpairMarkups: BonsaiMarkupElement_Unpaired[] = BonsaiMarkupMarks.unpairMarkups;
    static pairMarkups: BonsaiMarkupElement_Paired[] = BonsaiMarkupMarks.pairMarkups;


    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    constructor()
    {
        console.warn("This is static class and there should be no instance created");
    }


    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------

    /**
     * Checks if markup text has valid syntax
     * @param markup Markup sample
     * @return True is input has valid syntax
     */
    static ValidateMarkup(markup: string): boolean
    {
        //Exceptions
        if (BonsaiMarkup.pairMarkups.length == 0 || markup == "")
            return true;

        //Replace all ending tags with starting tags
        for (let i = 0; i < BonsaiMarkup.pairMarkups.length; i++)
        {
            markup = markup.replace(new RegExp(BonsaiMarkupSettings.markupToRegexFriendly(BonsaiMarkup.pairMarkups[i].markupSyntax.second), "g"),
                BonsaiMarkup.pairMarkups[i].markupSyntax.first);
        }

        //Remove all escaped markups
        for (let i = 0; i < BonsaiMarkup.pairMarkups.length; i++)
            markup = markup.replace(new RegExp(`[${BonsaiMarkupSettings.escapeCharMarkup}]${BonsaiMarkupSettings.markupToRegexFriendly(BonsaiMarkup.pairMarkups[i].markupSyntax.first)}`, "g"), "");

        //Build regexp
        let regexp = "";
        for (let i = 0; i < BonsaiMarkup.pairMarkups.length; i++)
        {
            regexp += `${BonsaiMarkupSettings.markupToRegexFriendly(BonsaiMarkup.pairMarkups[i].markupSyntax.first)}`;
            if (i != BonsaiMarkup.pairMarkups.length - 1)
                regexp += "|";
        }

        //Exceptions
        if (regexp == "")
            return true;

        //List all regexps and add the to 
        let regexpObject = new RegExp(regexp, "g");
        let resArray = [];
        let stack = new Stack();
        while ((resArray = regexpObject.exec(markup)) !== null)
        {
            if (resArray[0] == stack.Top())
                stack.Pop();
            else
                stack.Push(resArray[0]);
        }
        
        return stack.IsEmpty();
    }

    /**
     * Translates markup to HTML
     * @param markup Markup to translate
     * @returns Translated markup into HTML
     */
    static ToHTML(markup: string): string
    {
        //Translate HTML entities
        markup = BonsaiMarkupSettings.markupToHTMLEntities(markup);

        //Translate unpaired markups
        for (let i = 0; i < BonsaiMarkup.unpairMarkups.length; i++)
            markup = BonsaiMarkup.unpairMarkups[i].ToHTML(markup);

        //Translate paired markups
        for (let i = 0; i < BonsaiMarkup.pairMarkups.length; i++)
            markup = BonsaiMarkup.pairMarkups[i].ToHTML(markup);

        return markup;
    }

    /**
     * Translates HTML to markup
     * @param html HTML to translate
     * @returns Translated HTML into markup
     */
    static ToMarkup(html: string): string
    {
        //Translate HTML entities
        html = BonsaiMarkupSettings.HTMLEntitiesToMarkup(html);

        //Translate unpaired markups
        for (let i = 0; i < BonsaiMarkup.unpairMarkups.length; i++)
            html = BonsaiMarkup.unpairMarkups[i].ToMarkup(html);

        //Translate paired markups
        for (let i = 0; i < BonsaiMarkup.pairMarkups.length; i++)
            html = BonsaiMarkup.pairMarkups[i].ToMarkup(html);

        return html;
    }
}