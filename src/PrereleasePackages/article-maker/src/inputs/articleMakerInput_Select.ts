import { ArticleMakerInput_ValueBasedInput } from "./articleMakerInput_ValueBasedInput";
import { ValuePair } from "@drozdik.m/pair";
import { ArticleMakerLanguage } from "../articleMakerLanguage";

export class ArticleMakerInput_Select extends ArticleMakerInput_ValueBasedInput
{
    options: ValuePair<string, string>[] = [];

    constructor(name: string, label: string, articleMakerId: string, options: ValuePair<string, string>[])
    {
        super(name, label, articleMakerId);
        this.options = options;
        this.value = options[0].first;
    }

    GenerateHTML(): string
    {
        let optionString = "";
        for (let i = 0; i < this.options.length; i++)
        {
            if (this.value === this.options[i].first)
                optionString += `<option value="${this.options[i].first}" selected>${this.options[i].second}</option>`;
            else
                optionString += `<option value="${this.options[i].first}">${this.options[i].second}</option>`;
        }

        return `
            <div class="articleMakerItemInput formBlock">
                <label for="${this.id}">${this.label}</label>
                <select id="${this.id}">
                    ${optionString}
                </select>
            </div>
        `;
    }
}