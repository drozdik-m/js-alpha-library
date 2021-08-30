

export class AssertFailedError extends Error
{
    Message(): string
    {
        return this.message;
    }
}