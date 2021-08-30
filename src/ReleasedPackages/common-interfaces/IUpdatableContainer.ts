import { IContainer } from "./IContainer";


export interface IUpdatableContainer<T> extends IContainer<T>
{
    /**
     * Updates a value
     * @param oldValue Old value
     * @param newValue New value
     */
    Update(oldValue:T, newValue: T): void;
}