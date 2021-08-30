import { IContainer } from "./IContainer";
import { IClearable } from "./IClearable";

export interface IBuildable<T> extends IClearable
{
    /**
     * Builds the container from input array of elements. Clears all current elements first.
     * @param items Items
     */
    Build(items: T[]): void;
}