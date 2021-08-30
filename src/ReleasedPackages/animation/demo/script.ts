import { Animation } from "../src/Animation";

document.addEventListener("DOMContentLoaded", function ()
{
    document.documentElement.insertAdjacentHTML("beforeend", "<div class='box' id='box1'>&nbsp;</div>");
    let box1 = document.getElementById("box1");
    let animation1 = new Animation(5000);
    animation1.OnEnd.Add(function (caller, args)
    {
        console.log("Finish: " + args.Value());
    });
    animation1.OnStart.Add(function (caller, args)
    {
        console.log("Start: " + args.Value());
    });
    animation1.OnRender.Add(function (caller, args)
    {
        box1.style.left = args.Value().toString() + "px";
    });
    animation1.Start(0, 500);

    setTimeout(function ()
    {
        animation1.Pause();
        setTimeout(function ()
        {
            animation1.Continue();
        }, 750);
    }, 1000);

    setTimeout(function ()
    {
        animation1.Stop();
        animation1.Start(500, 0);
    }, 4500);

});