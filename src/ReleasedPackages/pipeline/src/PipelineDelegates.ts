

export interface IExecutor
{
    (resolver: IResolver, rejector: IRejector): any
}

export interface IResolver
{
    (...args: any[]): void
}

export interface IRejector
{
    (error: Error): void
}

