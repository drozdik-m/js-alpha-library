import { FormInputValidation } from "./FormInputValidation";


export class FormValidation_MustHaveValue extends FormInputValidation
{

    Validate(): boolean
    {
        let value = this.Input().Value() as string; 
        return typeof value != "undefined" && value != "";
    }
}