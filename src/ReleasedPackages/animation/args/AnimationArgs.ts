
export class AnimationArgs
{
    private value: number;

    constructor(value: number) 
    {
        this.value = value;
    }

    /**
     * Returns currently calculated animation value
     * */
    Value(): number
    {
        return this.value;
    }
}