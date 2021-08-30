import { Pipeline } from "@drozdik.m/pipeline";


export class GoogleAnalyticsAPI
{
    private static LoadingPipeline: Pipeline = null;

    public static Load(): Pipeline
    {
        //Return existing pipeline
        if (GoogleAnalyticsAPI.LoadingPipeline !== null)
            return GoogleAnalyticsAPI.LoadingPipeline;

        //Return new pipeline
        return GoogleAnalyticsAPI.LoadingPipeline = new Pipeline(function (resolver)
        {
            //Append the script 
            //<script async src='https://www.google-analytics.com/analytics.js'></script>
            const body = document.getElementsByTagName("body").item(0);
            const script = document.createElement("script");
            script.setAttribute("type", 'text/javascript');
            script.setAttribute("src", "https://www.google-analytics.com/analytics.js");
            script.setAttribute("async", "async");
            body.appendChild(script);

            //Resolve synchronously (ga queue)
            resolver();
        });
    }
}