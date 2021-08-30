import { Queue } from "@drozdik.m/queue";
import { AjaxRequest } from "./AjaxRequest";
import { Event } from "@drozdik.m/event";
import { Pipeline } from "@drozdik.m/pipeline";
import { AjaxProgressArgs } from "../args/AjaxProgressArgs";
import { AjaxParameter } from "./AjaxParameter";
import { HTTPMethod } from "./HTTPMethod";
import { AjaxError } from "../errors/AjaxError";
import { AjaxResponse } from "./AjaxResponse";
import { AjaxResponseArgs } from "../args/AjaxResponseArgs";
import { AjaxSendArgs } from "../args/AjaxSendArgs";
import { AjaxSendProgressArgs } from "../args/AjaxSendProgressArgs";

export { AjaxParameter, AjaxResponse, AjaxProgressArgs, AjaxResponseArgs };

export class Ajax
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    private requestsQueue = new Queue<AjaxRequest>();
    private requestInProgress = false;

    //EVENTS
    OnSuccess: Event<Ajax, AjaxResponseArgs> = new Event<Ajax, AjaxResponseArgs>();
    OnError: Event<Ajax, AjaxResponseArgs> = new Event<Ajax, AjaxResponseArgs>();
    OnFinish: Event<Ajax, AjaxResponseArgs> = new Event<Ajax, AjaxResponseArgs>();
    OnProgress: Event<Ajax, AjaxProgressArgs> = new Event<Ajax, AjaxProgressArgs>();

    OnSendSuccess: Event<Ajax, AjaxSendArgs> = new Event<Ajax, AjaxSendArgs>();
    OnSendError: Event<Ajax, AjaxSendArgs> = new Event<Ajax, AjaxSendArgs>();
    OnSendFinish: Event<Ajax, AjaxSendArgs> = new Event<Ajax, AjaxSendArgs>();
    OnSendProgress: Event<Ajax, AjaxProgressArgs> = new Event<Ajax, AjaxProgressArgs>();

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    constructor()
    {

    }

    //--------------------------------------------------
    //---------QUEUE------------------------------------
    //--------------------------------------------------
    /**
     * Checks if there are some requests in the queue and runs the request
     * */
    private UpdateRequestQueue()
    {
        //The queue is empty
        if (this.requestsQueue.IsEmpty() || this.requestInProgress)
            return;

        //Set flag
        this.requestInProgress = true;

        //Create and initiate request
        let ajaxRequest = this.requestsQueue.Dequeue();
        let request = ajaxRequest.GetXMLHttpRequest();
        let object = this;

        //On load
        request.upload.onload = function ()
        {
            object.LoadSuccess(ajaxRequest);
        };
        request.onload = function ()
        {
            let response = new AjaxResponse(request.status, request.statusText, request.responseText);
            if (response.IsError())
                object.ResponseError(ajaxRequest, response);
            else
                object.ResponseSuccess(ajaxRequest, response);
        };

        //On error
        request.upload.onerror = function ()
        {
            object.LoadError(ajaxRequest);
        };
        request.onerror = function ()
        {
            object.ResponseError(ajaxRequest, new AjaxResponse(-1, "Non-HTTP(s) error", ""));
        };

        //On progress
        request.upload.onprogress = function (event: ProgressEvent)
        {
            let args = new AjaxProgressArgs(event.lengthComputable, event.loaded,
                event.lengthComputable ? event.total : -1);
            object.OnSendProgressRequest(args);
        };
        request.onprogress = function (event: ProgressEvent)
        {
            let args = new AjaxProgressArgs(event.lengthComputable, event.loaded,
                event.lengthComputable ? event.total : -1);
            object.OnProgressRequest(args);
        };

        //FIRE
        if (ajaxRequest.HasBody())
            request.send(ajaxRequest.GetBody());
        else
            request.send();
    }

    /**
     * Enqueues new request and runs the queue
     * @param request New request
     */
    private EnqueueRequest(request: AjaxRequest)
    {
        this.requestsQueue.Enqueue(request);
        this.UpdateRequestQueue();
    }

    //--------------------------------------------------
    //---------CALLBACKS--------------------------------
    //--------------------------------------------------
    /**
     * Called on load success
     * @param request Arguments
     */
    private LoadSuccess(request: AjaxRequest)
    {
        this.OnSendSuccess.Invoke(this, new AjaxSendArgs());
        this.OnSendFinish.Invoke(this, new AjaxSendArgs());
    }

    /**
     * Called on load error
     * @param request Arguments
     */
    private LoadError(request: AjaxRequest)
    {
        this.OnSendError.Invoke(this, new AjaxSendArgs());
        this.OnSendFinish.Invoke(this, new AjaxSendArgs());
    }

    /**
     * Called on load progress
     * @param args Arguments
     */
    private OnSendProgressRequest(args: AjaxProgressArgs)
    {
        this.OnSendProgress.Invoke(this, args);
    }

    /**
     * Called on response success
     * @param response Arguments
     */
    private ResponseSuccess(request: AjaxRequest, response: AjaxResponse)
    {
        //Call callbacks
        request.InvokeSuccessCallback(response);

        //Call the events
        this.OnSuccess.Invoke(this, new AjaxResponseArgs(response));
        this.OnFinish.Invoke(this, new AjaxResponseArgs(response));

        //Continue the queue
        this.requestInProgress = false;
        this.UpdateRequestQueue();
    }

    /**
     * Called on response error (http and non-http)
     * @param response Arguments
     */
    private ResponseError(request: AjaxRequest, response: AjaxResponse)
    {
        //Call callbacks
        request.InvokeErrorCallback(response);

        //Call the events
        this.OnError.Invoke(this, new AjaxResponseArgs(response));
        this.OnFinish.Invoke(this, new AjaxResponseArgs(response));

        //Continue the queue
        this.requestInProgress = false;
        this.UpdateRequestQueue();
    }

    /**
     * Called on response update
     * @param args Arguments
     */
    private OnProgressRequest(args: AjaxProgressArgs)
    {
        //Call the events
        this.OnProgress.Invoke(this, args);
    }

    //--------------------------------------------------
    //---------METHODS----------------------------------
    //--------------------------------------------------
    /**
     * Enqueues HTTP GET request
     * @param url Target URL
     * @param parameters Target parameters
     */
    Get(url: string, parameters: AjaxParameter[] = [], body: any = null): Pipeline
    {
        let object = this;
        return new Pipeline(function (resolver, rejector)
        {
            object.EnqueueRequest(new AjaxRequest(HTTPMethod.GET, url, parameters, body,
                function (response: AjaxResponse)
                {
                    //Success
                    resolver(response);
    
                }, function (response: AjaxResponse)
                {
                    //Error
                    rejector(new AjaxError(response.Status(), response.StatusText()));
                }));

        });
    }

    /**
     * Enqueues HTTP POST request
     * @param url Target URL
     * @param parameters Target parameters
     */
    Post(url: string, parameters: AjaxParameter[] = [], body: any = null): Pipeline
    {
        let object = this;
        return new Pipeline(function (resolver, rejector)
        {
            object.EnqueueRequest(new AjaxRequest(HTTPMethod.POST, url, parameters, body,
                function (response: AjaxResponse)
                {
                    //Success
                    resolver(response);

                }, function (response: AjaxResponse)
                {
                    //Error
                    rejector(new AjaxError(response.Status(), response.StatusText()));
                }));

        });
    }
}