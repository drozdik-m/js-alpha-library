import { Event } from "@drozdik.m/event";
import * as $ from "jquery";
import { ArticleMakerLanguage } from "./articleMakerLanguage";
import { BonsaiMarkup } from "./bonsaiMarkup/bonsaiMarkup";
import { CommonDialogWindow } from "@drozdik.m/common-dialog-window";
import { BonsaiMarkupMarks } from "./bonsaiMarkupSettings/bonsaiMarkupSettings";
import { SelectedInputText } from "./selectedText/selectedInputText";
import { DialogWindow } from "@drozdik.m/dialog-window";

//--------------------------------------------------
//----------ARTICLE MAKER INPUT---------------------
//--------------------------------------------------
export abstract class ArticleMakerInput
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    //Name
    name: string;
    protected label: string;

    //Id
    id: string;
    protected articleMakerId: string;

    //Value
    protected value: string = "";

    //Callbacks
    OnRemove: Event<ArticleMakerInput, null> = new Event<ArticleMakerInput, null>();
    OnDestroy: Event<ArticleMakerInput, null> = new Event<ArticleMakerInput, null>();

    //Validation
    protected validation: boolean = false;

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    constructor(name: string, label: string, articleMakerId: string)
    {
        this.name = name;
        this.label = label;
        this.articleMakerId = articleMakerId;
        this.id = "articleMakerInput" + this.name;
    }

    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------

    /**
    * Generates input HTML and returns it
    */
    abstract GenerateHTML(): string

    /**
    * Destroy appended input
    */
    Destroy()
    {
        let $parent = $("#" + this.articleMakerId);
        let $element = $parent.find("#" + this.id);
        if ($element.length != 0)
        {
            this.OnDestroy.Invoke(this, null);
            $element.remove();
        } 
    }

    /**
    * On complete element removal
    */
    Remove()
    {
        this.OnRemove.Invoke(this, null);
    }

    /**
    * Returns value of the generated input
    * @param parentId Parent of the input
    */
    ReadValue(): string
    {
        return "";
    }

    /**
    * Reads input value and saves it
    */
    SaveValue()
    {
        this.value = this.ReadValue();
    }

    /**
    * Return true if content has valid markup syntax
    */
    CheckSyntax(): boolean
    {
        //Validation off
        if (!this.validation)
            return true;

        let $maker = $("#" + this.articleMakerId);
        let $item = $maker.find("#" + this.id);

        //Not valid
        if (!BonsaiMarkup.ValidateMarkup(this.ReadValue()))
        {
            $item.addClass("invalidInput");
            return false;
        }
        //Valid
        else
        {
            $item.removeClass("invalidInput");
            return true;
        }
        
    }

    /**
    * Returns inputs value
    */
    GetValue(): string
    {
        if (this.validation)
            return BonsaiMarkup.ToHTML(this.value);
        return this.value;
    }

    /**
     * Sets new value
     * @param value New value
     */
    SetValue(value: string)
    {
        if (this.validation)
            this.value = BonsaiMarkup.ToMarkup(value);
        else
            this.value = value;
    }

    /**
     * Initializes markup button actions
     */
    static InitializeMarkupControls(inputId: string, articleMakerId: string)
    {
        //Elements
        let $input = $("#" + inputId);
        let $inputBlock = $input.closest(".articleMakerItemInput");
        let $markupButtons = $inputBlock.find(".markupButtons");

        //Buttons
        let $buttonBold = $markupButtons.find(".markupButtonBold");
        let $buttonItalic = $markupButtons.find(".markupButtonItalic");
        let $buttonUnderline = $markupButtons.find(".markupButtonUnderline");
        let $buttonLink = $markupButtons.find(".markupButtonLink");
        let $buttonSup = $markupButtons.find(".markupButtonSup");
        let $buttonSub = $markupButtons.find(".markupButtonSub");
        let $buttonSpecialCharacters = $markupButtons.find(".markupSpecialChars");

        //Selection check function
        let NoSelectionCheck: Function = function (selectedText: SelectedInputText)
        {
            if (selectedText.selectedText.length == 0)
            {
                CommonDialogWindow.Error(ArticleMakerLanguage.GetWord("Bonsai Markup - No text selected - Message"),
                    ArticleMakerLanguage.GetWord("Bonsai Markup - No text selected - Heading"),
                    ArticleMakerLanguage.GetWord("Buttons - Close"));
                return false;
            }
            return true;
        };

        //BUTTON ACTIONS
        //Bold
        $buttonBold.click(function ()
        {
            let selectedIndexes = new SelectedInputText(inputId);
            if (!NoSelectionCheck(selectedIndexes))
                return;
            selectedIndexes.ReplaceSelectedText(BonsaiMarkupMarks.bold.markupSyntax.first + selectedIndexes.selectedText + BonsaiMarkupMarks.bold.markupSyntax.second);
        });

        //Italic
        $buttonItalic.click(function ()
        {
            let selectedIndexes = new SelectedInputText(inputId);
            if (!NoSelectionCheck(selectedIndexes))
                return;
            selectedIndexes.ReplaceSelectedText(BonsaiMarkupMarks.italic.markupSyntax.first + selectedIndexes.selectedText + BonsaiMarkupMarks.italic.markupSyntax.second);
        });

        //Underline
        $buttonUnderline.click(function ()
        {
            let selectedIndexes = new SelectedInputText(inputId);
            if (!NoSelectionCheck(selectedIndexes))
                return;
            selectedIndexes.ReplaceSelectedText(BonsaiMarkupMarks.underline.markupSyntax.first + selectedIndexes.selectedText + BonsaiMarkupMarks.underline.markupSyntax.second);
        });

        //Link
        let addLinkEditor = new DialogWindow(`${articleMakerId}LinkEditorDialog`);
        let selectedIndexesLink = new SelectedInputText(inputId);
        $buttonLink.click(function ()
        {
            selectedIndexesLink.Update();
            if (!NoSelectionCheck(selectedIndexesLink))
                return;
            addLinkEditor.Open();
        });
        let $linkButtonsWrapper = $(`#${articleMakerId}LinkEditorDialog`);
        $linkButtonsWrapper.find(".confirmButton").click(function ()
        {
            let linkHref = $linkButtonsWrapper.find(`#${articleMakerId}LinkHref`).prop("value");
            let linkTitle = $linkButtonsWrapper.find(`#${articleMakerId}LinkTitle`).prop("value");
            let linkTarget = $linkButtonsWrapper.find(`#${articleMakerId}LinkTarget`).prop("value");

            let openingLink = `@@[${linkHref}]{${linkTitle}}|${linkTarget}|`;
            let closingLink = "@@";

            selectedIndexesLink.ReplaceSelectedText(openingLink + selectedIndexesLink.selectedText + closingLink);

            addLinkEditor.Close();
        });

        //Sup
        $buttonSup.click(function ()
        {
            let selectedIndexes = new SelectedInputText(inputId);
            if (!NoSelectionCheck(selectedIndexes))
                return;
            selectedIndexes.ReplaceSelectedText(BonsaiMarkupMarks.sup.markupSyntax.first + selectedIndexes.selectedText + BonsaiMarkupMarks.sup.markupSyntax.second);
        });

        //Sub
        $buttonSub.click(function ()
        {
            let selectedIndexes = new SelectedInputText(inputId);
            if (!NoSelectionCheck(selectedIndexes))
                return;
            selectedIndexes.ReplaceSelectedText(BonsaiMarkupMarks.sub.markupSyntax.first + selectedIndexes.selectedText + BonsaiMarkupMarks.sub.markupSyntax.second);
        });

        //Special characters
        let speciaCharsDialog = new DialogWindow(`${articleMakerId}SpecialCharsDialog`);
        let specialCharsSelectedIndexes = new SelectedInputText(inputId);
        $buttonSpecialCharacters.click(function ()
        {
            specialCharsSelectedIndexes.Update();
            speciaCharsDialog.Open();
        });
        let $specialCharsButtonsWrapper = $(`#${articleMakerId}SpecialCharsDialog`);
        $specialCharsButtonsWrapper.find(".confirmButton").click(function ()
        {
            let specialChar = $specialCharsButtonsWrapper.find(`#${articleMakerId}SpecialCharSelect`).prop("value");

            if (specialCharsSelectedIndexes.selectedText.length == 0)
                specialCharsSelectedIndexes.InsertAfterStart(specialChar);
            else
                specialCharsSelectedIndexes.ReplaceSelectedText(specialChar);

            speciaCharsDialog.Close();
        });
    }
}

