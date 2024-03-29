﻿import { YoutubePlayer } from "../src/YoutubePlayer";


var youtubePlayer1 = new YoutubePlayer("youtubePlayerTest1");
youtubePlayer1.OnReady.Add(function ()
{
    youtubePlayer1.Load("-TGmasdIfQY");
    youtubePlayer1.Pause();
});
youtubePlayer1.OnStateChangeENDED.Add(function (caller, args)
{
    console.log("Player 1: ENDED");
    console.log(args);
});
youtubePlayer1.OnStateChangePLAYING.Add(function (caller, args)
{
    console.log("Player 1: PLAYING");
    console.log(args);
});
youtubePlayer1.OnStateChangePAUSED.Add(function (caller, args)
{
    console.log("Player 1: PAUSED");
    console.log(args);
});
youtubePlayer1.OnStateChangeBUFFERING.Add(function (caller, args)
{
    console.log("Player 1: BUFFERING");
    console.log(args);
});
youtubePlayer1.OnStateChangeCUED.Add(function (caller, args)
{
    console.log("Player 1: CUED");
    console.log(args);
});

//Custom buttons
document.getElementById("loadAVideoByIdButton").onclick = function ()
{
    youtubePlayer1.Load((document.getElementById("loadAVideoById") as any).value);
};
document.getElementById("playAVideo").onclick = function ()
{
    youtubePlayer1.Play();
};
document.getElementById("stopAVideo").onclick = function ()
{
    youtubePlayer1.Stop();
};
document.getElementById("pauseAVideo").onclick = function ()
{
    youtubePlayer1.Pause();
};
document.getElementById("seekTo").onclick = function ()
{
    const sec = (document.getElementById("seekToValue") as any).value;
    youtubePlayer1.SeekTo(sec);
};

const youtubePlayer2 = new YoutubePlayer("youtubePlayerTest2");
youtubePlayer2.OnReady.Add(function ()
{
    youtubePlayer2.Load("-TGmasdIfQY");
    youtubePlayer2.Stop();
});