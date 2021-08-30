import { GoogleAnalyticsAPI } from "./GoogleAnalyticsAPI";
import { StorageType } from "./StorageType";
import { Pipeline } from "@drozdik.m/pipeline";

declare let window: {
    ga: () => any;
    localStorage: any;
}
declare let ga: any

export { StorageType };

export class GoogleAnalytics
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    private measurementId: string;
    private storageType: StorageType;
    private anonymizeIp: boolean;

    private initialized = false;

    private static GA_LOCAL_STORAGE_KEY = 'ga:clientId';

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    constructor(measurementId: string, storageType: StorageType, anonymizeIp = true)
    {
        this.measurementId = measurementId;
        this.storageType = storageType;
        this.anonymizeIp = anonymizeIp;
    }

    //--------------------------------------------------
    //---------TRACKING---------------------------------
    //--------------------------------------------------
    /**
     * Starts the tracking
     * */
    StartTracking(): Pipeline
    {
        return this.EnsureInitialized();
    }

    //--------------------------------------------------
    //---------INITIALIZE-------------------------------
    //--------------------------------------------------
    protected EnsureInitialized(): Pipeline
    {
        if (this.initialized)
            return Pipeline.Resolve();

        //Init Google Analytics queue
        window.ga = window.ga || function () { (ga.q = ga.q || []).push(arguments) };
        ga.l =+new Date;

        //Init Google Analytics API
        const object = this;
        return GoogleAnalyticsAPI.Load().Then(function ()
        {
            object.Initialize();
        });
    }


    private Initialize()
    {
        if (this.initialized)
            return;

        //Anonymize ip
        if (this.anonymizeIp)
            ga("set", "anonymizeIp", true);

        if (this.storageType === StorageType.None)
        {
            this.InitializeNoStorage();
        }
        else if (this.storageType === StorageType.Local)
        {
            if (window.localStorage)
                this.InitializeLocalStorage();
            else
                this.InitializeNoStorage();
        }
        else if (this.storageType === StorageType.Cookie)
        {
            this.InitializeCookies();
        }
            
        ga('send', 'pageview');

        this.initialized = true;
    }

    private InitializeLocalStorage()
    {
        ga("create", this.measurementId, {
            "storage": "none",
            "clientId": localStorage.getItem(GoogleAnalytics.GA_LOCAL_STORAGE_KEY)
        });
        ga(function (tracker: any)
        {
            localStorage.setItem(GoogleAnalytics.GA_LOCAL_STORAGE_KEY, tracker.get('clientId'));
        });
    }

    private InitializeCookies()
    {
        ga("create", this.measurementId, "auto");
    }

    private InitializeNoStorage()
    {
        ga("create", this.measurementId, {
            "storage": "none"
        });
    }
}