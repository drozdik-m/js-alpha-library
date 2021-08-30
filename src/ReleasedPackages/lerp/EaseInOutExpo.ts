import { ILerpFunction } from "./ILerpFunction";

export let EaseInOutExpo : ILerpFunction = function (from: number, to: number, currentFrame: number, totalFrames: number): number
{
    currentFrame /= totalFrames / 2;
    if (currentFrame < 1) return (to - from) / 2 * Math.pow(2, 10 * (currentFrame - 1)) + from;
    currentFrame--;
    return (to - from) / 2 * (-Math.pow(2, -10 * currentFrame) + 2) + from;
}