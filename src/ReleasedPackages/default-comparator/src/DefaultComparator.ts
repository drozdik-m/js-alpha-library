
/**
 * Default comparator for primitive JavaScript types
 * Returns -1 if a < b
 * Returns 0 if a == b
 * Returns 1 if a > b
 * @param a parameter 1
 * @param b parameter 2
 */
export function DefaultComparator<T>(a: T, b: T): number
{
    if (a > b)
        return 1;
    if (a < b)
        return -1;
    return 0;
}
