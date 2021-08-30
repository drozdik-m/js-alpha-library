
export interface IMinHeap<T>
{
    /**
     * Inserts new item into the heap
     * */
    Insert(item: T): void;

    /**
     * Deletes minimum
     * */
    DeleteMin(): void;

    /**
     * Returns minimum
     * */
    Min(): T;

    /**
     * Deletes and return Max()
     * */
    ExtractMin(): T;
}