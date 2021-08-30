import { IRandomAccessible } from "./IRandomAccessible";
import { IIterator } from "./IIterator";


export interface IRandomAccessibleIterable<T> extends IRandomAccessible<T>
{
    /**
     * Returns iterator pointing to given index
     * @param index Index
     */
    AtIterator(index: number): IIterator<T>;
}