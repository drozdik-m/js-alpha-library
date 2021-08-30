import { IIterator } from "./IIterator";
import { IContainer } from "./IContainer";

export interface IRemovableContainerByIterator<T> extends IContainer<T>
{
    /**
     * Remove item at given position by an iterator. It invalidates the iterator.
     * @param iterator Iterator
     */
    RemoveAt(iterator: IIterator<T>): void;
}