import { Pipeline } from "@drozdik.m/pipeline";

export class RecaptchaAPI
{
    private static LoadingPipeline: Pipeline = null;

    public static Load(): Pipeline
    {
        //Return existing pipeline
        if (RecaptchaAPI.LoadingPipeline != null)
            return RecaptchaAPI.LoadingPipeline;

        //Return new pipeline
        return RecaptchaAPI.LoadingPipeline = new Pipeline(function (resolver, rejector)
        {
            //Create callback function
            (window as any).RecaptchaAPILoadCallback = function ()
            {
                resolver();
            }

            //Append the script 
            //<script src="https://www.google.com/recaptcha/api.js?onload=CaptchaCallback&render=explicit" async defer></script>
            const body = document.getElementsByTagName("body").item(0);
            const script = document.createElement("script");
            script.setAttribute("type", 'text/javascript');
            script.setAttribute("src", "https://www.google.com/recaptcha/api.js?onload=RecaptchaAPILoadCallback&render=explicit");
            script.setAttribute("async", "async");
            script.setAttribute("defer", "defer");
            body.appendChild(script);
        });
    }



}