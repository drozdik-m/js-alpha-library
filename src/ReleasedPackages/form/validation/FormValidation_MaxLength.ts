import { FormInputValidation } from "./FormInputValidation";
import { FormInput } from "../inputs/FormInput";

export class FormValidation_MaxLength extends FormInputValidation
{
    private maxLength: number = -1;
    constructor(input: FormInput, errorMessage: string, maxLength: number)
    {
        super(input, errorMessage);
        this.maxLength = maxLength;
    }

    Validate(): boolean
    {
        let value = this.Input().Value() as string;
        return value.length <= this.maxLength;
    }
}