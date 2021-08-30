import { ILerpFunction } from "./ILerpFunction";

export let EaseOutExpo : ILerpFunction = function (from: number, to: number, currentFrame: number, totalFrames: number): number
{
    return (to - from) * (-Math.pow(2, -10 * currentFrame / totalFrames) + 1) + from;
}