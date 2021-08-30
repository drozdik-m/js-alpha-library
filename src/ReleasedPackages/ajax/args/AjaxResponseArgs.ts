import { AjaxResponse } from "../src/Ajax";


export class AjaxResponseArgs
{
    private response: AjaxResponse

    /**
     * Ajax response args
     * @param response Response
     */
    constructor(response: AjaxResponse)
    {
        this.response = response;
    }

    /**
     * Stored ajax response
     * */
    Response(): AjaxResponse
    {
        return this.response;
    }
}