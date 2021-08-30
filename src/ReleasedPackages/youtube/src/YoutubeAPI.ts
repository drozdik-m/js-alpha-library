import { Pipeline } from "@drozdik.m/pipeline";

export class YoutubeAPI
{
    private static LoadingPipeline: Pipeline = null;

    public static Load(): Pipeline
    {
        //Return existing pipeline
        if (YoutubeAPI.LoadingPipeline != null)
            return YoutubeAPI.LoadingPipeline;

        //Return new pipeline
        return YoutubeAPI.LoadingPipeline = new Pipeline(function (resolver, rejector)
        {
            //Create callback function
            (window as any).onYouTubePlayerAPIReady = function ()
            {
                resolver();
            }

            //Append the script 
            //<script src="https://www.youtube.com/iframe_api" async defer></script>
            let body = document.getElementsByTagName("body").item(0);
            let script = document.createElement("script");
            script.setAttribute("type", 'text/javascript');
            script.setAttribute("src", "https://www.youtube.com/iframe_api");
            script.setAttribute("async", "async");
            script.setAttribute("defer", "defer");
            body.appendChild(script);
        });
    }



}