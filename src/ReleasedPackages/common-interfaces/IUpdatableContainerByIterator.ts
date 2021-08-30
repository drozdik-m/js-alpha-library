import { IIterator } from "./IIterator";
import { IUpdatableContainer } from "./IUpdatableContainer";

export interface IUpdatableContainerByIterator<T> extends IUpdatableContainer<T>
{
    /**
     * Updates value on given item, passed by an iterator
     * @param newValue New value
     * @param iterator Item to be updated
     */
    UpdateAt(newValue: T, iterator: IIterator<T>): void;
}