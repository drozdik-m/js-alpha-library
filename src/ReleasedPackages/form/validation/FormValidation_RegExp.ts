import { FormInputValidation } from "./FormInputValidation";
import { FormInput } from "../inputs/FormInput";

export class FormValidation_RegExp extends FormInputValidation
{
    private regExp: string = "";
    private regExpFlags: string = "";

    constructor(input: FormInput, errorMessage: string, regExp: string, regExpFlags: string = "")
    {
        super(input, errorMessage);
        this.regExp = regExp;
        this.regExpFlags = regExpFlags;
    }

    Validate(): boolean
    {
        let value = this.Input().Value() as string;
        let regExpObject = new RegExp(this.regExp, this.regExpFlags);
        return regExpObject.test(value);
    }
}