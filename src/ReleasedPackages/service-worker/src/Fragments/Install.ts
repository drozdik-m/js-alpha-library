import { CacheHelper } from "../Libs/CacheHelper";
import { StaticAssets } from "../Libs/StaticAssets";
import { Settings } from "../Libs/Settings";


export class InstallSection
{
    static Render()
    {
        //--------------------------------------------------
        //---------INSTALL----------------------------------
        //--------------------------------------------------
        self.addEventListener("install", function (installEvent: InstallEvent)
        {
            //DEBUG
            if (Settings.debug)
                console.log("Service worker - INSTALL");

            //ADD "precacheItems" TO THE MAIN CACHE
            installEvent.waitUntil(
                caches
                    .open(CacheHelper.mainCacheName)
                    .then(function (cache: Cache)
                    {
                        return cache
                            .addAll(StaticAssets.GetPrecacheURIs())
                            .catch(function (error: TypeError)
                            {
                                console.error("Service worker: error when fetching precached files:");
                                console.error(error);
                            });
                    })
            );
        });
    }
}

