import { Event } from "@drozdik.m/event";
import { YoutubePlayerStateArgs } from "../args/YoutubePlayerStateArgs";
import { YoutubePlayerState } from "./YoutubeStates";
import { YoutubeAPI } from "./YoutubeAPI";


declare class YT
{
    static Player: any;
    static PlayerState: any;
}
declare class YTPlayer
{
    pauseVideo(): void;
    stopVideo(): void;
    playVideo(): void;
    loadVideoById(videoId: string): void;
    seekTo(sec: number): void;

}
declare class YTPlayerEvent
{
    data: any;
}

//--------------------------------------------------
//----------YOUTUBE PLAYER--------------------------
//--------------------------------------------------
export class YoutubePlayer
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    //Youtube player object
    private youtubePlayer: YTPlayer = null;

    //Player settings
    public startingVideoId = "";
    public currentVideoId = ""

    //Player id
    private playerId = "";

    //Events callback
    public OnReady: Event<YoutubePlayer, YoutubePlayerStateArgs> = new Event<YoutubePlayer, YoutubePlayerStateArgs>();
    public OnStateChange: Event<YoutubePlayer, YoutubePlayerStateArgs> = new Event<YoutubePlayer, YoutubePlayerStateArgs>();
    public OnError: Event<YoutubePlayer, YoutubePlayerStateArgs> = new Event<YoutubePlayer, YoutubePlayerStateArgs>();
    public OnStateChangeENDED: Event<YoutubePlayer, YoutubePlayerStateArgs> = new Event<YoutubePlayer, YoutubePlayerStateArgs>();
    public OnStateChangePLAYING: Event<YoutubePlayer, YoutubePlayerStateArgs> = new Event<YoutubePlayer, YoutubePlayerStateArgs>();
    public OnStateChangePAUSED: Event<YoutubePlayer, YoutubePlayerStateArgs> = new Event<YoutubePlayer, YoutubePlayerStateArgs>();
    public OnStateChangeBUFFERING: Event<YoutubePlayer, YoutubePlayerStateArgs> = new Event<YoutubePlayer, YoutubePlayerStateArgs>();
    public OnStateChangeCUED: Event<YoutubePlayer, YoutubePlayerStateArgs> = new Event<YoutubePlayer, YoutubePlayerStateArgs>();

    //State
    state: YoutubePlayerState = YoutubePlayerState.NotReady;

    //Player vars
    playerVars: object;

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    /**
     * Creates new YouTube player 
     * @param playerId Target element ID
     * @param startingVideoId Starting video ID
     */
    constructor(playerId: string, startingVideoId = "8tPnX7OPo0Q", playerVars: object = {})
    {
        this.playerId = playerId;
        this.startingVideoId = startingVideoId;
        this.currentVideoId = this.startingVideoId;
        this.playerVars = playerVars;

        //Check element existance
        const player = document.getElementById(this.playerId);

        //Exepcetion
        if (!player)
        {
            console.error("YoutubePlayer(#" + playerId + ") - element with that id does not exists");
            return;
        }

        const object = this;
        YoutubeAPI.Load().Then(function ()
        {
            object.InitPlayer();
        });
        
    }

    /**
     * Initiates the player using YouTube API
     * */
    private InitPlayer()
    {
        //Initialize Youtube player
        const object = this;
        this.youtubePlayer = new YT.Player(object.playerId, {
            host: 'https://www.youtube.com',
            videoId: object.startingVideoId,
            playerVars: object.playerVars,
            events: {
                "onReady": function ()
                {
                    object.YoutubePlayerReady()
                },
                "onStateChange": function (event: YTPlayerEvent)
                {
                    object.YoutubePlayerStateChange(event);
                },
                "onError": function (event: YTPlayerEvent)
                {
                    object.YoutubePlayerError(event);
                }
            }
        }) as YTPlayer;
    }

    //--------------------------------------------------
    //----------API CALLBACKS---------------------------
    //--------------------------------------------------
    /**
    * On youtube player ready
    */
    private YoutubePlayerReady()
    {
        this.state = YoutubePlayerState.Ready;

        //Callback
        this.OnReady.Invoke(this, new YoutubePlayerStateArgs(this.currentVideoId, this.state));
    }
    /**
     * On youtube player state change
     * @param event Event object
     */
    private YoutubePlayerStateChange(event: YTPlayerEvent)
    {
        //Exceptions
        if (this.state === YoutubePlayerState.NotReady)
        {
            console.error("YoutubePlayer.YoutubePlayerStateChange() - iframe is not ready yet");
            return;
        }

        //STATES
        if (event.data === YT.PlayerState.ENDED)
        {
            this.state = YoutubePlayerState.Ended;
            this.OnStateChangeENDED.Invoke(this, new YoutubePlayerStateArgs(this.currentVideoId, this.state));
        }
        else if (event.data === YT.PlayerState.PLAYING)
        {
            this.state = YoutubePlayerState.Playing;
            this.OnStateChangePLAYING.Invoke(this, new YoutubePlayerStateArgs(this.currentVideoId, this.state));
        }
        else if (event.data === YT.PlayerState.PAUSED)
        {
            this.state = YoutubePlayerState.Paused;
            this.OnStateChangePAUSED.Invoke(this, new YoutubePlayerStateArgs(this.currentVideoId, this.state));
        }
        else if (event.data === YT.PlayerState.BUFFERING)
        {
            this.state = YoutubePlayerState.Buffering;
            this.OnStateChangeBUFFERING.Invoke(this, new YoutubePlayerStateArgs(this.currentVideoId, this.state));
        }
        else if (event.data === YT.PlayerState.CUED)
        {
            this.state = YoutubePlayerState.Cued;
            this.OnStateChangeCUED.Invoke(this, new YoutubePlayerStateArgs(this.currentVideoId, this.state));
        }

        //Callback
        this.OnStateChange.Invoke(this, new YoutubePlayerStateArgs(this.currentVideoId, this.state));
    }
    /**
     * On youtube player error
     * @param event Error info
     */
    private YoutubePlayerError(event: YTPlayerEvent)
    {
        //Throw the error
        console.error("Youtube player with id #" + this.playerId + " encountered an error: ");
        console.log(event);

        //Callback
        this.OnError.Invoke(this, new YoutubePlayerStateArgs(this.currentVideoId, this.state));
    }

    //--------------------------------------------------
    //----------CONTROLS--------------------------------
    //--------------------------------------------------
    /**
     * Load new video
     * @param videoId Id of the video
     */
    Load(videoId: string)
    {
        //Exceptions
        if (this.state === YoutubePlayerState.NotReady)
        {
            console.error("YoutubePlayer.Load() - iframe is not ready yet");
            return;
        }

        //Load the video
        this.currentVideoId = videoId;
        this.youtubePlayer.loadVideoById(videoId);
    }

    /**
     * Jumps to a second of the loaded video
     * @param sec Second of the video
     */
    SeekTo(sec: number)
    {
        //Exceptions
        if (this.state === YoutubePlayerState.NotReady)
        {
            console.error("YoutubePlayer.JumpTo(sec) - iframe is not ready yet");
            return;
        }

        this.youtubePlayer.seekTo(sec);
    }

    /**
    * Play loaded video
    */
    Play()
    {
        this.youtubePlayer.playVideo();
    }

    /**
    * Stop loaded video
    */
    Stop()
    {
        this.youtubePlayer.stopVideo();
    }

    /**
    * Pause loaded video
    */
    Pause()
    {
        this.youtubePlayer.pauseVideo();
    }

    /**
     * Returns youtube player state
     * */
    GetState(): YoutubePlayerState
    {
        return this.state;
    }
}