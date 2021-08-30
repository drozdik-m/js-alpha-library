import { IIterable } from "./IIterable";
import { IBidirectionalIterator } from "./IBidirectionalIterator";


export interface IIterableBidirectionaly<T> extends IIterable<T>
{
    /**
     * Returns an iterator pointing to the first value.
     * */
    First(): IBidirectionalIterator<T>;

    /**
     * Returns an iterator pointing to the last value.
     * */
    Last(): IBidirectionalIterator<T>;
}