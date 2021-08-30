import { IComparator } from "@drozdik.m/common-interfaces/IComparator";

declare global
{
    export interface Array<T>
    {
        /**
         * Removes all duplicates in the array - O(n2)
         * @param comparator Comparator for the elements. Default comparator for primitive types is set.
         * Comparator automatically recognizes IComparable items.
         */
        removeDuplicates(comparator?: IComparator<T>): Array<T>;

        /**
         * Removes all occurrences of inputed items - O(n * m)
         * @param elements Items to remove
         * @param comparator Comparator for the elements. Default comparator for primitive types is set. 
         * Comparator automatically recognizes IComparable items.
         */
        removeAllItems(elements: Array<T>, comparator?: IComparator<T>): Array<T>;

        /**
         * Remove all occurrences of inputed element - O(n)
         * @param element Element to be removed
         * @param comparator Comparator for the elements. Default comparator for primitive types is set.
         * Comparator automatically recognizes IComparable items.
         */
        removeAllOccurrences(element: T, comparator?: IComparator<T>): Array<T>;

        /**
         * Removes all items at set indexes - O(n * m)
         * @param indexes Array of indexes to remove
         */
        removeItemsAt(indexes: number[]): Array<T>;

        /**
         * Removes item at set indexe - O(n)
         * @param indexes Array of indexes to remove
         */
        removeItemAt(index: number): Array<T>;

        /**
        * Shuffles elements in the array
        */
        shuffle(): Array<T>;

        /**
        * Returns the first element in the array
        */
        first(): T;

        /**
        * Returns the last element in the array
        */
        last(): T;
    }
}
