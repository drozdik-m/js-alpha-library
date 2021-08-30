import { FormInput } from "../inputs/FormInput";
import { Map } from "@drozdik.m/map";
import { Event } from "@drozdik.m/event";
import { FormArgs } from "../args/FormArgs";



export class Form
{
    //--------------------------------------------------
    //----------PROPERTIES------------------------------
    //--------------------------------------------------
    //Form
    protected id: string = "";
    protected formElement: HTMLElement = null;

    //Inputs
    protected inputElements = new Map<string, FormInput>();

    //Validation
    private isValid: boolean = false;

    //Events
    public OnSubmit = new Event<Form, FormArgs>();
    public OnValidSubmit = new Event<Form, FormArgs>();
    public OnInvalidSubmit = new Event<Form, FormArgs>();

    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    /**
     * Form object handling submit and validation
     * @param id Id of target form
     */
    constructor(id: string)
    {
        this.id = id;
        this.formElement = document.getElementById(this.id);
        if (!this.formElement)
        {
            console.error("Form(#" + this.id + ") - element not found");
            return;
        }

        this.CatchSubmit();
    }

    //--------------------------------------------------
    //----------INPUTS----------------------------------
    //--------------------------------------------------
    /**
     * Adds and initializes new input
     * @param input
     */
    AddInput(input: FormInput)
    {
        let object = this;

        input.Initialize();
        input.OnChange.Add(function ()
        {
            object.HandleInputChange(input);
        });

        this.inputElements.InsertValue(input.Id(), input);
    }

    /**
     * Handles input change
     * @param input Changed input
     */
    private HandleInputChange(input: FormInput)
    {
        input.Validate();
    }

    //--------------------------------------------------
    //----------VALIDATION------------------------------
    //--------------------------------------------------
    /**
     * Validates an element by given ID
     * @param elementId
     */
    ValidateElement(elementId: string)
    {
        this.ValidateInput(this.inputElements.FindValue(elementId).PairValue());
    }

    /**
     * Validates the input
     * @param input Input
     */
    ValidateInput(input: FormInput)
    {
        input.Validate();
    }

    /**
     * Validates all inputs. Returns true if all inputs are valid, else false.
     * */
    Validate(): boolean
    {
        let formValid = true;
        for (let it = this.inputElements.First(); it.HasValue(); it.Next())
        {
            let isValid = it.PairValue().Validate();
            if (!isValid)
                formValid = false;
        }

        this.isValid = formValid;
        return this.isValid;
    }

    /**
     * Returns true if the form is valid
     * */
    IsValid(): boolean
    {
        return this.isValid;
    }

    //--------------------------------------------------
    //----------SUBMIT----------------------------------
    //--------------------------------------------------
    /**
     * Submit catcher
     * */
    private CatchSubmit()
    {
        let object = this;
        let submitButtons = this.formElement.querySelectorAll("[type='submit']");
        for (let i = 0; i < submitButtons.length; i++)
        {
            submitButtons[i].addEventListener("click", function (e)
            {
                e.preventDefault ? e.preventDefault() : (e.returnValue = false);
                object.HandleSubmit();
            })
        }
    }

    /**
     * Submit handler
     * */
    private HandleSubmit()
    {
        let isValid = this.Validate();
        if (isValid)
            this.OnValidSubmit.Invoke(this, new FormArgs());
        else
            this.OnInvalidSubmit.Invoke(this, new FormArgs());
        this.OnSubmit.Invoke(this, new FormArgs());
    }

    /**
     * Submits the form as usual
     * */
    Submit(): void
    {
        (this.formElement as any).submit();
    }

    //--------------------------------------------------
    //----------RESET-----------------------------------
    //--------------------------------------------------
    /**
     * Resets the form (values and validation)
     * */
    Reset(): void
    {
        for (let it = this.inputElements.First(); it.HasValue(); it.Next())
            it.PairValue().Reset();
    }
}