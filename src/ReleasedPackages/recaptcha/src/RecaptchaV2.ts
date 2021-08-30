import { Event } from "@drozdik.m/event";
import { RecaptchaV2Args } from "../args/RecaptchaV2Args";
import { RecaptchaAPI } from "./RecaptchaAPI";

declare class grecaptcha
{
    static reset(widgetId: string): void;
    static render(id: string, properties: Object): string;
    static getResponse(widgetId: string): string;
}

//--------------------------------------------------
//----------CAPTCHA---------------------------------
//--------------------------------------------------
export class RecaptchaV2
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    private id: string = "";
    private siteKey: string = "";
    OnValidate: Event<RecaptchaV2, RecaptchaV2Args> = new Event<RecaptchaV2, RecaptchaV2Args>();
    OnUnvalidate: Event<RecaptchaV2, RecaptchaV2Args> = new Event<RecaptchaV2, RecaptchaV2Args>();
    OnStateChange: Event<RecaptchaV2, RecaptchaV2Args> = new Event<RecaptchaV2, RecaptchaV2Args>();
    private validated: boolean = false;
    private widgetId: string;

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    /**
     * Creates recaptcha object 
     * @param id Id of target
     * @param siteKey Site key of the recaptcha
     */
    constructor(id: string, siteKey: string)
    {
        this.id = id;
        this.siteKey = siteKey;

        let captcha = document.getElementById(id);

        //No captcha with that ID
        if (!captcha)
        {
            console.error(`Captcha(#${id}, ${siteKey}, ...) - Captcha with that id not found`);
            return;
        }

        //Init recaptcha
        let object = this;
        RecaptchaAPI.Load().Then(function ()
        {
            object.InitCaptcha();
        });
    }

    /**
     * Initiates Captcha using grecaptcha
     * */
    private InitCaptcha()
    {
        //Check grecaptcha
        if (typeof grecaptcha == "undefined")
        {
            console.error(`Object "grecaptcha" is not defined`);
            return;
        }

        //Create new captcha
        let object = this;
        this.widgetId = grecaptcha.render(object.id, {
            "sitekey": object.siteKey,
            "callback": function ()
            {
                object.validated = true;
                object.OnValidate.Invoke(this, new RecaptchaV2Args(object.id, object.siteKey, true));
                object.OnStateChange.Invoke(this, new RecaptchaV2Args(object.id, object.siteKey, true));
            },
            "expired-callback": function ()
            {
                object.validated = false;
                object.OnUnvalidate.Invoke(this, new RecaptchaV2Args(object.id, object.siteKey, false));
                object.OnStateChange.Invoke(this, new RecaptchaV2Args(object.id, object.siteKey, true));
            }
        });
    }

    /**
     * Returns the recaptcha response (send in form posts)
     * */
    public GetResponse(): string
    {
        return grecaptcha.getResponse(this.widgetId);
    }

    /**
     * Returns true if the captcha is validated, else false
     * */
    public Validated(): boolean
    {
        return this.validated;
    }

    public Reset(): void
    {
        grecaptcha.reset(this.widgetId);
        if (this.validated)
        {
            this.validated = false;
            this.OnUnvalidate.Invoke(this, new RecaptchaV2Args(this.id, this.siteKey, false));
            this.OnStateChange.Invoke(this, new RecaptchaV2Args(this.id, this.siteKey, true));
        }
    }
}