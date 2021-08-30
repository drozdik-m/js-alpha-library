

export class OptionError extends Error
{
    Message(): string
    {
        return this.message;
    }
}