
export interface IContainer<T>
{
    /**
     * Insert an item into the container.
     * @param item Item
     */
    Insert(item: T): void;

    /**
     * Remove an item from the container
     * @param item
     */
    Remove(item: T): void;
}