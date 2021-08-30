import { FormInputValidation } from "./FormInputValidation";
import { FormInput } from "../inputs/FormInput";

export class FormValidation_FileCountLimit extends FormInputValidation
{
    private maxCount: number = 0;

    constructor(input: FormInput, errorMessage: string, maxCount: number)
    {
        super(input, errorMessage);
        this.maxCount = maxCount;
    }

    Validate(): boolean
    {
        return (this.Input().Element() as any).files.length <= this.maxCount;
    }
}