import { Cookie } from "@drozdik.m/cookie";
import { Event } from "@drozdik.m/event";
import { CookiesPermissionChangeArgs } from "../args/CookiesPermissionChangeArgs";

export { CookiesPermissionChangeArgs };

export class CookiesController
{
    //--------------------------------------------------
    //----------PROPERTIES------------------------------
    //--------------------------------------------------
    //List of cookies
    private cookiesList: Cookie[] = [];

    //Cookies permission
    private permissionCookie: Cookie = new Cookie("TermsAndConditions");
    private permission = false;

    //Callbacks
    OnPermit: Event<CookiesController, CookiesPermissionChangeArgs> = new Event<CookiesController, CookiesPermissionChangeArgs>();
    OnForbid: Event<CookiesController, CookiesPermissionChangeArgs> = new Event<CookiesController, CookiesPermissionChangeArgs>();

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    constructor()
    {
        //If the cookie does not exist, set it to false
        //if (!this.permissionCookie.Exists())
        //    this.permissionCookie.Set("false");

        //If cookie is true, permit
        if (this.permissionCookie.Get() === "true")
            this.Permit();
        else
            this.Forbid();
    }


    //--------------------------------------------------
    //----------DELETE/ADD------------------------------
    //--------------------------------------------------
    /**
     * Adds a cookie to a container of the controller
     * @param cookie Cookie to add
     */
    Add(cookie: Cookie)
    {
        this.cookiesList.push(cookie);
    }

    /**
     * Removes all cookies from this controller. Does not change their values.
     * */
    RemoveAll()
    {
        this.cookiesList = [];
    }

    /**
    * Deletes all held cookies (their values).
    */
    DeleteAll()
    {
        //List all cookies and delete them
        for (let i = 0; i < this.cookiesList.length; i++)
            this.cookiesList[i].Delete();
    }

    //--------------------------------------------------
    //----------PERMISSION------------------------------
    //--------------------------------------------------
    /**
    * Forbid cookies
    */
    Forbid()
    {
        this.DeleteAll();
        //this.permissionCookie.Set("false");
        this.permissionCookie.Delete();
        this.permission = false;
        this.OnForbid.Invoke(this, new CookiesPermissionChangeArgs());
    }

    /**
    * Permit cookies
    */
    Permit()
    {
        this.permissionCookie.Set("true", 365);
        this.permission = true;
        this.OnPermit.Invoke(this, new CookiesPermissionChangeArgs());
    }

    /**
    * Returns if it is allowed to use cookies
    * @returns True if cookies are allowed
    */
    AllowedToUse(): boolean
    {
        return this.permission;
    }
}

