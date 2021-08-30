

export class AjaxParameter
{
    private name: string;
    private value: string;

    /**
     * Ajax parameter
     * @param name Parameter name
     * @param value Parameter value
     */
    constructor(name: string, value: string)
    {
        this.name = name;
        this.value = value;
    }

    /**
     * Returns name of this parameter
     * */
    Name(): string
    {
        return this.name;
    }

    /**
     * Returns value of this parameter
     * */
    Value(): string
    {
        return this.value;
    }
}