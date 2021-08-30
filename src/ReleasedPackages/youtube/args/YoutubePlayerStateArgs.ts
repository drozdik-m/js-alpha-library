import { YoutubePlayerState } from "../src/YoutubeStates";


export class YoutubePlayerStateArgs
{
    private currentVideoId: string;
    private state: YoutubePlayerState;

    /**
     * Creates new YoutubePlayer state arguments
     * @param currentVideoId Current video ID Playing
     * @param state Current player state
     */
    constructor(currentVideoId: string, state: YoutubePlayerState)
    {
        this.currentVideoId = currentVideoId;
        this.state = state;
    }

    /**
     * Returns current video ID
     * */
    CurrentVideoId(): string
    {
        return this.currentVideoId;
    }

    /**
     * Returns current player state
     * */
    State(): YoutubePlayerState
    {
        return this.state;
    }
}