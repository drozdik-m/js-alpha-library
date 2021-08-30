import { ILerpFunction } from "./ILerpFunction";

export let EaseInQuint : ILerpFunction = function (from: number, to: number, currentFrame: number, totalFrames: number): number
{
    currentFrame /= totalFrames;
    return (to - from) * currentFrame * currentFrame * currentFrame * currentFrame * currentFrame + from;
}