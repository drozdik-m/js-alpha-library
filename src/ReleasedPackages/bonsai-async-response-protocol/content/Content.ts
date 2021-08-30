
export class Content
{
    private content: any;

    constructor(content: any)
    {
        this.content = content;
    }

    Content(): any
    {
        return this.content;
    }

    IsDefined(): boolean
    {
        return this.content != null && typeof this.content != "undefined";
    }

    IsEmpty(): boolean
    {
        return !this.IsDefined();
    }

    static Empty(): Content
    {
        return new Content({});
    }
}