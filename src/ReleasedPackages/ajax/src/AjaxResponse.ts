
export class AjaxResponse
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    private status: number;
    private statusText: string;
    private response: string;

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    /**
     * Ajax response arguments
     * @param status Status number (200, 404, ...)
     * @param statusText Status text
     * @param response Response text (raw server response)
     */
    constructor(status: number, statusText: string, response: string)
    {
        this.status = status;
        this.statusText = statusText;
        this.response = response;
    }

    //--------------------------------------------------
    //----------STATUS----------------------------------
    //--------------------------------------------------
    /**
     * Returns true if response is an error response, else false
     * */
    IsError(): boolean
    {
        //Client error
        if (this.status >= 400 && this.status < 500)
            return true;

        //Server error
        else if (this.status >= 500 && this.status < 600)
            return true;

        //No error
        return false;
    }

    /**
     * Returns status text
     * */
    StatusText(): string
    {
        return this.statusText;
    }

    /**
     * Returns status number
     * */
    Status(): number
    {
        return this.status;
    }

    //--------------------------------------------------
    //----------RESPONSE--------------------------------
    //--------------------------------------------------
    /**
     * Returns server response (raw string)
     * */
    Response(): string
    {
        return this.response;
    }
}