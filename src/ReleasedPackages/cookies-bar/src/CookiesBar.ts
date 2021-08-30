import { CookiesController } from "@drozdik.m/cookies-controller";

export class CookiesBar
{
    //--------------------------------------------------
    //---------VARIABLES--------------------------------
    //--------------------------------------------------
    private confirmed: boolean = false;
    private cookiesController: CookiesController = null;
    private barElement: HTMLElement = null;
    private cookiesBarButton: HTMLElement = null;

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    /**
     * Creates new instance of the cookies bar
     * @param bar Target bar element
     * @param cookiesController Used cookies controller
     */
    constructor(barElement: HTMLElement, cookiesController: CookiesController)
    {
        this.cookiesController = cookiesController;
        this.barElement = barElement;

        //COOKIES ALLOWED - NOT NEEDED
        if (cookiesController.AllowedToUse())
        {
            this.Hide();
            return;
        }

        //BAR EXISTANCE
        if (!this.barElement)
        {
            console.error(`CookiesBar(...) - bar not found`);
            return;
        }

        //Show the bar
        this.Show();

        //BUTTON CLICK
        this.cookiesBarButton = this.barElement.getElementsByClassName("cookiesBarButton").item(0) as HTMLElement;
        if (!this.cookiesBarButton)
        {
            console.error(`CookiesBar(...) - child element .cookiesBarButton not found`);
            return;
        }
        let object = this;
        this.cookiesBarButton.addEventListener("click", function ()
        {
            object.ConfirmButtonClick();
        });
    }

    //--------------------------------------------------
    //---------METHODS----------------------------------
    //--------------------------------------------------
    /**
    * Hide the bar (no animation)
    */
    Hide()
    {
        if (this.barElement)
            this.barElement.parentNode.removeChild(this.barElement);
    }

    /**
    * Show the bar (animation)
    */
    Show()
    {
        this.barElement.style.opacity = "1";
    }
    /**
    * Confirmed terms and conditions (hide animation)
    */
    private ConfirmButtonClick()
    {
        //Protect double clicks
        if (this.confirmed)
            return;
        this.confirmed = true;

        //Animation
        let object = this;
        let cookiesBarHeight = this.barElement.offsetHeight;
        this.barElement.style.bottom = -cookiesBarHeight + "px";
        setTimeout(function ()
        {
            object.Hide();
        }, 250);

        //Permit
        this.cookiesController.Permit();
    }
}


