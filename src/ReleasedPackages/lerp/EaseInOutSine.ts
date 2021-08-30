import { ILerpFunction } from "./ILerpFunction";

export let EaseInOutSine : ILerpFunction = function (from: number, to: number, currentFrame: number, totalFrames: number): number
{
    return -(to - from) / 2 * (Math.cos(Math.PI * currentFrame / totalFrames) - 1) + from;
}