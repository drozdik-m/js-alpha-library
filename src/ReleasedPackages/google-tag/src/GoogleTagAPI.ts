import { Pipeline } from "@drozdik.m/pipeline";


export class GoogleTagAPI
{
    public static Load(trackingId: string): Pipeline
    {
        //Return new pipeline
        return new Pipeline(function (resolver)
        {
            //Append the script 
            //<script async src="https://www.googletagmanager.com/gtag/js?id=G-597EYKW04M"></script>
            const body = document.getElementsByTagName("body").item(0);
            const script = document.createElement("script");
            script.setAttribute("type", 'text/javascript');
            script.setAttribute("src", `https://www.googletagmanager.com/gtag/js?id=${trackingId}`);
            script.setAttribute("async", "async");
            body.appendChild(script);

            //Resolve synchronously (ga queue)
            resolver();
        });
    }
}