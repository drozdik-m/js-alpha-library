import { ArticleMakerInput } from "../articleMakerInput";

export abstract class ArticleMakerInput_ValueBasedInput extends ArticleMakerInput
{
    ReadValue(): string
    {
        let $parent = $("#" + this.articleMakerId);
        let $input = $parent.find("#" + this.id);
        let value = $input.prop("value");

        return value;
    }
}