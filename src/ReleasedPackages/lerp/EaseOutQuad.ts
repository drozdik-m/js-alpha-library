import { ILerpFunction } from "./ILerpFunction";

export let EaseOutQuad: ILerpFunction = function (from: number, to: number, currentFrame: number, totalFrames: number): number
{
    currentFrame /= totalFrames;
    return -(to - from) * currentFrame * (currentFrame - 2) + from;
}