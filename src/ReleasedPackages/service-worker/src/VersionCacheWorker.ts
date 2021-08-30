import { FetchHelper } from "./Libs/FetchHelper";
import { CacheHelper } from "./Libs/CacheHelper";
import { File, FileType } from "./Libs/WorkerFile";
import { StaticAssets } from "./Libs/StaticAssets";
import { HandleSuccessfulServerResponse, HandleUnsuccessfulServerResponse } from "./Handlers/CommonServerHandlers";
import { HandleResponseAsOfflineCacheWorker } from "./Handlers/HandleResponseAsOfflineCacheWorker";

//--------------------------------------------------
//---------INSTALL----------------------------------
//--------------------------------------------------
import { InstallSection } from "./Fragments/Install";
InstallSection.Render();


//--------------------------------------------------
//---------ACTIVATE---------------------------------
//--------------------------------------------------
import { ActivateSection } from "./Fragments/Activate";
import { Settings } from "./Libs/Settings";
ActivateSection.Render()

//--------------------------------------------------
//---------FETCH------------------------------------
//--------------------------------------------------
self.addEventListener("fetch", function (fetchRequest: FetchEvent)
{
    //DEBUG
    if (Settings.debug)
        console.log("Service worker - FETCH");


    //SKIP ALL METHODS EXCEPT "GET"
    if (fetchRequest.request.method.toUpperCase() != "GET")
    {
        if (Settings.debug)
            console.log("Service worker - non GET");
        FetchHelper.RespondWithServer(fetchRequest);
        return;
    }

    //GET VERSION
    let versionMatch = fetchRequest.request.url.match(/version=([^&\s]*)/);
    /*
     /?version=2.5.4
     /?version=2.5.4&some=1.0.0
     some/sdf/fff?version=1.0.0
     some/sdf/fff?version=1.0.0&some=1.0.0
     some/sdf/fff?some=1.0.0&version=1.0.0
    */


    //THE TARGET IS NOT VERSIONED
    if (!versionMatch)
    {
        if (Settings.debug)
            console.log("Service worker: not versioned GET " + fetchRequest.request.url);
        HandleResponseAsOfflineCacheWorker(fetchRequest);
        return;
    }

    //TARGET IS VERSIONED
    if (Settings.debug)
        console.log("Service worker: versioned GET " + fetchRequest.request.url);
    fetchRequest.respondWith(
        caches.open(CacheHelper.mainCacheName).then(function (cache: Cache)
        {
            return cache.match(fetchRequest.request);
        }).then(function (response: Response)
        {
            if (typeof response != "undefined")
            {
                if (Settings.debug)
                    console.log("Service worker: fish versioned GET from cache " + fetchRequest.request.url);
                return response
            }
            else
                return fetch(fetchRequest.request)
                    .then(function (fetchResponse: Response)
                    {
                        if (Settings.debug)
                            console.log("Service worker: load versioned GET from server " + fetchRequest.request.url);
                        return HandleSuccessfulServerResponse(fetchRequest.request, fetchResponse);
                    })
                    .catch(function (fetchResponse: Response)
                    {
                        return HandleUnsuccessfulServerResponse(fetchRequest.request, fetchResponse);
                    });
        }) as unknown as Response
    );

    //TARGET IS VERSIONED
    /*fetchRequest.respondWith(
        let mainCache = await caches.open(CacheHelper.mainCacheName);
        let cacheRes = await mainCache.match(fetchRequest.request);
        if (cacheRes)
            return cacheRes;
        return fetch(fetchRequest.request)
            .then(function (fetchResponse: Response)
            {
                return HandleSuccessfulServerResponse(fetchRequest.request, fetchResponse);
            })
            .catch(function (fetchResponse: Response)
            {
                return HandleUnsuccessfulServerResponse(fetchRequest.request, fetchResponse);
            });
    );*/
});


