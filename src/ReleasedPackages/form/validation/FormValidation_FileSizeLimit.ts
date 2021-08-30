import { FormInputValidation } from "./FormInputValidation";
import { FormInput } from "../inputs/FormInput";

export class FormValidation_FileSizeLimit extends FormInputValidation
{
    private maxSize: number = 0;

    constructor(input: FormInput, errorMessage: string, maxSize: number)
    {
        super(input, errorMessage);
        this.maxSize = maxSize;
    }

    Validate(): boolean
    {
        let filesSize = 0;
        for (let i = 0; i < (this.Input().Element() as any).files.length; i++)
            filesSize += (this.Input().Element() as any).files[i].size;
        return filesSize <= this.maxSize;
    }
}