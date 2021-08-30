import { FormInput } from "../inputs/FormInput";


//--------------------------------------------------
//----------FORM VALIDATION ELEMENTS----------------
//--------------------------------------------------
export abstract class FormInputValidation
{
    //Error message
    private errorMessage: string = "";

    //Input
    private input: FormInput;

    //Constructor
    constructor(input: FormInput, errorMessage: string)
    {
        this.input = input;
        this.errorMessage = errorMessage;
    }

    /**
     * Validates inputted element
     * @param element
     */
    abstract Validate(): boolean;

    /**
     * Returns current input
     * */
    Input(): FormInput
    {
        return this.input;
    }

    /**
     * Resets the validation process
     * @param element
     */
    Reset()
    {

    }

    /**
     * Returns error message text
     * */
    ErrorMessage(): string
    {
        return this.errorMessage;
    }
}