

export class MessageParsingError extends Error
{
    Message(): string
    {
        return this.message;
    }
}