import { Event } from "@drozdik.m/event";
import { WindowEvents } from "@drozdik.m/window-events";
import { DimensionsHelper } from "@drozdik.m/dimensions-helper";

//--------------------------------------------------
//----------DIALOG WINDOW---------------------------
//--------------------------------------------------
export class DialogWindow
{
    //--------------------------------------------------
    //----------PROPERTIES------------------------------
    //--------------------------------------------------
    //Variables
    protected dialogId: string = "";

    protected opened: boolean = false;
    IsOpened(): boolean { return this.opened; }

    protected dialogWrapper: HTMLElement;
    protected dialogContent: HTMLElement;

    protected contentDimensionsHelper: DimensionsHelper;

    private animationTimeout: number = -1;

    //Events
    public OnOpen = new Event<DialogWindow, null>();
    public OnClose = new Event<DialogWindow, null>();
    public OnUpdate = new Event<DialogWindow, null>();
    public OnBeforeUpdate = new Event<DialogWindow, null>();

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    /**
     * New dialog window with data bindings
     * @param dialogId
     */
    constructor(dialogId: string)
    {
        this.dialogId = dialogId;

        //Element existance check
        this.dialogContent = document.getElementById(this.dialogId);
        if (!this.dialogContent)
        {
            console.error("DialogWindow(#" + dialogId + ") - element not found");
            return;
        }

        //Dimensions helper
        this.contentDimensionsHelper = new DimensionsHelper(this.dialogContent);

        //Transform a div into dialog window
        this.DialogWindowfy(document.getElementById(this.dialogId));

        //On click action
        let object = this;
        document.querySelectorAll("[data-dialog-id=\"" + dialogId + "\"]").forEach(function (element: HTMLElement)
        {
            element.addEventListener("click", function ()
            {
                object.Open();
            });
        });

        //Dialog close action
        this.dialogWrapper.querySelectorAll(".dialogClose").forEach(function (element: HTMLElement)
        {
            element.addEventListener("click", function ()
            {
                object.Close();
            });
        });

        //Dialog update
        WindowEvents.OnResize.Add(function ()
        {
            object.Update();
        });
        WindowEvents.OnDOMReady.Add(function ()
        {
            object.Update();
        });
        WindowEvents.OnLoad.Add(function ()
        {
            object.Update();
        });
        object.Update();

    }

    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------

    /**
     * Transform a div into dialog window
     * @param element Target element
     */
    private DialogWindowfy(element: HTMLElement)
    {
        let wrappingElement = document.createElement("div");
        wrappingElement.classList.add("dialogWindow");

        let dialogBackground = document.createElement("div");
        dialogBackground.innerHTML = "&nbsp";
        dialogBackground.classList.add("dialogBackground");
        dialogBackground.classList.add("dialogClose");

        let dialogCross = document.createElement("div");
        dialogCross.classList.add("dialogCross");
        dialogCross.classList.add("dialogClose");
        let line1 = document.createElement("div");
        line1.classList.add("line");
        line1.classList.add("line1");
        line1.innerHTML = "&nbsp;";
        let line2 = document.createElement("div");
        line2.classList.add("line");
        line2.classList.add("line2");
        line2.innerHTML = "&nbsp;";
        dialogCross.appendChild(line1);
        dialogCross.appendChild(line2);

        wrappingElement.appendChild(dialogBackground);
        element.insertAdjacentElement("afterbegin", dialogCross);

        element.classList.add("dialogContent");

        element.parentElement.insertAdjacentElement("afterbegin", wrappingElement);
        wrappingElement.appendChild(element);

        this.dialogWrapper = wrappingElement;
    }

    /**
    * Opens the dialog window
    */
    Open()
    {
        let object = this;

        //Change opened bool
        this.opened = true;

        //Show
        this.dialogWrapper.style.display = "block";
        if (this.animationTimeout == -1)
        {
            clearTimeout(this.animationTimeout);
            this.animationTimeout = -1;
        }

        //Add open class
        setTimeout(function ()
        {
            object.dialogWrapper.classList.add("opened");
        }, 1);

        //Update sizes
        this.Update();

        //Callback
        this.OnOpen.Invoke(this, null);
    }

    /**
    * Closes the dialog window
    */
    Close()
    {
        //Remove open class
        this.dialogWrapper.classList.remove("opened");

        //Change opened bool
        this.opened = false;

        //Callback
        this.OnClose.Invoke(this, null);

        //Run animation
        let object = this;
        if (this.animationTimeout == -1)
        {
            clearTimeout(this.animationTimeout);
            this.animationTimeout = -1;
        }   
        this.animationTimeout = setTimeout(function ()
        {
            object.dialogWrapper.style.display = "none";
            this.animationTimeout = -1;
        }, 250);
    }

    /**
    * Resizes and updates the dialog window
    */
    Update()
    {
        //No need for update is dialog window is closed
        if (!this.opened)
            return;

        //Remove max height
        this.dialogContent.style.maxHeight = "unset";

        //Callback
        this.OnBeforeUpdate.Invoke(this, null);

        //Get needed variables
        let dialogWrapperComputedStyle = getComputedStyle(this.dialogWrapper);
        let dialogContentHeight = this.contentDimensionsHelper.Height();
        let dialogPaddingTop = parseInt(dialogWrapperComputedStyle.paddingTop);
        let dialogPaddingBottom = parseInt(dialogWrapperComputedStyle.paddingBottom);

        let dialogContentComputedStyle = getComputedStyle(this.dialogContent);
        let contentPaddingTop = parseInt(dialogContentComputedStyle.paddingTop);
        let contentPaddingBottom = parseInt(dialogContentComputedStyle.paddingBottom);

        let windowHeight = WindowEvents.Height();
        
        let freeSpaceHeight = windowHeight - dialogContentHeight - dialogPaddingTop - dialogPaddingBottom;
        let maxHeight = windowHeight - dialogPaddingTop - dialogPaddingBottom - contentPaddingTop - contentPaddingBottom;

        //Is there any free space?
        if (freeSpaceHeight > 0)
        {
            //Remove overflow class
            this.dialogWrapper.classList.remove("dialogScreenOverflow");

            //Add offset top
            let offsetTop = freeSpaceHeight / 3;
            this.dialogContent.style.top = offsetTop + "px";
        }
        else
        {
            //Add overflow class
            this.dialogWrapper.classList.add("dialogScreenOverflow");

            //Remove offset top
            this.dialogContent.style.top = "0";
        }

        //Calculate new max-height
        this.dialogContent.style.maxHeight = maxHeight + "px";

        //Callback
        this.OnUpdate.Invoke(this, null);

    }

}
