import { ILerpFunction } from "./ILerpFunction";

export let EaseInOutCirc : ILerpFunction = function (from: number, to: number, currentFrame: number, totalFrames: number): number
{
    currentFrame /= totalFrames / 2;
    if (currentFrame < 1)
        return -(to - from) / 2 * (Math.sqrt(1 - currentFrame * currentFrame) - 1) + from;
    currentFrame -= 2;
    return (to - from) / 2 * (Math.sqrt(1 - currentFrame * currentFrame) + 1) + from;
}