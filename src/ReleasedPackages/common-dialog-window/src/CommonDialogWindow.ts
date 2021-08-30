import { DialogWindow } from "@drozdik.m/dialog-window";


//--------------------------------------------------
//----------COMMON DIALOG WINDOW PROPERTIES---------
//--------------------------------------------------
abstract class DialogWindowProperties
{
    id: string;
    buttonClass: string;
    constructor(id: string, buttonClass: string)
    {
        this.id = id;
        this.buttonClass = buttonClass;
    }
    /**
     * Returns generated dialog window HTML
     */
    abstract GenerateDialogWindowHTML(): string;
}
class CommonDialogWindowProperties extends DialogWindowProperties
{
    GenerateDialogWindowHTML(): string
    {
        return `<div id="${this.id}" class="commonDialogWindowContent"> \
                    <p class="dialogWindowHeading"></p> \
                    <p class="message"></p> \
                    <div class="commonButtonWrapper"> \
                        <button class="commonButton ${this.buttonClass} dialogClose"></button> \
                    </div> \
                </div>`;
    }
}

class CommonDialogWindowProperties_Green extends CommonDialogWindowProperties
{
    constructor(id: string)
    {
        super(id, "commonButtonGreen")
    }
}
class CommonDialogWindowProperties_Yellow extends CommonDialogWindowProperties
{
    constructor(id: string)
    {
        super(id, "commonButtonYellow")
    }
}
class CommonDialogWindowProperties_Red extends CommonDialogWindowProperties
{
    constructor(id: string)
    {
        super(id, "commonButtonRed")
    }
}
class CommonDialogWindowProperties_Grey extends CommonDialogWindowProperties
{
    constructor(id: string)
    {
        super(id, "commonButtonGrey")
    }
}




//--------------------------------------------------
//----------CONFIRMATION DIALOG WINDOW PROPERTIES---
//--------------------------------------------------
class ConfirmationDialogWindowProperties extends DialogWindowProperties
{
    cancelButtonClass: string;
    constructor(id: string, confirmButtonClass: string, cancelButtonClass: string)
    {
        super(id, confirmButtonClass);
        this.cancelButtonClass = cancelButtonClass;
    }
    GenerateDialogWindowHTML(): string
    {
        return `<div id="${this.id}" class="commonDialogWindowContent"> \
                    <p class="dialogWindowHeading">Potvrzení</p> \
                    <p class="message"></p> \
                    <div class="commonButtonWrapper"> \
                        <button class="commonButton confirmButton ${this.buttonClass} dialogClose">Potvrdit</button> \
                        <button class="commonButton closeButton ${this.cancelButtonClass} dialogClose">Zrušit</button> \
                    </div> \
                </div>`;
    }
}
class ConfirmationDialogWindowProperties_Green extends ConfirmationDialogWindowProperties
{
    constructor(id: string)
    {
        super(id, "commonButtonGreen", "commonButtonGrey");
    }
}
class ConfirmationDialogWindowProperties_Yellow extends ConfirmationDialogWindowProperties
{
    constructor(id: string)
    {
        super(id, "commonButtonYellow", "commonButtonGrey");
    }
}
class ConfirmationDialogWindowProperties_Red extends ConfirmationDialogWindowProperties
{
    constructor(id: string)
    {
        super(id, "commonButtonRed", "commonButtonGrey");
    }
}
class ConfirmationDialogWindowProperties_Grey extends ConfirmationDialogWindowProperties
{
    constructor(id: string)
    {
        super(id, "commonButtonGrey", "commonButtonGrey");
    }
}



