

export class UnitTestFailedError extends Error
{
    Message(): string
    {
        return this.message;
    }
}