

export interface IRunner
{
    (...args: any[]): any
}

export interface ISimpleRunner<TValue>
{
    (argument: TValue): any
}

export interface ICatcher
{
    (error: Error): any
}