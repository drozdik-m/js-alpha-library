import { ILerpFunction } from "./ILerpFunction";

export let EaseOutCirc : ILerpFunction = function (from: number, to: number, currentFrame: number, totalFrames: number): number
{
    currentFrame /= totalFrames;
    currentFrame--;
    return (to - from) * Math.sqrt(1 - currentFrame * currentFrame) + from;
}