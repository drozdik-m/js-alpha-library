import { IIterator } from "./IIterator";

export interface IIterable<T>
{
    /**
     * Returns an iterator pointing to the first value.
     * */
    First(): IIterator<T>;
}

