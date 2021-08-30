
export class LoadingAnimation
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    private static loadingAnimationElement: HTMLElement = null;
    private static animationTimeout: number = -1;
    private static opened: boolean = false;

    private targetElement: HTMLElement
    private loadingAnimationElement: HTMLElement = null;
    private animationTimeout: number = -1;
    private opened: boolean = false;

    //--------------------------------------------------
    //---------LOCAL SHOW/HIDE--------------------------
    //--------------------------------------------------
    /**
     * Creates loading animation inside a target
     * @param targetElement
     */
    constructor(targetElement: HTMLElement)
    {
        this.targetElement = targetElement;

        let position = targetElement.style.position;
        if (position != "relative" && position != "fixed" && position != "absolute")
            targetElement.style.position = "relative";
    }

    /**
     * Shows the loading animation
     * */
    public Show()
    {
        if (this.opened)
            return;

        //Append new loading animation
        if (!this.loadingAnimationElement)
        {
            this.targetElement.insertAdjacentHTML("beforeend", LoadingAnimation.GenerateAnimationHTML());
            this.loadingAnimationElement = this.targetElement.querySelector(".loadingScreen");
        }

        //Show it
        if (this.animationTimeout != -1)
        {
            this.animationTimeout = -1;
            clearTimeout(this.animationTimeout);
        }
        this.loadingAnimationElement.style.display = "block";
        let object = this;
        setTimeout(function ()
        {
            object.loadingAnimationElement.classList.add("show");
        }, 1);

        this.opened = true;
    }

    /**
     * Hides the loading animation
     * */
    public Hide()
    {
        if (!this.opened)
            return;

        //The animation does not exist
        if (!this.loadingAnimationElement)
            return;

        //Hide it
        if (this.animationTimeout != -1)
        {
            this.animationTimeout = -1;
            clearTimeout(this.animationTimeout);
        }
        this.loadingAnimationElement.classList.remove("show");
        let object = this;
        this.animationTimeout = setTimeout(function ()
        {
            object.loadingAnimationElement.style.display = "none";
            object.animationTimeout = -1;
        }, 250);

        this.opened = false;
    }

    //--------------------------------------------------
    //---------HTML-------------------------------------
    //--------------------------------------------------
    /**
     * Generates animation HTML that should be appended
     * @param fullscreen Tells if it should generate HTML for fullscreen loading animation
     */
    private static GenerateAnimationHTML(fullscreen: boolean = false)
    {
        return `<div id="${fullscreen ? "fullscreenLoadingScreen" : ""}" class="loadingScreen">
            <div class="loadingScreenAnimation">
                <div class="loadingScreenAnimationObject">
                  <div class="loadingDot loadingDot1">&nbsp;</div>        
                  <div class="loadingDot loadingDot2">&nbsp;</div>        
                  <div class="loadingDot loadingDot3">&nbsp;</div>        
                  <div class="loadingDot loadingDot4">&nbsp;</div>   
                  <div class="loadingDot loadingDot1x2">&nbsp;</div>        
                </div>
            </div>
        </div>`;
    }

    //--------------------------------------------------
    //----------GLOBAL SHOW/HIDE------------------------
    //--------------------------------------------------
    /**
     * Show the loading animation
     * */
    static Show()
    {
        if (LoadingAnimation.opened)
            return;

        //Append new loading animation
        if (!LoadingAnimation.loadingAnimationElement)
        {
            let body = document.getElementsByTagName("body").item(0);

            //Parent position
            /*if (!body.style.position || body.style.position == "static")
                body.style.position = "relative";*/

            body.insertAdjacentHTML("beforeend", LoadingAnimation.GenerateAnimationHTML(true));

            LoadingAnimation.loadingAnimationElement = document.getElementById("fullscreenLoadingScreen");
        }

        //Show it
        if (LoadingAnimation.animationTimeout != -1)
        {
            LoadingAnimation.animationTimeout = -1;
            clearTimeout(LoadingAnimation.animationTimeout);
        }
        LoadingAnimation.loadingAnimationElement.style.display = "block";
        setTimeout(function ()
        {
            LoadingAnimation.loadingAnimationElement.classList.add("show");
        }, 1);

        LoadingAnimation.opened = true;
    }

    /**
     * Hide the loading animation
     * */
    static Hide()
    {
        if (!LoadingAnimation.opened)
            return;

        //The animation does not exist
        if (!LoadingAnimation.loadingAnimationElement)
            return;

        //Hide it
        if (LoadingAnimation.animationTimeout != -1)
        {
            LoadingAnimation.animationTimeout = -1;
            clearTimeout(LoadingAnimation.animationTimeout);
        }    
        LoadingAnimation.loadingAnimationElement.classList.remove("show");
        LoadingAnimation.animationTimeout = setTimeout(function ()
        {
            LoadingAnimation.loadingAnimationElement.style.display = "none";
            LoadingAnimation.animationTimeout = -1;
        }, 250);

        LoadingAnimation.opened = false;
    }
}

