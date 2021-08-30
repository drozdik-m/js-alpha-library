


export class RecaptchaV2Args
{
    private id: string;
    private sitekey: string;
    private validated: boolean;

    /**
     * Recaptcha arguments
     * @param id Captchas ID
     * @param sitekey Captchas sitekey
     */
    constructor(id: string, sitekey: string, validated: boolean)
    {
        this.id = id;
        this.sitekey = sitekey;
        this.validated = validated;
    }

    /**
     * Returns captchas ID
     * */
    Id(): string
    {
        return this.id;
    }

    /**
     * Returns captchas sitekey
     * */
    Sitekey(): string
    {
        return this.sitekey;
    }

    /**
     * Returns true if the captcha is validated, else false
     * */
    Validated(): boolean
    {
        return this.validated;
    }
}
