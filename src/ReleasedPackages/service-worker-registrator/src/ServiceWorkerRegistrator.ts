
export class ServiceWorkerRegistrator
{
    private path: string;

    /**
     * @param path Path to the service worker script. Must be in the root directory. 
     */
    constructor(path: string)
    {
        this.path = path;
    }


    /**
     * Tells if service worker is supported
     * */
    IsSupported(): boolean
    {
        return "serviceWorker" in navigator;
    }

    /**
     * Checks if the service worker is supported in this browser and if so, registers the service worker
     * */
    Register(): void
    {
        if (this.IsSupported())
        {
            let object = this;
            window.addEventListener('load', function ()
            {
                navigator.serviceWorker.register(object.path);
            });
        }
    }
}