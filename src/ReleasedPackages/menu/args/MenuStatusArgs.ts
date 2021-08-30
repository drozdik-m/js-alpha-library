

export class MenuStatusArgs
{
    private opened: boolean;

    constructor(opened: boolean)
    {
        this.opened = opened;
    }

    IsOpened(): boolean
    {
        return this.opened;
    }
}