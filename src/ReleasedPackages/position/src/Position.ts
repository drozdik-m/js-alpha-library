//--------------------------------------------------
//----------POSITION--------------------------------
//--------------------------------------------------
export class Position
{
    top: number = -1;
    left: number = -1;
    
    constructor(left: number, top: number)
    {
        this.top = top;
        this.left = left;
    }

    Top(): number
    {
        return this.top;
    }

    Left(): number
    {
        return this.left;
    }

    toString(): string
    {
        return `left: ${this.left}; top: ${this.top}`;
    }
}
