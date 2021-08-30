import { FormInputArgs } from "../args/FormInputArgs";
import { FormInput } from "./FormInput";
import { RecaptchaV2 } from "@drozdik.m/recaptcha";

//--------------------------------------------------
//----------FORM INPUT------------------------------
//--------------------------------------------------
export class CaptchaFormInput extends FormInput
{
    private recaptcha: RecaptchaV2;

    constructor(element: HTMLElement, recaptcha: RecaptchaV2)
    {
        super(element);
        this.recaptcha = recaptcha;
    }

    Initialize(): void
    {
        let object: FormInput = this;
        let element = this.element;

        this.recaptcha.OnStateChange.Add(function ()
        {
            object.OnChange.Invoke(object, new FormInputArgs(element));
        });
    }

    Value(): boolean
    {
        return this.recaptcha.Validated();
    }

    Reset(): void
    {
        super.Reset();
        this.recaptcha.Reset();
    }
}