//--------------------------------------------------
//----------COMMON DIALOG WINDOWS-------------------
//--------------------------------------------------
export class CommonDialogWindow
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    //Dialog windows
    private static SuccessDialogWindow: DialogWindow = null;
    private static WarningDialogWindow: DialogWindow = null;
    private static ErrorDialogWindow: DialogWindow = null;
    private static InfoDialogWindow: DialogWindow = null;

    //Information dialog settings
    private static SuccessDialogSettings: CommonDialogWindowProperties = new CommonDialogWindowProperties_Green("dialogSuccess");
    private static WarningDialogSettings: CommonDialogWindowProperties = new CommonDialogWindowProperties_Yellow("dialogWarning");
    private static ErrorDialogSettings: CommonDialogWindowProperties = new CommonDialogWindowProperties_Red("dialogError");
    private static InfoDialogSettings: CommonDialogWindowProperties = new CommonDialogWindowProperties_Grey("dialogInfo");

    //Confirmation dialog settings
    private static GreenConfirmationDialogWindow: DialogWindow = null;
    private static YellowConfirmationDialogWindow: DialogWindow = null;
    private static RedConfirmationDialogWindow: DialogWindow = null;
    private static GreyConfirmationDialogWindow: DialogWindow = null;

    //Confirmation dialog settings
    private static GreenConfirmationDialogSettings: ConfirmationDialogWindowProperties = new ConfirmationDialogWindowProperties_Green("dialogGreenConfirmation");
    private static YellowConfirmationDialogSettings: ConfirmationDialogWindowProperties = new ConfirmationDialogWindowProperties_Yellow("dialogYellowConfirmation");
    private static RedConfirmationDialogSettings: ConfirmationDialogWindowProperties = new ConfirmationDialogWindowProperties_Red("dialogRedConfirmation");
    private static GreyConfirmationDialogSettings: ConfirmationDialogWindowProperties = new ConfirmationDialogWindowProperties_Grey("dialogGreyConfirmation");

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    constructor()
    {

    }

    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------

    /**
     * Handles existance of the dialog window
     * @param dialogWindow Dialog window 
     * @param dialogWindowProperties Dialog window properties
     */
    private static HandleDialogWindowExistance(dialogWindow: DialogWindow, dialogWindowProperties: DialogWindowProperties): DialogWindow
    {
        //Window already exists
        if (dialogWindow !== null)
            return dialogWindow;

        //Append the window
        document.body.insertAdjacentHTML("beforeend", dialogWindowProperties.GenerateDialogWindowHTML());

        //Create dialog class
        return new DialogWindow(dialogWindowProperties.id);
    }



    //--------------------------------------------------
    //----------COMMON DIALOG WINDOWS-------------------
    //--------------------------------------------------

    /**
     * Shows success dialog window
     * @param message Message
     * @param heading Heading
     * @param confirmButton Confirm button text
     */
    static Success(message: string, heading: string = "Úspěch", confirmButton: string = "Potvrdit")
    {
        //Handle dialog window
        CommonDialogWindow.SuccessDialogWindow = CommonDialogWindow.HandleDialogWindowExistance(CommonDialogWindow.SuccessDialogWindow, CommonDialogWindow.SuccessDialogSettings);

        //Change content
        CommonDialogWindow.FillCommonDialogWindow(CommonDialogWindow.SuccessDialogSettings.id, message, heading, confirmButton);

        //Open dialog window
        CommonDialogWindow.SuccessDialogWindow.Open();
    }
    /**
     * Shows warning dialog window 
     * @param message Message
     * @param heading Heading
     * @param confirmButton Confirm button text
     */
    static Warning(message: string, heading: string = "Varování", confirmButton: string = "Potvrdit")
    {
        //Handle dialog window
        CommonDialogWindow.WarningDialogWindow = CommonDialogWindow.HandleDialogWindowExistance(CommonDialogWindow.WarningDialogWindow, CommonDialogWindow.WarningDialogSettings);

        //Change content
        CommonDialogWindow.FillCommonDialogWindow(CommonDialogWindow.WarningDialogSettings.id, message, heading, confirmButton);

        //Open dialog window
        CommonDialogWindow.WarningDialogWindow.Open();
    }
    /**
     * Shows error dialog window 
     * @param message Message
     * @param heading Heading
     * @param confirmButton Confirm button text
     */
    static Error(message: string, heading: string = "Error", confirmButton: string = "Potvrdit")
    {
        //Handle dialog window
        CommonDialogWindow.ErrorDialogWindow = CommonDialogWindow.HandleDialogWindowExistance(CommonDialogWindow.ErrorDialogWindow, CommonDialogWindow.ErrorDialogSettings);

        //Change content
        CommonDialogWindow.FillCommonDialogWindow(CommonDialogWindow.ErrorDialogSettings.id, message, heading, confirmButton);

        //Open dialog window
        CommonDialogWindow.ErrorDialogWindow.Open();
    }
    /**
     * Shows information dialog window 
     * @param message Message
     * @param heading Heading
     * @param confirmButton Confirm button text
     */
    static Info(message: string, heading: string = "Informace", confirmButton: string = "Potvrdit")
    {
        //Handle dialog window
        CommonDialogWindow.InfoDialogWindow = CommonDialogWindow.HandleDialogWindowExistance(CommonDialogWindow.InfoDialogWindow, CommonDialogWindow.InfoDialogSettings);

        //Change content
        CommonDialogWindow.FillCommonDialogWindow(CommonDialogWindow.InfoDialogSettings.id, message, heading, confirmButton);

        //Open dialog window
        CommonDialogWindow.InfoDialogWindow.Open();
    }

    /**
     * Updates common dialog window content
     * @param dialogId Dialog window ID
     * @param message Message
     * @param heading Heading
     * @param confirmButton Confirm button text
     */
    private static FillCommonDialogWindow(dialogId: string, message: string, heading: string, confirmButton: string)
    {
        let dialog = document.getElementById(dialogId);
        dialog.querySelector(".message").innerHTML = message;
        dialog.querySelector(".dialogWindowHeading").innerHTML = heading;
        dialog.querySelector(".commonButton").innerHTML = confirmButton;
    }

    //--------------------------------------------------
    //----------CONFIRMATION DIALOG WINDOWS-------------
    //--------------------------------------------------

    /**
     * Pops green confirmation dialog window. If confirmed, confirm action is called
     * @param message Message
     * @param confirmAction Function called on confirmation
     * @param heading Heading
     * @param closeButton Close button text
     * @param confirmButton Confirm button text
     */
    static GreenConfirm(message: string, confirmAction: Function, heading: string = "Potvrzení", closeButton: string = "Zavřít", confirmButton: string = "Potvrdit")
    {
        //Handle dialog window
        CommonDialogWindow.GreenConfirmationDialogWindow = CommonDialogWindow.HandleDialogWindowExistance(CommonDialogWindow.GreenConfirmationDialogWindow, CommonDialogWindow.GreenConfirmationDialogSettings);

        //Change content
        CommonDialogWindow.FillConfirmDialogWindow(CommonDialogWindow.GreenConfirmationDialogSettings.id, confirmAction, message, heading, closeButton, confirmButton);

        //Open dialog window
        CommonDialogWindow.GreenConfirmationDialogWindow.Open();
    }

    /**
     * Pops yellow confirmation dialog window. If confirmed, confirm action is called
     * @param message Message
     * @param confirmAction Function called on confirmation
     * @param heading Heading
     * @param closeButton Close button text
     * @param confirmButton Confirm button text
     */
    static YellowConfirm(message: string, confirmAction: Function, heading: string = "Potvrzení", closeButton: string = "Zavřít", confirmButton: string = "Potvrdit")
    {
        //Handle dialog window
        CommonDialogWindow.YellowConfirmationDialogWindow = CommonDialogWindow.HandleDialogWindowExistance(CommonDialogWindow.YellowConfirmationDialogWindow, CommonDialogWindow.YellowConfirmationDialogSettings);

        //Change content
        CommonDialogWindow.FillConfirmDialogWindow(CommonDialogWindow.YellowConfirmationDialogSettings.id, confirmAction, message, heading, closeButton, confirmButton);

        //Open dialog window
        CommonDialogWindow.YellowConfirmationDialogWindow.Open();
    }

    /**
     * Pops red confirmation dialog window. If confirmed, confirm action is called
     * @param message Message
     * @param confirmAction Function called on confirmation
     * @param heading Heading
     * @param closeButton Close button text
     * @param confirmButton Confirm button text
     */
    static RedConfirm(message: string, confirmAction: Function, heading: string = "Potvrzení", closeButton: string = "Zavřít", confirmButton: string = "Potvrdit")
    {
        //Handle dialog window
        CommonDialogWindow.RedConfirmationDialogWindow = CommonDialogWindow.HandleDialogWindowExistance(CommonDialogWindow.RedConfirmationDialogWindow, CommonDialogWindow.RedConfirmationDialogSettings);

        //Change content
        CommonDialogWindow.FillConfirmDialogWindow(CommonDialogWindow.RedConfirmationDialogSettings.id, confirmAction, message, heading, closeButton, confirmButton);

        //Open dialog window
        CommonDialogWindow.RedConfirmationDialogWindow.Open();
    }

    /**
     * Pops black confirmation dialog window. If confirmed, confirm action is called
     * @param message Message
     * @param confirmAction Function called on confirmation
     * @param heading Heading
     * @param closeButton Close button text
     * @param confirmButton Confirm button text
     */
    static BlackConfirm(message: string, confirmAction: Function, heading: string = "Potvrzení", closeButton: string = "Zavřít", confirmButton: string = "Potvrdit")
    {
        //Handle dialog window
        CommonDialogWindow.GreyConfirmationDialogWindow = CommonDialogWindow.HandleDialogWindowExistance(CommonDialogWindow.GreyConfirmationDialogWindow, CommonDialogWindow.GreyConfirmationDialogSettings);

        //Change content
        CommonDialogWindow.FillConfirmDialogWindow(CommonDialogWindow.GreyConfirmationDialogSettings.id, confirmAction, message, heading, closeButton, confirmButton);

        //Open dialog window
        CommonDialogWindow.GreyConfirmationDialogWindow.Open();
    }

    /**
     * Updates confirm dialog window content
     * @param dialogId Dialog window ID
     * @param message Message
     * @param heading Heading
     * @param closeButton Close button text
     * @param confirmButton Confirm button text
     */
    private static FillConfirmDialogWindow(dialogId: string, confirmAction: Function, message: string, heading: string, closeButton: string, confirmButton: string)
    {
        let dialog = document.getElementById(dialogId);
        dialog.querySelector(".message").innerHTML = message;
        dialog.querySelector(".dialogWindowHeading").innerHTML = heading;
        dialog.querySelector(".closeButton").innerHTML = closeButton;

        let confirmButtonEl = dialog.querySelector(".confirmButton");
        confirmButtonEl.innerHTML = confirmButton;
        (confirmButtonEl as any).onclick = confirmAction;
    }

}
