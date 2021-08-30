import { ILerpFunction } from "./ILerpFunction";

export let EaseInCirc : ILerpFunction = function (from: number, to: number, currentFrame: number, totalFrames: number): number
{
    currentFrame /= totalFrames;
    return -(to - from) * (Math.sqrt(1 - currentFrame * currentFrame) - 1) + from;
}