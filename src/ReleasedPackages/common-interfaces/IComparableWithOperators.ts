import { IComparable } from "./IComparable";

export interface IComparableWithOperators<T> extends IComparable<T>
{
    /**
     * Compares the objects using comparator
     * Returns -1 of "this" is before (lower than) input.
     * Returns 0 if "this" equals input.
     * Return 1 if "this" comes after (greater than) input.
     * @param obj Object to compare
     */
    CompareTo(obj: T): number;

    /**
     * Check if this is equal to input object
     * @param obj Input object
     */
    Equals(obj: T): boolean;

    /**
     * Check if this is less than input object
     * @param obj Input object
     */
    LessThan(obj: T): boolean;

    /**
     * Check if this is greater than input object
     * @param obj Input object
     */
    GreaterThan(obj: T): boolean;
}