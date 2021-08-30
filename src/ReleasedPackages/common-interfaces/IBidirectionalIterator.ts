import { IIterator } from "./IIterator";

export interface IBidirectionalIterator<T> extends IIterator<T>
{
    /**
     * Moves the iterator to the previous value.
     * */
    Previous(): void
}