import { ILerpFunction } from "./ILerpFunction";

export let EaseInSine : ILerpFunction = function (from: number, to: number, currentFrame: number, totalFrames: number): number
{
    return -(to - from) * Math.cos(currentFrame / totalFrames * (Math.PI / 2)) + (to - from) + from;
}