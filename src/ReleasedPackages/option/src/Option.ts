import { OptionError } from "../errors/OptionError";




export class Option<Value>
{
    protected value: Value;

    constructor(value: Value)
    {
        this.value = value;
    }

    /**
     * Tells if there is a value
     * */
    IsDefined(): boolean
    {
        return this.value != null && typeof this.value != "undefined";
    }

    /**
     * Tells if these is not a value
     * */
    IsEmpty(): boolean
    {
        return !this.IsDefined();
    }

    /**
     * Returns the contained value
     * */
    Get(): Value
    {
        if (this.IsEmpty())
            throw new OptionError("Value requested when there is none");
        return this.value
    }

    /**
     * Returns Option object with a value
     * @param value The value
     */
    static Some<Value>(value: Value): Option<Value>
    {
        return new Option(value);
    }

    private static noneOption = new Option<null>(null)
    static None(): Option<null>
    {
        return Option.noneOption;
    }
}