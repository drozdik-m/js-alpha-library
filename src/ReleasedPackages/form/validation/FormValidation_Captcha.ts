import { FormInputValidation } from "./FormInputValidation";
import { RecaptchaV2 } from "@drozdik.m/recaptcha";
import { CaptchaFormInput } from "../inputs/CaptchaFormInput";

declare var grecaptcha: any;

export class FormValidation_Captcha extends FormInputValidation
{
    constructor(input: CaptchaFormInput, errorMessage: string)
    {
        super(input, errorMessage);
    }

    Validate(): boolean
    {
        return this.Input().Value() as boolean;
    }

    Reset()
    {
        if (typeof grecaptcha == "undefined")
        {
            console.error("FormValidation_Captcha.Reset(...) - grecaptcha is not defined");
            return;
        }
        (grecaptcha as any).reset();
    }
}

