

export interface ILerpFunction
{
    (from: number, to: number, currentFrame: number, totalFrames: number): number
}