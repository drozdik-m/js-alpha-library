import { Settings } from "../Libs/Settings";


export class ActivateSection
{
    static Render()
    {
        //--------------------------------------------------
        //---------ACTIVATE---------------------------------
        //--------------------------------------------------
        self.addEventListener("activate", function (activateEvent: ActivateEvent)
        {
            //DEBUG
            if (Settings.debug)
                console.log("Service worker - ACTIVATE");
        });
    }
}