import { IClonable } from "@drozdik.m/common-interfaces/IClonable";

export class ValuePair<T, E> implements IClonable<ValuePair<T, E>>
{
    first: T = null;
    second: E = null;

    /**
     * Creates new instance of a pair
     * @param first First value (default = null)
     * @param second Second value (default = null)
     */
    constructor(first: T = null, second: E = null)
    {
        this.first = first;
        this.second = second;
    }

    /**
     * Returns value of first
     * */
    First()
    {
        return this.first;
    }

    /**
     * Returns value of second
     * */
    Second()
    {
        return this.second;
    }

    /**
     * Sets first value
     * @param value New value
     */
    SetFirst(value: T)
    {
        this.first = value;
    }

    /**
     * Sets second value
     * @param value New value
     */
    SetSecond(value: E)
    {
        this.second = value;
    }

    /**
    * To string
    */
    toString(): void
    {
        console.log(`${this.first}, ${this.second}`);
    }

    Clone(): ValuePair<T, E>
    {
        //Copy key
        let newFirst: T;
        if (typeof (this.first as any).Clone != "undefined")
            newFirst = (this.first as any).Clone();
        else
            newFirst = this.first;

        //Copy value
        let newSecond: E;
        if (typeof (this.second as any).Clone != "undefined")
            newSecond = (this.second as any).Clone();
        else
            newSecond = this.second;

        let res = new ValuePair(newFirst, newSecond);
        return res;
    }
}