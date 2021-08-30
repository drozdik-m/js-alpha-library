import { IContainer } from "./IContainer";
import { IBidirectionalIterator } from "./IBidirectionalIterator";

export interface IBidirectionalySearchableContainer<T> extends IContainer<T>
{
    /**
     * Searches the container and returns iterator pointing to it. Returns null if not found.
     * @param item Item to search
     */
    Find(item: T): IBidirectionalIterator<T>;
}
