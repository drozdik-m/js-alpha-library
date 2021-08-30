import { IClearable } from "@drozdik.m/common-interfaces/IClearable";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";
import { IDisposable } from "@drozdik.m/common-interfaces/IDisposable";

//--------------------------------------------------
//----------PRIMITIVE CONTAINER---------------------
//--------------------------------------------------
export class PrimitiveContainer<T> implements IClearable, IClonable<PrimitiveContainer<T>>, IDisposable
{
    
    value: T = null;

    /**
     * Creates new instance of the primitive value container
     * @param value Saved value
     */
    constructor(value: T = null)
    {
        this.value = value;
    }

    /**
     * Returns stored value. Consider using property "value" when handling long strings for efficiency.
     * */
    GetValue(): T
    {
        return this.value;
    }

    /**
     * Sets stored value. Consider using property "value" when handling long strings for efficiency.
     * */
    SetValue(newValue: T)
    {
        this.value = newValue;
    }

    Clear(): void
    {
        this.value = null;
    }

    Dispose(): void
    {
        this.Clear();
    }

    Clone(): PrimitiveContainer<T>
    {
        let res = new PrimitiveContainer(null);
        if (this.value != null)
        {
            if (typeof (<any>this.value).Clone != "undefined")
                res.value = (<any>this.value).Clone();
            else
                res.value = this.value;
        }

        return res;
    }
}