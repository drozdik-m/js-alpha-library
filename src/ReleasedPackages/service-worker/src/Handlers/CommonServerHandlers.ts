import { CacheHelper } from "../Libs/CacheHelper";
import { File, FileType } from "../Libs/WorkerFile";
import { StaticAssets } from "../Libs/StaticAssets";
import { Settings } from "../Libs/Settings";

/**
 * Handles successful response from the server, based on content and status number (200, 404, 500)
 * @param {Request} fetchRequest Original reguest for the result (request)
 * @param {Response} fetchResponse Fetch result (server response)
 * @returns Response
 */
export function HandleSuccessfulServerResponse(fetchRequest: Request, fetchResponse: Response): Response | Promise<Response>
{
    let fetchResponseClone = fetchResponse.clone();

    //RESPONSE CODE 2xx - SUCCESS
    if (fetchResponse.status.toString()[0] == "2")
    {
        if (Settings.debug)
            console.log("Service worker: Fetch success");

        //Add response to the cache
        caches.open(CacheHelper.mainCacheName).then(function (cache: Cache)
        {
            cache.put(fetchRequest, fetchResponseClone);
        });

        //Return fetch response
        return fetchResponse;
    }

    //RESPONSE CODE 4xx - CLIENT ERROR
    else if (fetchResponse.status.toString()[0] == "4")
    {
        //Warn about the error
        console.warn(`Sevice worker: error ${fetchResponse.status} while fetching ${fetchResponse.url}`);

        //OPEN CACHE
        return caches.open(CacheHelper.mainCacheName).then(function (cache: Cache)
        {
            //Match request in the cache
            return cache.match(fetchRequest).then(function (cacheResponse: Response)
            {
                //Cached content found
                if (typeof cacheResponse != "undefined")
                    return cacheResponse;

                //Cached content not found
                else
                {
                    //Get file type
                    let file = new File(fetchResponse.url)

                    //IMAGE - return default image
                    if (file.GetFileType() == FileType.IMAGE)
                        return cache.match(StaticAssets.defaultNotFoundImage);

                    //OTHER - pass the response
                    return fetchResponse;
                }
            });
        });

    }
    //RESPONSE CODE 5xx - SERVER ERROR
    else if (fetchResponse.status.toString()[0] == "5")
    {
        console.warn(`Sevice worker: error ${fetchResponse.status} while fetching ${fetchResponse.url}`);
        return fetchResponse;
    }
    //OPAQUE RESPONSE
    else if (fetchResponse.type == "opaque")
    {
        return fetchResponse;
    }
    //OTHER STATUSES
    else
    {
        console.warn(`Sevice worker: error ${fetchResponse.status} while fetching ${fetchResponse.url}`);
        return fetchResponse;
    }

}


/**
* Handles unsuccessful server response. Server is unreachable -> client or server is probably offline
* @param {Request} fetchRequest Original reguest for the result (request)
* @param {Response} fetchResponse Fetch result (server response)
*/
export function HandleUnsuccessfulServerResponse(fetchRequest: Request, fetchResponse: Response): Response | Promise<Response>
{
    //OPEN CACHE
    return caches.open(CacheHelper.mainCacheName).then(function (cache: Cache)
    {
        //SEARCH FOR REQUESTED ITEM
        return cache.match(fetchRequest).then(function (cacheResponse: Response)
        {
            //Item in cache found
            if (typeof cacheResponse != "undefined")
                return cacheResponse;

            //Item in cache not found - return "you are offline" page
            else
            {
                //Get file type
                let file = new File(fetchRequest.url)

                //IMAGE - return default image
                if (file.GetFileType() == FileType.IMAGE)
                    return cache.match(StaticAssets.defaultNotFoundImage);
                else if (file.GetFileType() == FileType.STYLE || file.GetFileType() == FileType.SCRIPT)
                    return new Response("");

                //OTHER - return default offline page
                return cache.match(StaticAssets.defaultOfflinePage);
            }
        });
    });
}


