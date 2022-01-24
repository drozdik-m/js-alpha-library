import { GoogleTagAPI } from "./GoogleTagAPI";
import { StorageType } from "./StorageType";
import { Pipeline } from "@drozdik.m/pipeline";

declare let window: {
    localStorage: any;
    dataLayer: any
}
declare let dataLayer: any

function gtag(...args: any) { dataLayer.push(arguments); }

export { StorageType };

export class GoogleTagWebStream
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    private measurementId: string;
    private storageType: StorageType;
    private anonymizeIp: boolean;

    private initialized = false;

    //private static GA_LOCAL_STORAGE_KEY = 'ga:clientId';

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
        window.dataLayer = window.dataLayer || [];
        gtag("js", new Date());

        //Init Google Analytics API
        const object = this;
        return GoogleTagAPI.Load(this.measurementId).Then(function ()
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
            gtag("config", this.measurementId, { "anonymize_ip": true });

        if (this.storageType === StorageType.None)
        {
            this.InitializeNoStorage();
        }
        else if (this.storageType === StorageType.Cookie)
        {
            this.InitializeCookies();
        }

        this.initialized = true;
    }

    private InitializeCookies()
    {
        gtag("config", this.measurementId);
    }

    private InitializeNoStorage()
    {
        gtag("config", this.measurementId, {
            "storage": "none"
        });
    }
}