import { IClonable } from "@drozdik.m/common-interfaces/IClonable";

export class KeyValuePair<T, E> implements IClonable<KeyValuePair<T, E>>
{
    private key: T = null;
    value: E = null;

    /**
     * Creates new instance of a pair
     * @param key Key (default = null)
     * @param value Value (default = null)
     */
    constructor(key: T = null, value: E = null)
    {
        this.key = key;
        this.value = value;
    }

    /**
     * Returns key
     * */
    Key()
    {
        return this.key;
    }

    /**
     * Returns value
     * */
    Value()
    {
        return this.value;
    }

    /**
     * Sets value
     * @param value New value
     */
    SetValue(value: E)
    {
        this.value = value;
    }

    /**
    * To string
    */
    toString(): string
    {
        return `${this.key}, ${this.value}`;
    }

    Clone(): KeyValuePair<T, E>
    {
        //Copy key
        let newKey: T;
        if (typeof (this.key as any).Clone != "undefined")
            newKey = (this.key as any).Clone();
        else
            newKey = this.key;

        //Copy value
        let newValue: E;
        if (typeof (this.value as any).Clone != "undefined")
            newValue = (this.value as any).Clone();
        else
            newValue = this.value;

        let res = new KeyValuePair(newKey, newValue);
        return res;
    }
}