import { FormInputValidation } from "../validation/FormInputValidation";
import { FormInputArgs } from "../args/FormInputArgs";
import { Event } from "@drozdik.m/event";

//--------------------------------------------------
//----------FORM INPUT------------------------------
//--------------------------------------------------
export abstract class FormInput
{
    //--------------------------------------------------
    //----------PROPERTIES------------------------------
    //--------------------------------------------------
    //Element
    protected id: string = "";
    protected element: HTMLElement = null;

    //Error list
    protected hasErrorList: boolean = false;
    protected errorList: HTMLElement = null;
    protected static errorListIdPostfix = "ErrorList";

    //Validation
    protected isValid: boolean = false;
    protected validations: FormInputValidation[] = [];
    protected static validInputClass = "validInput";
    protected static invalidInputClass = "invalidInput";

    //On change event
    public OnChange = new Event<FormInput, FormInputArgs>();

    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    /**
     * Form input element 
     * @param element Target HTML element
     */
    constructor(element: HTMLElement)
    {
        if (!element)
        {
            console.error(`FormInput(${element}) - element is null`);
            return;
        }

        this.element = element;
        this.id = this.element.id;

        //Error list
        this.errorList = document.getElementById(this.id + FormInput.errorListIdPostfix);
        if (!this.errorList)
        {
            this.element.insertAdjacentHTML("afterend", `<ul id="${this.id}${FormInput.errorListIdPostfix}" class="errorList"></ul>`);
            this.errorList = document.getElementById(this.id + FormInput.errorListIdPostfix);
        }
    }

    //--------------------------------------------------
    //----------EVENTS----------------------------------
    //--------------------------------------------------
    /**
     * Registers change events that trigger OnChange event
     * */
    abstract Initialize(): void


    //--------------------------------------------------
    //----------VALIDATION------------------------------
    //--------------------------------------------------

    /**
     * Returns true if the input is valid
     * */
    public IsValid(): boolean
    {
        return this.isValid;
    }

    /**
     * Validates current input. Returns true if input is valid, else false
     * */
    public Validate(): boolean
    {
        //Validate & error messages
        let errorMessages: string[] = [];
        for (let i = 0; i < this.validations.length; i++)
        {
            let isValid = this.validations[i].Validate();
            if (!isValid)
                errorMessages.push(this.validations[i].ErrorMessage());
        }
        this.SetErrorList(errorMessages);

        //Set class
        if (errorMessages.length == 0)
        {
            this.Element().classList.add(FormInput.validInputClass);
            this.Element().classList.remove(FormInput.invalidInputClass);
        }
        else
        {
            this.Element().classList.remove(FormInput.validInputClass);
            this.Element().classList.add(FormInput.invalidInputClass);
        }

        //Return
        this.isValid = errorMessages.length == 0;
        return this.isValid;
    }

    /**
     * Adds new validation rule
     * */
    public AddValidation(validation: FormInputValidation): void
    {
        this.validations.push(validation);
    }

    //--------------------------------------------------
    //----------ERROR LIST------------------------------
    //--------------------------------------------------
    /**
     * Sets the error list by string array
     * @param errorMessages
     */
    SetErrorList(errorMessages: string[]): void
    {
        let res = "";
        for (let i = 0; i < errorMessages.length; i++)
            if (errorMessages[i] != "")
                res += `<li>${errorMessages[i]}</li>`;

        this.errorList.innerHTML = res;
    }

    /**
     * Clears the error list
     * */
    EmptyErrorList()
    {
        this.errorList.innerHTML = "";
    }

    //--------------------------------------------------
    //----------ELEMENT---------------------------------
    //--------------------------------------------------
    /**
     * Returns inputs ID
     * */
    Id(): string
    {
        return this.id;
    }

    /**
     * Returns input element
     * */
    Element(): HTMLElement
    {
        return this.element;
    }

    /**
     * Returns input value
     * */
    abstract Value(): any;

    /**
     * Resets the input
     * */
    Reset(): void
    {
        for (let i = 0; i < this.validations.length; i++)
            this.validations[i].Reset();
        this.EmptyErrorList();
        this.Element().classList.remove(FormInput.validInputClass);
        this.Element().classList.remove(FormInput.invalidInputClass);
    }
}