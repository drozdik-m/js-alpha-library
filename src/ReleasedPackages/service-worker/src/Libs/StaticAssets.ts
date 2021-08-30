

export class StaticAssets
{
    //DEFAULT IMAGE PATH
    static defaultNotFoundImage = "/ServiceWorker/Images/DefaultImage.jpg";

    //"YOU ARE OFFLINE" PAGE PATH
    static defaultOfflinePage: string = "/error/offline"
    static defaultOfflinePageResources: string[] = [];

    //MANIFEST
    static manifestPath = "Manifest/Manifest.json";

    

    /**
     * Returns array of elements to cache right away
     * */
    static GetPrecacheURIs(): string[]
    {
        return [
            StaticAssets.defaultNotFoundImage,
            StaticAssets.manifestPath,
            StaticAssets.defaultOfflinePage,
        ].concat(StaticAssets.defaultOfflinePageResources)
    }
}