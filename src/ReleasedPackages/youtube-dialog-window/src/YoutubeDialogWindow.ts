import { DialogWindow } from "@drozdik.m/dialog-window";
import { YoutubePlayer } from "@drozdik.m/youtube";
import { YoutubePlayerState } from "@drozdik.m/youtube/dist/src/YoutubeStates";

export class YoutubeDialogWindow
{
    //--------------------------------------------------
    //----------PROPERTIES------------------------------
    //--------------------------------------------------


    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    constructor()
    {

    }

    //--------------------------------------------------
    //----------ENVIRONMENT-----------------------------
    //--------------------------------------------------
    private static environmentCreated = false;
    private static globalPlayerDialogWindow: DialogWindow = null;
    private static globalPlayer: YoutubePlayer = null;

    /**
     * Ensures that the environment is created
     * */
    static EnsureCreatedEnvironment()
    {
        if (YoutubeDialogWindow.environmentCreated)
            return;
        YoutubeDialogWindow.environmentCreated = true;

        document.body.insertAdjacentHTML("beforeend", `
            <div id="youtubeDialogWindow">
                <div id="youtubeDialogWindowPlayer"></div>
            </div>
        `);

        YoutubeDialogWindow.globalPlayerDialogWindow = new DialogWindow("youtubeDialogWindow");
        
        YoutubeDialogWindow.globalPlayerDialogWindow.OnClose.Add(function ()
        {
            YoutubeDialogWindow.globalPlayer.Stop();
        });
    }

    /**
     * Returns target dialog window for player
     * */
    static GetPlayerDialogWindow(): DialogWindow
    {
        YoutubeDialogWindow.EnsureCreatedEnvironment();
        return YoutubeDialogWindow.globalPlayerDialogWindow;
    }

    /**
     * Returns target youtube player
     * */
    static GetYoutubePlayer(): YoutubePlayer
    {
        YoutubeDialogWindow.EnsureCreatedEnvironment();
        if (YoutubeDialogWindow.globalPlayer == null)
            YoutubeDialogWindow.globalPlayer = new YoutubePlayer("youtubeDialogWindowPlayer");

        return YoutubeDialogWindow.globalPlayer;
    }

    //--------------------------------------------------
    //----------FACTORIES-------------------------------
    //--------------------------------------------------
    /**
     * Binds elements with input data attribute to open the youtube dialog window
     * @param dataAttributePostfix The data attribute postfix to target (f.e. "youtube" will match "data-youtube=xxx")
     */
    static BindDataAttributes(dataAttributePostfix: string)
    {
        let fullAttributeName = "data-" + dataAttributePostfix;
        let elements = document.querySelectorAll(`[${fullAttributeName}]`);

        for (let i = 0; i < elements.length; i++)
        {
            let videoId = elements[i].getAttribute(fullAttributeName);
            elements[i].addEventListener("click", function (e)
            {
                e.preventDefault ? e.preventDefault() : (e.returnValue = false);
                let dialogWindow = YoutubeDialogWindow.GetPlayerDialogWindow();
                dialogWindow.Open();

                let player = YoutubeDialogWindow.GetYoutubePlayer();
                if (player.GetState() == YoutubePlayerState.NotReady)
                {
                    player.OnReady.Add(function ()
                    {
                        player.Load(videoId);
                        player.Play();
                        dialogWindow.Update();
                    });
                }
                else
                {
                    player.Load(videoId);
                    player.Play();
                }
                
            });
        }

    }
}