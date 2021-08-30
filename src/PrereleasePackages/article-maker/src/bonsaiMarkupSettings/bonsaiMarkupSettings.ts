
import { ValuePair } from "@drozdik.m/pair";
import { BonsaiMarkupElement_Paired } from "../bonsaiMarkup/bonsaiMarkupElement_Paired";
import { BonsaiMarkupElement_Link } from "../bonsaiMarkup/bonsaiMarkupElement_Link";
import { BonsaiMarkupElement_Unpaired } from "../bonsaiMarkup/bonsaiMarkupElement_Unpaired";

//--------------------------------------------------
//----------BONSAI MARKUP GLOBAL VARIABLES----------
//--------------------------------------------------
export class BonsaiMarkupMarks
{
    static bold: BonsaiMarkupElement_Paired = new BonsaiMarkupElement_Paired(new ValuePair<string, string>("**", "**"), new ValuePair<string, string>("<strong>", "</strong>"));
    static italic: BonsaiMarkupElement_Paired = new BonsaiMarkupElement_Paired(new ValuePair<string, string>("__", "__"), new ValuePair<string, string>("<em>", "</em>"));
    static underline: BonsaiMarkupElement_Paired = new BonsaiMarkupElement_Paired(new ValuePair<string, string>("||", "||"), new ValuePair<string, string>("<span class=\"underline\">", "</span>"));
    static sup: BonsaiMarkupElement_Paired = new BonsaiMarkupElement_Paired(new ValuePair<string, string>("---", "---"), new ValuePair<string, string>("<sup>", "</sup>"));
    static sub: BonsaiMarkupElement_Paired = new BonsaiMarkupElement_Paired(new ValuePair<string, string>("-_-", "-_-"), new ValuePair<string, string>("<sub>", "</sub>"));
    static link: BonsaiMarkupElement_Link = new BonsaiMarkupElement_Link();
    static br: BonsaiMarkupElement_Unpaired = new BonsaiMarkupElement_Unpaired("&&", "<br />");
    static nbsp: BonsaiMarkupElement_Unpaired = new BonsaiMarkupElement_Unpaired("#nbsp;", "&nbsp;");


    //--------------------------------------------------
    //----------BONSAI MARKUP - PAIRED MARKUP-----------
    //--------------------------------------------------
    static pairMarkups = [
        BonsaiMarkupMarks.bold,
        BonsaiMarkupMarks.italic,
        BonsaiMarkupMarks.underline,
        BonsaiMarkupMarks.sup,
        BonsaiMarkupMarks.sub,
        new BonsaiMarkupElement_Paired(new ValuePair<string, string>("##", "##"), new ValuePair<string, string>("<s>", "</s>")),
        BonsaiMarkupMarks.link
    ];

    //--------------------------------------------------
    //----------BONSAI MARKUP - UNPAIRED MARKUP---------
    //--------------------------------------------------
    static unpairMarkups = [
        BonsaiMarkupMarks.br,
        BonsaiMarkupMarks.nbsp
    ];
}
