import { Linear } from "../Linear";
import { EaseInQuad } from "../EaseInQuad";
import { EaseOutCubic } from "../EaseOutCubic";
import { ILerpFunction } from "../ILerpFunction";

function Interpolate(from: number, to: number, targetElement: HTMLElement, lerp: ILerpFunction)
{
    //let interpolationValue = 0.01;
    let targetVal = to;
    let currentFrame = 0;
    let duration = 5000;
    let timeBetweenFrames = 10;

    let animationFrame = function ()
    {
        //console.log("Frame: " + currentFrame);

        currentFrame += timeBetweenFrames;
        let interpolationValue = lerp(from, targetVal, currentFrame, duration);

        //console.log("   value: " + interpolationValue);

        targetElement.style.left = interpolationValue + "px";

        if (currentFrame < duration)
            setTimeout(animationFrame, timeBetweenFrames);
    }
    animationFrame();
}

document.addEventListener("DOMContentLoaded", function ()
{
    document.documentElement.insertAdjacentHTML("beforeend", "<div class='box' id='box1'>&nbsp;</div>");
    let box1 = document.getElementById("box1");
    Interpolate(0, 500, box1, Linear);
    
    document.documentElement.insertAdjacentHTML("beforeend", "<div class='box' id='box2'>&nbsp;</div>");
    let box2 = document.getElementById("box2");
    Interpolate(500, 0, box2, Linear);

    document.documentElement.insertAdjacentHTML("beforeend", "<div class='box' id='box3'>&nbsp;</div>");
    Interpolate(0, 500, document.getElementById("box3"), EaseInQuad);

    document.documentElement.insertAdjacentHTML("beforeend", "<div class='box' id='box4'>&nbsp;</div>");
    Interpolate(0, 500, document.getElementById("box4"), EaseOutCubic);
});