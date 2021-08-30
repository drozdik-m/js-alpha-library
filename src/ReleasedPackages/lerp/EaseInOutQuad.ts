import { ILerpFunction } from "./ILerpFunction";

export let EaseInOutQuad : ILerpFunction = function (from: number, to: number, currentFrame: number, totalFrames: number): number
{
    currentFrame /= totalFrames / 2;
    if (currentFrame < 1)
        return (to - from) / 2 * currentFrame * currentFrame + from;
    currentFrame--;
    return -(to - from) / 2 * (currentFrame * (currentFrame - 2) - 1) + from;
}