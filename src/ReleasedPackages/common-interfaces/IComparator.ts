
/**
 * Comparator function, that:
 * Returns -1 if a < b
 * Returns 0 if a == b
 * Returns 1 if a > b
 * */
export interface IComparator <T>
{
    (object1: T, object2: T): number;
}
