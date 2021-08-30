import { ILerpFunction } from "./ILerpFunction";

export let EaseOutQuart : ILerpFunction = function (from: number, to: number, currentFrame: number, totalFrames: number): number
{
    currentFrame /= totalFrames;
    currentFrame--;
    return -(to - from) * (currentFrame * currentFrame * currentFrame * currentFrame - 1) + from;
}