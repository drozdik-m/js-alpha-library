import { ArticleMakerInput_ValueBasedInput } from "./articleMakerInput_ValueBasedInput";

export class ArticleMakerInput_TextInput extends ArticleMakerInput_ValueBasedInput
{
    GenerateHTML(): string
    {
        return `
            <div class="articleMakerItemInput formBlock">
                <label for="${this.id}">${this.label}</label>
                <input id="${this.id}" type="text" value="${this.value}"/>
            </div>
        `;
    }

}