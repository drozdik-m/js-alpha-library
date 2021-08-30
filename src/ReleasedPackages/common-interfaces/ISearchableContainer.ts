import { IIterator } from "./IIterator";
import { IContainer } from "./IContainer";

export interface ISearchableContainer<T> extends IContainer<T>
{
    /**
     * Searches the container and returns iterator pointing to it. Returns null if not found.
     * @param item Item to search
     */
    Find(item: T): IIterator<T>;
}