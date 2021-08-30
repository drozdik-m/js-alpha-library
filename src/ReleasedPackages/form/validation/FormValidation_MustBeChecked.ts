import { FormInputValidation } from "./FormInputValidation";

export class FormValidation_MustBeChecked extends FormInputValidation
{
    Validate(): boolean
    {

        return (this.Input().Element() as any).checked as boolean;
    }
}