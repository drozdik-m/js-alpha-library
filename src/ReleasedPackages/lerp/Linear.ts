import { ILerpFunction } from "./ILerpFunction";


export let Linear: ILerpFunction = function(from: number, to: number, currentFrame: number, totalFrames: number): number
{
    return (to - from) * currentFrame / totalFrames + from;
}