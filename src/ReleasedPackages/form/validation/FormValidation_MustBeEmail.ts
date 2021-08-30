import { FormInputValidation } from "./FormInputValidation";
import "@drozdik.m/string-extensions/dist/IsEmail";

export class FormValidation_MustBeEmail extends FormInputValidation
{
    Validate(): boolean
    {
        return (this.Input().Value() as string).IsEmail();
    }
}