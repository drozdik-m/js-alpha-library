import { IComparator } from "./IComparator";


export interface IComparable<T>
{
    /**
     *  Returns comparator that has following behaviour:
     * Returns -1 if a < b
     * Returns 0 if a == b
     * Returns 1 if a > b
     * @param a Item #1
     * @param b Item #2
     */
    GetComparator(): IComparator<T>;
}

