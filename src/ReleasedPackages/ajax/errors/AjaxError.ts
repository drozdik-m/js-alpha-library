

export class AjaxError extends Error
{
    status: number = -1;
    statusText: string = "";


    constructor(status: number, statusText: string)
    {
        super(`[${status.toString()}] ${statusText}`);
        this.status = status;
        this.statusText = statusText;
    }

    /**
     * Returns status number
     * */
    Status(): number
    {
        return this.status;
    }

    /**
     * Returns status text
     * */
    StatusText(): string
    {
        return this.statusText;
    }
}