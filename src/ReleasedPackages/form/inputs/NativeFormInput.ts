import { FormInputArgs } from "../args/FormInputArgs";
import { FormInput } from "./FormInput";

//--------------------------------------------------
//----------FORM INPUT------------------------------
//--------------------------------------------------
export class NativeFormInput extends FormInput
{

    Initialize(): void
    {
        let object: FormInput = this;
        let element = this.element;
        this.element.addEventListener("change", function ()
        {
            object.OnChange.Invoke(object, new FormInputArgs(element));
        });
        this.element.addEventListener("input", function ()
        {
            object.OnChange.Invoke(object as FormInput, new FormInputArgs(element));
        });
    }

    Value(): string
    {
        return (this.element as any).value;
    }

    Reset(): void
    {
        super.Reset();

        (this.element as any).value = "";
        (this.element as any).checked = false;
    }
}