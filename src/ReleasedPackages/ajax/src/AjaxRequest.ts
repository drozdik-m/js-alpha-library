import { HTTPMethod } from "./HTTPMethod";
import { AjaxParameter } from "./AjaxParameter";
import { AjaxResponseArgs } from "../args/AjaxResponseArgs";
import { AjaxResponse } from "./Ajax";


/**
 * Class representing one ajax request
 * */
export class AjaxRequest
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    private method: HTTPMethod;
    private url: string;
    private parameters: AjaxParameter[];

    private body: any;

    private successCallback: IAjaxCallback;
    private errorCallback: IAjaxCallback;

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    /**
     * New ajax request information container.
     * @param method Used HTTP method
     * @param url Target url
     */
    constructor(method: HTTPMethod, url: string, parameters: AjaxParameter[] = [], body: any = null,
        successCallback: IAjaxCallback = null, errorCallback: IAjaxCallback = null)
    {
        this.method = method;
        this.url = url;
        this.parameters = parameters;
        this.body = body;
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
    }

    //--------------------------------------------------
    //----------XMLHttpRequest--------------------------
    //--------------------------------------------------
    /**
     * Returns set up (but not triggered) XMLHttpRequest object
     * */
    GetXMLHttpRequest(): XMLHttpRequest
    {
        //Create the request
        let res = new XMLHttpRequest();

        //Set the request parameters
        res.open(this.method, this.GetFullUrl(), true);

        //Return the setup request
        return res;
    }

    /**
     * Returns request body
     * */
    GetBody(): any
    {
        return this.body;
    }

    /**
     * Tells if this request has body
     * */
    HasBody(): boolean
    {
        return this.body != null;
    }

    /**
     * Returns full URL with parameters
     * */
    GetFullUrl(): string
    {
        let res = this.url;

        /*if (this.parameters.length > 0)
            if (res.length <= 0 || res[res.length - 1] != "/")
                res += "/";*/
        if (this.parameters.length > 0 && res.length <= 0)
            res += "/";

        if (this.parameters.length > 0)
            res += "?";

        for (let i = 0; i < this.parameters.length; i++)
        {
            res += this.parameters[i].Name() + "=" + this.parameters[i].Value();
            if (i <= this.parameters.length - 2)
                res += "&";
        }

        return res;
    }

    /**
     * Invokes error callback
     * */
    InvokeErrorCallback(response: AjaxResponse)
    {
        if (this.errorCallback)
            this.errorCallback(response);
    }

    /**
     * Invokes success callback
     * */
    InvokeSuccessCallback(response: AjaxResponse)
    {
        if (this.successCallback)
            this.successCallback(response);
    }
}



interface IAjaxCallback
{
    (response: AjaxResponse): void;
}