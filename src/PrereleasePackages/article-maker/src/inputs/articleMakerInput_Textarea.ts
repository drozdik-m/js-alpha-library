import { ArticleMakerInput_ValueBasedInput } from "./articleMakerInput_ValueBasedInput";
import { ArticleMakerLanguage } from "../articleMakerLanguage";
import { ArticleMakerInput } from "../articleMakerInput";
import { BonsaiMarkupMarks } from "../bonsaiMarkupSettings/bonsaiMarkupSettings";

export class ArticleMakerInput_Textarea extends ArticleMakerInput_ValueBasedInput
{
    constructor(name: string, label: string, articleMakerId: string, validation: boolean = false)
    {
        super(name, label, articleMakerId);
        this.validation = validation;
    }

    GenerateHTML(): string
    {
        let classes = "";
        if (this.validation)
            classes += "bonsaiMarkup ";

        //Markup buttons
        let markupButtons = "";
        if (this.validation)
            markupButtons += `
            <div class="markupButtons">
                <div class="markupButton markupButtonBold" title="${ArticleMakerLanguage.GetWord("Bonsai Markup - Bold")}">&nbsp;</div>
                <div class="markupButton markupButtonItalic" title="${ArticleMakerLanguage.GetWord("Bonsai Markup - Italic")}">&nbsp;</div>
                <div class="markupButton markupButtonUnderline" title="${ArticleMakerLanguage.GetWord("Bonsai Markup - Underline")}">&nbsp;</div>
                <div class="markupButton markupButtonLink" title="${ArticleMakerLanguage.GetWord("Bonsai Markup - Link")}">&nbsp;</div>
                <div class="markupButton markupButtonSup" title="${ArticleMakerLanguage.GetWord("Bonsai Markup - Upper index")}">&nbsp;</div>
                <div class="markupButton markupButtonSub" title="${ArticleMakerLanguage.GetWord("Bonsai Markup - Lower index")}">&nbsp;</div>
                <div class="markupButton markupSpecialChars" title="${ArticleMakerLanguage.GetWord("Bonsai Markup - Special characters")}">&nbsp;</div>
            </div>
            <div id="${this.articleMakerId}LinkEditorDialog" class="dialogWindow">
                <div class="dialogBackground dialogClose">&nbsp;</div>
                <div class="dialogContent">
                    <div class="dialogCross dialogClose"><div class="line line1">&nbsp;</div><div class="line line2">&nbsp;</div></div>
                    <p class="dialogWindowHeading">${ArticleMakerLanguage.GetWord("Bonsai Markup - Add link - Heading")}</p>
                    <div class="linkEditorInputsWrapper form commonForm">
                        <div class="formBlock">
                            <label for="${this.articleMakerId}LinkHref">${ArticleMakerLanguage.GetWord("Bonsai Markup - Add link - Link - Label")}</label>
                            <input type="text" id="${this.articleMakerId}LinkHref" />
                        </div>
                        <div class="formBlock">
                            <label for="${this.articleMakerId}LinkTitle">${ArticleMakerLanguage.GetWord("Bonsai Markup - Add link - Title - Label")}</label>
                            <input type="text" id="${this.articleMakerId}LinkTitle" />
                        </div>
                        <div class="formBlock">
                            <label for="${this.articleMakerId}LinkTarget">${ArticleMakerLanguage.GetWord("Bonsai Markup - Add link - Target - Label")}</label>
                            <select id="${this.articleMakerId}LinkTarget">
                                <option value="_self">${ArticleMakerLanguage.GetWord("Bonsai Markup - Add link - Target - Self")}</option>
                                <option value="_blank">${ArticleMakerLanguage.GetWord("Bonsai Markup - Add link - Target - Blank")}</option>
                            </select>
                        </div>
                    </div>
                    <div class="commonButtonWrapper">
                        <button type="button" type="button" class="commonButton commonButtonGreen confirmButton">${ArticleMakerLanguage.GetWord("Buttons - Insert")}</button>
                        <button type="button" class="commonButton dialogClose">${ArticleMakerLanguage.GetWord("Buttons - Close")}</button>
                    </div>
                </div>
            </div>
            <div id="${this.articleMakerId}SpecialCharsDialog" class="dialogWindow">
                <div class="dialogBackground dialogClose">&nbsp;</div>
                <div class="dialogContent">
                    <div class="dialogCross dialogClose"><div class="line line1">&nbsp;</div><div class="line line2">&nbsp;</div></div>
                    <p class="dialogWindowHeading">${ArticleMakerLanguage.GetWord("Bonsai Markup - Add char - Heading")}</p>
                    <div class="linkEditorInputsWrapper form commonForm">
                        <div class="formBlock">
                            <label for="${this.articleMakerId}SpecialCharSelect">${ArticleMakerLanguage.GetWord("Bonsai Markup - Add char - Label")}</label>
                            <select id="${this.articleMakerId}SpecialCharSelect">
                                <option value="${BonsaiMarkupMarks.nbsp.markupSyntax}">${ArticleMakerLanguage.GetWord("Bonsai Markup - Add char - Nbsp")}</option>
                                <option value="${BonsaiMarkupMarks.br.markupSyntax}">${ArticleMakerLanguage.GetWord("Bonsai Markup - Add char - Br")}</option>
                            </select>
                        </div>
                    </div>
                    <div class="commonButtonWrapper">
                        <button type="button" type="button" class="commonButton commonButtonGreen confirmButton">${ArticleMakerLanguage.GetWord("Buttons - Insert")}</button>
                        <button type="button" class="commonButton dialogClose">${ArticleMakerLanguage.GetWord("Buttons - Close")}</button>
                    </div>
                </div>
            </div>
        `;

        let markupInitialization = "";
        if (this.validation)
            markupInitialization += `
            <script>
                InitializeMarkupControls("${this.id}", "${this.articleMakerId}");
            </script>
        `;

        return `
            <div class="articleMakerItemInput formBlock ${classes}">
                <label for="${this.id}">${this.label}</label>
                ${markupButtons}
                <textarea id="${this.id}">${this.value}</textarea>
            </div>
            ${markupInitialization}
        `;
    }

}

(<any>window).InitializeMarkupControls = ArticleMakerInput.InitializeMarkupControls;