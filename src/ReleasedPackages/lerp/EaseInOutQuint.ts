import { ILerpFunction } from "./ILerpFunction";

export let EaseInOutQuint : ILerpFunction = function (from: number, to: number, currentFrame: number, totalFrames: number): number
{
    currentFrame /= totalFrames / 2;
    if (currentFrame < 1)
        return (to - from) / 2 * currentFrame * currentFrame * currentFrame * currentFrame * currentFrame + from;
    currentFrame -= 2;
    return (to - from) / 2 * (currentFrame * currentFrame * currentFrame * currentFrame * currentFrame + 2) + from;
}