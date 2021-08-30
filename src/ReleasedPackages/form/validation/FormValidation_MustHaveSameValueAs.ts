import { FormInputValidation } from "./FormInputValidation";
import { Form } from "../src/Form";
import { FormInput } from "../inputs/FormInput";


export class FormValidation_MustHaveSameValueAs extends FormInputValidation {
    private theOtherInput: FormInput;

    constructor(thisInput: FormInput, theOtherInput: FormInput, errorMessage: string)
    {
        super(thisInput, errorMessage);
        this.theOtherInput = theOtherInput;

        theOtherInput.OnChange.Add(function ()
        {
            thisInput.Validate();
        });
    }

    Validate(): boolean
    {
        let value = this.Input().Value() as string;
        let otherValue = this.theOtherInput.Value() as string;
        return value == otherValue;
    }
}
